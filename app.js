const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Initializing Middle-Wares:
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log('Hello From Middle-Ware 🔥🚀');
  next();
});

// Reading Tours Into JS Object From A JSON-File
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`
  )
);

// Route Handlers:
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  } else {
    res.status(200).json({
      message: 'Success',
      data: {
        tour,
      },
    });
  }
};
const createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tours,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  } else {
    res.status(200).json({
      status: 'Success',
      data: {
        tour: 'Updated Tour',
      },
    });
  }
};
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  } else {
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  }
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined',
  });
};

// All Tours-Routes:
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// All Users-Tours:
app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// Start The Server:
app.listen(PORT, () => {
  console.log(`Application is Running on Port: ${PORT}`);
});
