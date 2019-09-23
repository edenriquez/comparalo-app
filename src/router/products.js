'use strict'

var express = require('express');
import {
  allProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
}
from '../api/product/products';
import {
  productSchemaValidation
}
from '../api/product/validator';
import {
  startCommitOnSearchEngine,
  endCommitOnSearchEngine
}
from '../api/search/search';

const ProductsRouter = () => {
  var router = express.Router();
  router.get('/', allProducts);
  router.get('/:id', getProduct);
  router.post('/new',
    productSchemaValidation,
    startCommitOnSearchEngine,
    createProduct,
  );
  router.put('/:id/update', updateProduct);
  router.delete('/:id/delete', deleteProduct);
  router.use(endCommitOnSearchEngine)
  return router
}


module.exports = ProductsRouter