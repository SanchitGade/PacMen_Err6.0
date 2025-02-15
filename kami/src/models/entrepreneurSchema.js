import mongoose from "mongoose";

const entrepreneurSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "entrepreneur" },

  startupDetails: {
    name: String,
    description: String,
    history: String,
  },

  fundingRequests: [
    {
      amount: Number,
      description: String,
      status: { type: String, default: "pending" },
    },
  ],
  
  viewedResearchPapers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "ResearchPaper" },
  ],
});

export default mongoose.models.Entrepreneur ||
  mongoose.model("Entrepreneur", entrepreneurSchema);
