var express = require('express')

const allRoutes = () => {
  var app = express.Router()
  app.use('/jobs', require('./jobs')());
  app.use('/search', require('./search')());
  app.use('/products', require('./products')());
  app.use('/categories', require('./categories')());

  return app
}

module.exports = allRoutes;
