class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {}

  sort() {}

  limit() {}

  paginate() {}
}

module.exports = ApiFeatures;
