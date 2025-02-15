// app/api/investors/route.js
import dbConnect from "@/lib/dbConnect";
import Investor from "@/models/investorSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const investor = new Investor(body);
    await investor.save();

    return NextResponse.json(
      { message: "Investor data added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add investor", details: error.message },
      { status: 500 }
    );
  }
}