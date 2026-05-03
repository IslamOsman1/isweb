import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    key: { type: String, default: 'site', unique: true },
    settings: { type: Object, default: {} },
    services: { type: Array, default: [] },
    projects: { type: Array, default: [] },
    testimonials: { type: Array, default: [] },
    team: { type: Array, default: [] },
    posts: { type: Array, default: [] },
    faqs: { type: Array, default: [] },
    requests: { type: Array, default: [] },
    jobs: { type: Array, default: [] },
  },
  { timestamps: true, strict: false }
);

export default mongoose.model('Content', contentSchema);
