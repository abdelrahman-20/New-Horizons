const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const mongoose = require('mongoose');
const PORT = process.env.PORT ? process.env.PORT : 3000;
const DB = process.env.DATABASE.replace('<PASS>', process.env.DATABASE_PASS);

// Start Database Connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB Connection Successful');
  });

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

app.listen(PORT, () => console.log(`App is Running on Port: ${PORT}`));
