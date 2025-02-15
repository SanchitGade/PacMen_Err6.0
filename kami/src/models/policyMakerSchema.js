import mongoose from "mongoose";

const policyMakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "policy_maker" },

  approvedPatents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patent" }],

  approvedResearch: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ResearchPaper" },
  ],
  
  policies: [
    {
      title: String,
      description: String,
    },
  ],
});

export default mongoose.models.PolicyMaker ||
  mongoose.model("PolicyMaker", policyMakerSchema);
