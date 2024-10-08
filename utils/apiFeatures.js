class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // Find (After Removing Some Fields):
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'fields', 'sort'];

    excludedFields.forEach((val) => delete queryObj[val]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    queryString = JSON.parse(queryString);
    this.query = this.query.find(queryString);

    return this;
  }

  // Sort:
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      console.log(sortBy);
    } else {
      this.query = this.query.sort('name');
    }
    return this;
  }

  // Select:
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  // Skip & Limit
  paginate() {
    const page = this.queryString.page * 1 ? this.queryString.page * 1 : 1;
    const limit = this.queryString.limit * 1 ? this.queryString.limit * 1 : 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
