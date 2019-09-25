'use strict';

var express = require('express');

import {
  allCategories,
  // filterCategories,
  // filterProducts,
  // filterProductById,
  // getProductById
} from '../api/categories/categories';


const CategoriesRouter = () => {
  var router = express.Router();
  router.get('/', allCategories);
  // Manually set first cateogries
  // router.get('/:category', filterCategories);

  // router.get('/:category/products', filterProducts);
  // router.get('/:category/products/:id', getProductById);
  // router.put('/:category/products/:id', filterProductById);
  return router;
};

module.exports = CategoriesRouter;