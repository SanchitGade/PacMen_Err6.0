import dbConnect from "@/lib/dbConnect";
import Researcher from "@/models/researcherSchema";
import Entrepreneur from "@/models/entrepreneurSchema";
import Investor from "@/models/investorSchema";
import Mentor from "@/models/mentorSchema";
import { hashPassword } from "@/utils/auth";

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnect();
  } catch (error) {
    console.error("Database connection error:", error);
    return new Response(JSON.stringify({ error: "Database connection failed" }), {
      status: 500,
    });
  }

  try {
    // Parse request body
    const { name, email, password, role } = await req.json();

    // Validate required fields
    if (!name || !email || !password || !role) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
      });
    }

    // Validate role
    const validRoles = ["researcher", "entrepreneur", "investor", "mentor"];
    if (!validRoles.includes(role)) {
      return new Response(JSON.stringify({ error: "Invalid role" }), {
        status: 400,
      });
    }

    // Check if user already exists
    const existingUser =
      (await Researcher.findOne({ email })) ||
      (await Entrepreneur.findOne({ email })) ||
      (await Investor.findOne({ email })) ||
      (await Mentor.findOne({ email }));

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await hashPassword(password);
    } catch (error) {
      console.error("Password hashing error:", error);
      return new Response(JSON.stringify({ error: "Password hashing failed" }), {
        status: 500,
      });
    }

    // Create user based on role
    let user;
    switch (role) {
      case "researcher":
        user = new Researcher({ name, email, password: hashedPassword, role });
        break;
      case "entrepreneur":
        user = new Entrepreneur({ name, email, password: hashedPassword, role });
        break;
      case "investor":
        user = new Investor({ name, email, password: hashedPassword, role });
        break;
      case "mentor":
        user = new Mentor({ name, email, password: hashedPassword, role });
        break;
      default:
        return new Response(JSON.stringify({ error: "Invalid role" }), { status: 400 });
    }

    // Save user to database
    await user.save();

    return new Response(
      JSON.stringify({ message: `User registered successfully as ${role}` }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ error: error.message || "Server error" }), {
      status: 500,
    });
  }
}
