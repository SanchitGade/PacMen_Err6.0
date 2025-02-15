// src/models/Investor.js
import mongoose from 'mongoose';

const investorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'investor' },
  
  investments: [
    {
      researchId: { type: mongoose.Schema.Types.ObjectId, ref: 'ResearchPaper' },
      startupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup' },
      amount: Number,
    },
  ],
});

export default mongoose.models.Investor || mongoose.model('Investor', investorSchema);