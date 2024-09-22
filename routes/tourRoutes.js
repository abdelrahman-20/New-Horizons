const express = require('express');
const tourRouter = express.Router();
const tourControllers = require(`${__dirname}/../controllers/tourControllers`);

tourRouter
  .route('/topCheap')
  .get(tourControllers.aliasTopTours, tourControllers.getAllTours);

tourRouter
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTour);

tourRouter
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = tourRouter;
