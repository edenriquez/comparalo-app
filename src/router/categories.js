'use strict';

var express = require('express');

import {
  allCategories,
  filterCategory,
  filterProducts,
  getProductById
} from '../api/categories/categories';


const CategoriesRouter = () => {
  var router = express.Router();
  router.get('/', allCategories);
  router.get('/:category', filterCategory);
  router.get('/:category/products', filterProducts);
  router.get('/:category/products/:id', getProductById);
  return router;
};

module.exports = CategoriesRouter;