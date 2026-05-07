import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // Added missing import

async function getCampaignsCollection() {
  const client = await clientPromise;
  const database = client.db("dungeon-dashboard");
  const collection = database.collection("campaigns");
  return collection;
}

// 1. Next.js App Router passes 'request' and 'context' as separate arguments
export async function PATCH(
  request: Request, 
  { params }: { params: Promise<{ campaignId: string }> }
) {
  // Await params correctly for Next.js 15+ compatibility
  const { campaignId } = await params;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "401 Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const collection = await getCampaignsCollection();

    // 2. Query filter: Find by ID *and* ensure the user actually owns this campaign
    const filter = { 
      _id: new ObjectId(campaignId), 
      ownerEmail: session.user?.email 
    };

    // 3. Update operator: Use $set to only update the fields provided in the body
    const updateDoc = {
      $set: body
    };

    // 4. Perform the update and return the newly updated document
    const result = await collection.findOneAndUpdate(
      filter, 
      updateDoc, 
      { returnDocument: 'after' } 
    );

    // 5. Handle cases where the document doesn't exist or isn't owned by the user
    if (!result) {
      return NextResponse.json(
        { message: "Campaign not found or unauthorized to edit" }, 
        { status: 404 }
      );
    }

    // 6. Return 200 OK for successful updates (201 is only for creation)
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
