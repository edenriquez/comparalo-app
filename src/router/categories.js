'use strict';

var express = require('express');

import {
  allCategories,
  filterCategory,
  filterProductsByCategory,
  getProductById
} from '../api/categories/categories';


const CategoriesRouter = () => {
  var router = express.Router();
  router.get('/', allCategories);
  router.get('/:category', filterCategory);
  router.get('/:category/products', filterProductsByCategory);
  router.get('/:category/products/:id', getProductById);
  return router;
};

module.exports = CategoriesRouter;