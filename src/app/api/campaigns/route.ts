import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

async function getCampaignsCollection() {
  const client = await clientPromise;
  const database = client.db("dungeon-dashboard");
  const collection = database.collection("campaigns");
  return collection;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "401 Unauthorized" },
        { status: 401 },
      );
    }
    const body = await request.json();
    const collection = await getCampaignsCollection();
    const data = { ownerEmail: session.user?.email, ...body };
    const result = await collection.insertOne(data);
    const campaign = { _id: result.insertedId, ...body}
    return NextResponse.json( campaign , { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "401 Unauthorized" },
        { status: 401 },
      );
    }
    const collection = await getCampaignsCollection();

    const data = await collection
      .find({ ownerEmail: session.user?.email })
      .toArray();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
