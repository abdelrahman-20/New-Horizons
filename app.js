const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Reading Tours Into JS Object From A JSON-File
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`
  )
);

// Initializing Middle-Wares:
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    data: { tours },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Application is Running on Port: ${PORT}`);
});
