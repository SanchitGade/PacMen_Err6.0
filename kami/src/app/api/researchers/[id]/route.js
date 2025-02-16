import dbConnect from "@/lib/dbConnect";
import Researcher from "@/models/researcherSchema";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    
    if (!params.id) {
      return NextResponse.json(
        { error: "Researcher ID is required" },
        { status: 400 }
      );
    }

    const researcher = await Researcher.findById(params.id).lean();
    
    if (!researcher) {
      return NextResponse.json(
        { error: "Researcher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(researcher, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch researcher details", details: error.message },
      { status: 500 }
    );
  }
}