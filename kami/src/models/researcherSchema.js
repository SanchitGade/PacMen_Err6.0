import mongoose from "mongoose";

const researcherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "researcher" },

  // Research Papers
  researchPapers: [
    {
      title: { type: String}, // Title of the research paper
      field: { type: String}, // Field of research (e.g., AI, Biology)
      description: { type: String}, // Brief description of the research
      fileUrl: { type: String}, // URL or path to the research paper
      publicationDate: { type: Date, default: Date.now }, // Date of publication
      status: {
        type: String,
        enum: ["ongoing", "completed", "published"],
        default: "ongoing",
      }, // Status of the research
      patentStatus: {
        type: String,
        enum: ["done", "pending", "none"],
        default: "none",
      }, // Patent status
      progress: { type: Number, min: 0, max: 100, default: 0 }, // Research progress in percentage
      collaborators: [
        {
          name: String, // Name of the collaborator
          email: String, // Email of the collaborator
          institution: String, // Institution of the collaborator
        },
      ], // List of collaborators
    },
  ],

  // Collaborations
  collaborations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Researcher" }],

  // Funding Requests
  fundingRequests: [
    {
      amount: { type: Number }, // Amount requested
      description: { type: String }, // Description of the funding request
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      }, // Status of the funding request
      requestedAt: { type: Date, default: Date.now }, // Date of the funding request
    },
  ],

  // Additional Fields
  institution: { type: String }, 
  department: { type: String }, 
  contactNumber: { type: String }, 
  createdAt: { type: Date, default: Date.now }, // Date the researcher joined the platform
  updatedAt: { type: Date, default: Date.now }, // Last updated date
});

export default mongoose.models.Researcher ||
  mongoose.model("Researcher", researcherSchema);
