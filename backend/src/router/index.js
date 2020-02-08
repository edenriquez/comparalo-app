var express = require('express')

const allRoutes = () => {
  var app = express.Router()
  app.use('/search', require('./search')());
  app.use('/products', require('./products')());
  app.use('/categories', require('./categories')());

  return app
}

module.exports = allRoutes;