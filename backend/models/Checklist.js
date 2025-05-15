import mongoose from 'mongoose';

const ChecklistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: String,
  date: { type: Date, default: Date.now },
  items: [{ label: String, status: String, note: String }],
  images: [String],
  videos: [String],
  signature: String,
  pdfUrl: String,
  sharedToken: String,
});

export default mongoose.model('Checklist', ChecklistSchema);
