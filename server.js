const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const app = require('./app');
const PORT = process.env.PORT ? process.env.PORT : 3000;
const DB = process.env.DATABASE.replace('<PASS>', process.env.DATABASE_PASS);

// Start Database Connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB Connection Successful');
  });

// Creating Data Schema:
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour Must Have A Name'],
    unique: true,
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

// Create And Store The Data:
// const testTour = new Tour({
//   name: 'The Park Camper',
//   rating: 4.5,
//   price: 997,
// });

// testTour
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log(`Error: ${err}`));

// Start The Server:
app.listen(PORT, () => console.log(`App is Running on Port: ${PORT}`));
