// app/api/mentors/route.js
import dbConnect from "@/lib/dbConnect";
import Mentor from "@/models/mentorSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const mentor = new Mentor(body);
    await mentor.save();

    return NextResponse.json(
      { message: "Mentor data added successfully", },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add mentor", details: error.message },
      { status: 500 }
    );
  }
}