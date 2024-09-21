const mongoose = require('mongoose');

// Creating Data Schema:
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Tour Name Must Be Unique'],
    required: [true, 'Tour Must Have A Name'],
  },
  duration: {
    type: Number,
    required: [true, 'Tour Must Have A Duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Tour Must Have A Group Size'],
  },
  difficulty: {
    type: String,
    required: [true, 'Tour Must Have A Difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Tour Must Have A Price'],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'Tour Must Have A Summary'],
  },
  description: {
    type: String,
    trime: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Tour Must Have A Cover Image'],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: {
    type: [Date],
  },
});

// Create A Collection Using Previous Schema:
const Tour = mongoose.model('Tours_Test', tourSchema);

module.exports = Tour;
