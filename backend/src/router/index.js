var express = require('express')

const allRoutes = () => {
  var app = express.Router()
  app.use('/search', require('./search')());
  app.use('/products', require('./products')());
  app.use('/categories', require('./categories')());
  app.use('/auth', require('./auth')());

  return app
}

module.exports = allRoutes;