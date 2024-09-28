const slugify = require('slugify');
const mongoose = require('mongoose');

// Creating Data Schema:
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, 'Tour Name Must Be Unique'],
      required: [true, 'Tour Must Have A Name'],
    },
    slug: String,
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
      select: false,
    },
    startDate: {
      type: [Date],
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add Virtual Instance To The Document:
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Document MiddleWare: (Runs Before Save() & Create() The Document)
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Query MiddleWare (Will Be Triggered Before Any Query Starts with find..):
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

// Query MiddleWare (Will Be Triggered After Any Query Starts with find..):
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query Took: ${Date.now() - this.start} ms`);
  // console.log(docs);
  next();
});

// Aggregate MiddleWare:
tourSchema.pre('aggregate', function (next) {
  this._pipeline.unshift({ $match: { secretTour: { $ne: true } } });
  // console.log(this);
  next();
});

// Create A Collection Using Previous Schema:
const Tour = mongoose.model('Tours_Test', tourSchema);

module.exports = Tour;
