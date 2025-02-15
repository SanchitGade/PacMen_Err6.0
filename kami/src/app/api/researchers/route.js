// app/api/researchers/route.js
import dbConnect from "@/lib/dbConnect";
import Researcher from "@/models/researcherSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const researcher = new Researcher(body);
    await researcher.save();

    return NextResponse.json(
      { message: "Researcher data added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add researcher", details: error.message },
      { status: 500 }
    );
  }
}
