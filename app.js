const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require(`./routes/tourRoutes`);
const userRouter = require(`./routes/userRoutes`);

// Configuring Middle-Wares:
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log('Hello From Middle-Ware 🔥🚀');
  next();
});

// Mounting New Routers:
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
