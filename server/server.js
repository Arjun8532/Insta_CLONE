// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS
require('dotenv').config();

// Initialize Express app
const app = express();

// Enable CORS for all routes
app.use(cors());  // Enable CORS middleware

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB using mongoose
mongoose
  .connect(process.env.MONGO_URI,
   )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Define User schema for MongoDB
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create User model based on the schema
const User = mongoose.model('User', userSchema);

// POST route to handle form submissions
app.post('/api/submit', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Save the user data in MongoDB
    const newUser = new User({ username, password });
    await newUser.save();

    // Respond with success message
    res.json({ message: 'Form submitted successfully, data saved.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving data to the database.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
