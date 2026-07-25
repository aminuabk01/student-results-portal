const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  session: { type: String, required: true, trim: true },   // e.g. "2025/2026"
  term: { type: String, required: true, trim: true },      // e.g. "First Semester"
  courseCode: { type: String, required: true, trim: true },
  courseTitle: { type: String, required: true, trim: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  grade: { type: String, trim: true }
}, { timestamps: true });

// Auto-calculate grade before saving
resultSchema.pre('save', function (next) {
  const s = this.score;
  if (s >= 70) this.grade = 'A';
  else if (s >= 60) this.grade = 'B';
  else if (s >= 50) this.grade = 'C';
  else if (s >= 45) this.grade = 'D';
  else if (s >= 40) this.grade = 'E';
  else this.grade = 'F';
  next();
});

module.exports = mongoose.model('Result', resultSchema);
