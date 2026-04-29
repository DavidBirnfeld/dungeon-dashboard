import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    if (client) {
      return Response.json(
        { message: "Database connected successfully!" },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Database failed to connect" },
      { status: 500 },
    );
  }
}
