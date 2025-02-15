import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "mentor" },

  expertise: [{ type: String,  }], // List of expertise areas (e.g., AI, Blockchain, Medicine)
  yearsOfExperience: { type: Number }, // Number of years in the field
  education: { type: String }, // Highest qualification (e.g., PhD in Computer Science)
  
  startupsMentored: [{ type: mongoose.Schema.Types.ObjectId, ref: "Entrepreneur" }], // List of entrepreneurs/startups they have mentored
  
  researchContributions: [{ type: mongoose.Schema.Types.ObjectId, ref: "ResearchPaper" }], // Research papers they have contributed to
  
  achievements: [
    {
      title: String,
      description: String,
      date: Date,
    },
  ], // Awards, recognitions, or major contributions

  
  availability: {
    availableForMentoring: { type: Boolean, default: true }, // Whether the mentor is currently available
    preferredMode: { type: String, enum: ["Online", "In-Person", "Both"], default: "Online" }, // Preferred mentorship mode
  },

  linkedIn: String, // Link to mentor’s LinkedIn profile
  website: String, // Personal website or portfolio
});

export default mongoose.models.Mentor || mongoose.model("Mentor", mentorSchema);
