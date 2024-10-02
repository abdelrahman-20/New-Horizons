const Tour = require(`${__dirname}/../models/tourModel`);
const APIFeatures = require(`${__dirname}/../utils/apiFeatures`);

exports.getAllTours = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(404).json({
            status: 'Failure',
            message: `${err}`,
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'Success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'Failure',
            message: err,
        });
    }
};

exports.createTour = async (req, res) => {
    // const newTour = new Tour({});
    // newTour.save();

    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'Success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(400).json({
            status: 'Failure',
            message: err,
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                // new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: 'Success',
            data: {
                tour: updatedTour,
            },
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(400).json({
            status: 'Failure',
            message: err,
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'Success',
            data: null,
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(400).json({
            status: 'Failure',
            message: err,
        });
    }
};

exports.getTourStats = async (req, res) => {
    // This Function is To Get Statistics About Tours
    try {
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
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(400).json({
            status: 'Failure',
            message: err,
        });
    }
};

exports.getMonthlyPlan = async (req, res) => {
    try {
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
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(400).json({
            status: 'Failure',
            message: err,
        });
    }
};

exports.aliasTopTours = (req, res, next) => {
    // req.query.limit = 5;
    req.query.sort = 'price,-ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};
