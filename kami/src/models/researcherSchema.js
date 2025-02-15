import mongoose from "mongoose";

const researcherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "researcher" },

  researchPapers: [
    {
      title: String,
      field: String,
      description: String,
      fileUrl: String,
    },
  ],

  collaborations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Researcher" }],
  
  fundingRequests: [
    {
      amount: Number,
      description: String,
      status: { type: String, default: "pending" },
    },
  ],
});

export default mongoose.models.Researcher ||
  mongoose.model("Researcher", researcherSchema);
