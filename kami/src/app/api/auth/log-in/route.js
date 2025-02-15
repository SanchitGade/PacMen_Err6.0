import dbConnect from "@/lib/dbConnect";
import Researcher from "@/models/researcherSchema";
import Entrepreneur from "@/models/entrepreneurSchema";
import Investor from "@/models/investorSchema";
import PolicyMaker from "@/models/policyMakerSchema";
import { comparePassword, generateToken } from "@/utils/auth";

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  try {
    // Check all role collections for the user
    const user =
      (await Researcher.findOne({ email })) ||
      (await Entrepreneur.findOne({ email })) ||
      (await Investor.findOne({ email })) ||
      (await PolicyMaker.findOne({ email }));

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 400,
      });
    }

    // Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 400,
      });
    }

    // Generate JWT
    const token = generateToken(user._id, user.role);

    return new Response(JSON.stringify({ token , message: 'Loged in successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
