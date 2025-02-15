import mongoose from "mongoose";

const investorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "investor" },

  netWorth: { type: Number }, // Investor's net worth in USD
  investorType: {
    type: String,
    enum: ["High Cap", "Mid Cap", "Small Cap"], // Categorizing investor type
    },

  investments: [
    {
      startup: { type: mongoose.Schema.Types.ObjectId, ref: "Startup" },
      amount: Number, // Amount invested in the startup
      date: { type: Date, default: Date.now },
    },
  ],

  interestedSectors: [String], // Sectors the investor is interested in
  preferredFundingStage: {
    type: String,
    enum: ["Seed", "Series A", "Series B", "Late Stage"],
  },
});

export default mongoose.models.Investor ||
  mongoose.model("Investor", investorSchema);
