const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  courseName: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  comments: String
});

module.exports = mongoose.model('Feedback', feedbackSchema);