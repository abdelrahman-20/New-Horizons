const express = require('express');
const tourRouter = express.Router();
const tourControllers = require(`${__dirname}/../controllers/tourControllers`);

const checkID = tourControllers.checkID;
const checkBody = tourControllers.checkBody;

tourRouter.param('id', checkID);

tourRouter
  .route('/')
  .get(tourControllers.getAllTours)
  .post(checkBody, tourControllers.createTour);

tourRouter
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = tourRouter;
