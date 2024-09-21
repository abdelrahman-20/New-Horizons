const mongoose = require('mongoose');

// Creating Data Schema:
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Tour Name Must Be Unique'],
    required: [true, 'Tour Must Have A Name'],
  },
  price: {
    type: Number,
    required: [true, 'Tour Must Have A Price'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  difficulty: {
    type: String,
    default: 'Normal',
  },
});

// Create A Collection Using Previous Schema:
const Tour = mongoose.model('Tours_Test', tourSchema);

module.exports = Tour;
