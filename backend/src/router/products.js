'use strict'

var express = require('express');
import {
  allProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductHistoric
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
  router.get('/:id/historic', getProductHistoric);
  router.post('/new',
    productSchemaValidation,
    startCommitOnSearchEngine,
    createProduct,
    endCommitOnSearchEngine
  );
  router.put('/:id/update', updateProduct);
  router.delete('/:id/delete', deleteProduct);
  // TODO: validate again that this is working as expected
  return router
}


module.exports = ProductsRouter