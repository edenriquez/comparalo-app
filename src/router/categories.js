'use strict';

var express = require('express');

import {
  allCategories,
  // filterCategories,
  // filterProducts,
  // filterProductById,
  // getProductById
} from '../api/categories/categories';

import {
  scrapCategory
}
from '../jobs/jobs';


const CategoriesRouter = () => {
  var router = express.Router();
  router.get('/', allCategories);
  // router.get('/:category', filterCategories);
  // router.post('/category/new', scrapCategory);
  // router.get('/:category/products', filterProducts);
  // router.get('/:category/products/:id', getProductById);
  // router.put('/:category/products/:id', filterProductById);
  return router;
};

module.exports = CategoriesRouter;