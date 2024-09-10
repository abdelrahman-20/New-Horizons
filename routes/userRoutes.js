const express = require('express');
const userRouter = express.Router();
const userControllers = require(`${__dirname}/../controllers/userControllers`);

// All Users-Tours:
userRouter
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);

userRouter
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = userRouter;
