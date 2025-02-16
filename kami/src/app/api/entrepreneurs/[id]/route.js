import dbConnect from "@/lib/dbConnect";
import Entrepreneur from "@/models/entrepreneurSchema";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    if (!params.id) {
      return NextResponse.json(
        { error: "Startup ID is required" },
        { status: 400 }
      );
    }

    const startup = await Entrepreneur.findById(params.id).lean();

    if (!startup) {
      return NextResponse.json({ error: "Startup not found" }, { status: 404 });
    }

    return NextResponse.json(startup, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch startup details", details: error.message },
      { status: 500 }
    );
  }
}
