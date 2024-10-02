const Tour = require(`${__dirname}/../models/tourModel`);
const catchAsync = require(`${__dirname}/../utils/catchAsync`);
const APIFeatures = require(`${__dirname}/../utils/apiFeatures`);

exports.getAllTours = catchAsync(async (req, res, next) => {
  // Executing The Query:
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;

  // Send The Response:
  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    // new: true,
  });

  res.status(200).json({
    status: 'Success',
    data: {
      tour: updatedTour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'Success',
    data: null,
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  // This Function is To Get Statistics About Tours
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRates: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
        numTours: { $sum: 1 },
      },
    },
    // {
    //   $sort: { _id: 1 },
    // },
    // {
    //   $match: { _id: { $ne: 'EASY' } },
    // },
  ]);

  res.status(200).json({
    status: 'Success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      // I used Images As (startDate) Happens to be empty in DB.
      // $unwind: '$images',
      $unwind: '$startDate',
    },
    {
      $match: {
        startDate: { $gte: new Date(`${year}-01-01`) },
      },
    },
  ]);

  res.status(200).json({
    status: 'Success',
    len: plan.length,
    data: {
      plan,
    },
  });
});

exports.aliasTopTours = (req, res, next) => {
  // req.query.limit = 5;
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
