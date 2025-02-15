import mongoose from "mongoose";

const entrepreneurSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "entrepreneur" },

  startupDetails: {
    name: { type: String},
    description: { type: String },
    history: String,
    industry: String, // Industry category of the startup
    website: String, // Startup website link
    establishedYear: Number, // Year the startup was founded
    location: String, // Startup location
  },

  fundingStatus: {
    isLookingForFunding: { type: Boolean, default: false }, // Whether the startup is actively seeking investment
    fundingRange: {
      min: Number,
      max: Number,
    }, 
    fundingStage: {
      type: String,
      enum: ["Pre-Seed", "Seed", "Series A", "Series B", "Late Stage"],
    }, // Current funding stage of the startup
  },

  achievements: [
    {
      title: String,
      description: String,
      date: Date,
    },
  ], // Awards, recognitions, or startup milestones

});

export default mongoose.models.Entrepreneur ||
  mongoose.model("Entrepreneur", entrepreneurSchema);
