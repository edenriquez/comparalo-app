'use strict'

var express = require('express');

import {
  allProducts,
  createProduct
}
from '../controllers/products';

const ProductsRouter = () => {
  var router = express.Router();
  router.get('/', allProducts);
  router.post('/new', createProduct);
  return router
}


module.exports = ProductsRouter