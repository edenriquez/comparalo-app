var express = require('express');
var router = express.Router();
import {
  allCategories,
  filterCategories,
  filterProducts,
  filterProductById
} from '../controllers/categories';

router.get('/categories', allCategories);
router.get('/categories/:category', filterCategories);
router.get('/categories/:category/products', filterProducts);
router.put('/categories/:category/products/:id', filterProductById);

module.exports = router;