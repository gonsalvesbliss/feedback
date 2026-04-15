const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb+srv://bliss:reuse123@cluster0.gj6rszv.mongodb.net/feedbackdb?retryWrites=true&w=majority')
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err));

const Feedback = require('./models/Feedback');


// POST - Submit Feedback
app.post('/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  GET - Fetch Feedback
app.get('/feedback', async (req, res) => {
  const data = await Feedback.find();
  res.json(data);
});


//  DELETE - Delete Feedback
app.delete('/feedback/:id', async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});


// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});