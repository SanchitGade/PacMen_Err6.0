// app/api/auth/login/route.js
import dbConnect from "@/lib/dbConnect";
import Researcher from "@/models/researcherSchema";
import Entrepreneur from "@/models/entrepreneurSchema";
import Investor from "@/models/investorSchema";
import Mentor from "@/models/mentorSchema";
import { comparePassword, generateToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    // Parse request body
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check all role collections for the user
    const user =
      (await Researcher.findOne({ email })) ||
      (await Entrepreneur.findOne({ email })) ||
      (await Investor.findOne({ email })) ||
      (await Mentor.findOne({ email }));

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Generate JWT
    const token = generateToken(user._id, user.role);

    // Return success response
    return NextResponse.json(
      {
        token,  
        role: user.role,
        message: "Logged in successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
