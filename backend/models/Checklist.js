import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  label: String,
  status: String,
  note: String,
});

const checklistSchema = new mongoose.Schema({
  vehicle: { type: String, required: true },
  items: [itemSchema],
  images: [String],
  videos: [String],
  signature: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Checklist', checklistSchema);
