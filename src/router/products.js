'use strict'

var express = require('express');

import {
  allProducts,
  createProduct,
  getProduct,
  deleteProduct
}
from '../api/product/products';

import {
  productSchemaValidation
}
from '../api/product/validator';

const ProductsRouter = () => {
  var router = express.Router();
  router.get('/', allProducts);
  router.get('/:id', getProduct);
  router.post('/new',
    productSchemaValidation,
    createProduct
  );
  router.delete('/:id/delete', deleteProduct);
  return router
}


module.exports = ProductsRouter