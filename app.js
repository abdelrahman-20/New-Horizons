const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require(`./routes/tourRoutes`);
const userRouter = require(`./routes/userRoutes`);
const AppError = require(`${__dirname}/utils/appError`);
const globalErrorHandler = require(`${__dirname}/controllers/errorController`);

// Configuring MiddleWares:
// if (process.env.NODE_ENV === 'development')  app.use(morgan('dev'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Mounting New Routers:
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't Find ${req.originalUrl} On Server`, 404)); 
});

// Error Handling MiddleWare:
app.use(globalErrorHandler);

module.exports = app;
