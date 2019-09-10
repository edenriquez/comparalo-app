'use strict'

var express = require('express');

import {
  allProducts,
  createProduct,
  getProduct,
  deleteProduct
}
from '../controllers/products';

const ProductsRouter = () => {
  var router = express.Router();
  router.get('/', allProducts);
  router.post('/new', createProduct);
  router.get('/:id', getProduct);
  router.delete('/:id/delete', deleteProduct);
  return router
}


module.exports = ProductsRouter