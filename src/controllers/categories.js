import {
  Category
} from "../services"

import {
  db
} from '../database/db'

var errors = require('../services/errors');


const ERROR_NOT_FOUND = errors.ERROR_NOT_FOUND;

module.exports.allCategories = (req, res) => {
  res.json(db);
}

module.exports.filterCategories = (req, res) => {
  const response = Category.getCategories(db.categories, req.params.category)
  res.json(response);
}

module.exports.filterProducts = (req, res) => {
  const response = Category.getCategories(db.categories, req.params.category)
  res.json(response.products);
}

module.exports.filterProductById = (req, res) => {
  let status = 200;
  const categories = Category.getCategories(db.categories, req.params.category)
  const product = Category.getProduct(categories, req.params)
  if (!product) {
    status = 404;
    product = ERROR_NOT_FOUND;
  } else {
    // TODO: save model here
    product.status = req.params.status
  }
  res.status(status).json(product);
}

module.exports.getProductById = (req, res) => {
  let status = 200;
  const categories = Category.getCategories(db.categories, req.params.category)
  let product = Category.getProduct(categories, req.params)[0]
  // TODO: handle this in a better way
  if (!product) {
    status = 404;
    product = ERROR_NOT_FOUND;
  }
  res.status(status).json(product);
}