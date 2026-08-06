const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  path: { type: String, required: true },       // e.g. "~/projects/distworkspace"
  title: { type: String, required: true },
  status: { type: String, enum: ['shipped', 'progress'], default: 'progress' },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  repoLink: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
