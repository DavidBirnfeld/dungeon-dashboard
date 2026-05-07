import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { CampaignEditor } from "@/app/components/campaign-editor/CampaignEditor";

async function getCampaignsCollection() {
  const client = await clientPromise;
  const database = client.db("dungeon-dashboard");
  const collection = database.collection("campaigns");
  return collection;
}

export interface Campaign {
  _id: string;
  name: string;
  description: string;
  notes?: string[];
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;
  console.log(campaignId);
  let data: Campaign | null;
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/api/auth/signin");
    }
    const collection = await getCampaignsCollection();
    const rawCampaign = await collection.findOne({
      _id: new ObjectId(campaignId),
    });
    if (rawCampaign) {
      data = {
        ...rawCampaign,
        _id: rawCampaign._id.toString()
      } as Campaign;
    } else {
      data = null;
    }
    console.log(data);
  } catch (error) {
    console.error(error);
    data = null;
  }

  if (data === null) {
    return <div>Server Error :(</div>;
  }
  return <CampaignEditor campaign={data} />;
}
