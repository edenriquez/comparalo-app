'use strict'

var express = require('express');

import {
  allCategories,
  filterCategories,
  filterProducts,
  filterProductById
} from '../controllers/categories';

const CategoriesRouter = () => {
  var router = express.Router();
  router.get('/', allCategories);
  router.get('/:category', filterCategories);
  router.get('/:category', filterCategories);
  router.get('/:category/products', filterProducts);
  router.put('/:category/products/:id', filterProductById);
  // TODO: add get category product by id
  return router
}
module.exports = CategoriesRouter;