var express = require('express')

const allRoutes = () => {
  var app = express.Router()
  app.use('/user', require('./user')());
  app.use('/search', require('./search')());
  app.use('/products', require('./products')());
  app.use('/categories', require('./categories')());
  app.use('/auth', require('./auth')());

  return app
}

module.exports = allRoutes;