import dbConnect from "@/lib/dbConnect";
import Researcher from "@/models/researcherSchema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const researchers = await Researcher.find({}).lean();
    
    if (!researchers) {
      return NextResponse.json(
        { error: "No researchers found" },
        { status: 404 }
      );
    }

    return NextResponse.json(researchers, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch researchers", details: error.message },
      { status: 500 }
    );
  }
}