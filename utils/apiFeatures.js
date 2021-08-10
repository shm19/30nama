class ApiFeatures {
  constructor(query, queryStr) {
    this._query = query;
    this._queryStr = queryStr;
  }

  filter() {
    const excludedFields = ['limit', 'sort', 'fields', 'page'];
    // remvoe fields from query str []
    let filterQuery = { ...this._queryStr };
    excludedFields.forEach(el => delete filterQuery[el]);
    filterQuery = JSON.parse(
      JSON.stringify(filterQuery).replace(
        /\b(gte|lte|lt|gt)\b/g,
        match => `$${match}`
      )
    );
    this._query = this._query.find(filterQuery);
    return this;
  }

  sort() {
    if (this._queryStr.sort) {
      const sortBy = this._queryStr.sort.split(',').join(' ');
      this._query = this._query.sort(sortBy);
    } else {
      // fefault sort ==> you can also add a createAt field and use that to sort with time
      this._query.sort('name');
    }
    return this;
  }

  limitFields() {
    if (this._queryStr.fields) {
      const selectedFields = this._queryStr.fields.split(',').join(' ');
      this._query.select(selectedFields);
    }
    this._query.select('-__v');
    return this;
  }

  paginate() {
    const limit = this._queryStr.limit * 1;
    const page = this._queryStr.page * 1;
    if (page && limit) {
      this._query = this._query.skip((page - 1) * limit).limit(limit);
    } else {
      this._query = this._query.skip(0).limit(10);
    }
    return this;
  }

  get query() {
    return this._query;
  }
}

module.exports = ApiFeatures;
