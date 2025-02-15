import dbConnect from "@/lib/dbConnect";
import Researcher from "@/models/researcherSchema";
import Entrepreneur from "@/models/entrepreneurSchema";
import Investor from "@/models/investorSchema";
import PolicyMaker from "@/models/policyMakerSchema";
import { hashPassword } from "@/utils/auth";

export async function POST(req) {
  await dbConnect();
  const { name, email, password, role } = await req.json();

  // Validate role
  const validRoles = ["researcher", "entrepreneur", "investor", "policy_maker"];
  if (!validRoles.includes(role)) {
    return new Response(JSON.stringify({ error: "Invalid role" }), {
      status: 400,
    });
  }

  try {
    // Check if user already exists
    const existingUser =
      (await Researcher.findOne({ email })) ||
      (await Entrepreneur.findOne({ email })) ||
      (await Investor.findOne({ email })) ||
      (await PolicyMaker.findOne({ email }));

    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user based on role
    let user;
    switch (role) {
      case "researcher":
        user = new Researcher({ name, email, password: hashedPassword, role });
        break;
      case "entrepreneur":
        user = new Entrepreneur({
          name,
          email,
          password: hashedPassword,
          role,
        });
        break;
      case "investor":
        user = new Investor({ name, email, password: hashedPassword, role });
        break;
      case "policy_maker":
        user = new PolicyMaker({ name, email, password: hashedPassword, role });
        break;
    }

    await user.save();
    return new Response(
      JSON.stringify({ message: `User of ${role} created successfully` }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
