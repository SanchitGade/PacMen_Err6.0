import dbConnect from "@/lib/dbConnect";
import Entrepreneur from "@/models/entrepreneurSchema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const startups = await Entrepreneur.find({
      "startupDetails.name": { $exists: true },
    }).lean();

    if (!startups.length) {
      return NextResponse.json({ error: "No startups found" }, { status: 404 });
    }

    return NextResponse.json(startups, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch startups", details: error.message },
      { status: 500 }
    );
  }
}
