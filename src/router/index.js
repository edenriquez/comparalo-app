var express = require('express')

const allRoutes = () => {
  var app = express.Router()
  // TODO use db for categories
  // app.use('/categories', require('./categories')());
  app.use('/search', require('./searchs')());
  app.use('/products', require('./products')());
  app.use('/jobs', require('./jobs')());

  return app
}

module.exports = allRoutes;