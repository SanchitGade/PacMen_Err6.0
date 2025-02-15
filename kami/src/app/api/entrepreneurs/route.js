// app/api/entrepreneurs/route.js
import dbConnect from "@/lib/dbConnect";
import Entrepreneur from "@/models/entrepreneurSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const entrepreneur = new Entrepreneur(body);
    await entrepreneur.save();

    return NextResponse.json(
      { message: "Entrepreneur data added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add entrepreneur", details: error.message },
      { status: 500 }
    );
  }
}