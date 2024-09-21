const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config.env` });

const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require(`${__dirname}/../models/tourModel`);
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

// Read Data.json File:
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

// Import The Data Into The Database:
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Loaded Successfully');
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  process.exit();
};

// Delete Data From The Database:
const deleteDate = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Deleted Successfully');
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteDate();
}

// Command-Line Guid:
// To Import The Data Use => node importData.js --import
// To Delete The Data Use => node importData.js --delete
