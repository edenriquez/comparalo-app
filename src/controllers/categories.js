import {
  Category
} from "../services"
import {
  db
} from '../database/db'

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
  const categories = Category.getCategories(db.categories, req.params.category)
  const product = Category.getProduct(categories, req.params)
  res.json(product);
}