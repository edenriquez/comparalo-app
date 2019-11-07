var service = require('../../services/categories');
var errors = require('../../services/errors');


module.exports.allCategories = (req, res) => {
  service.getAllCategories()
    .then((categories) => {
      res.status(200).json(categories)
    })
    .catch((error) => {
      res.status(404).json(
        errors.categoryNotFound()
      )
    })
}

module.exports.filterCategory = (req, res) => {
  service.filterCategory(req.params.category)
    .then((category) => {
      res.status(200).json(category)
    })
    .catch((error) => {
      res.status(404).json(
        errors.categoryNotFound()
      )
    })
}

module.exports.filterProductsByCategory = (req, res) => {
  service.filterProductsByCategory(req.params.category)
    .then((category) => {
      res.status(200).json(category)
    })
    .catch((error) => {
      res.status(404).json(
        errors.categoryNotFound()
      )
    })
}

module.exports.getProductById = (req, res) => {
  service.getProductById(req.params.category, req.params.id)
    .then((category) => {
      res.status(200).json(category)
    })
    .catch((error) => {
      res.status(404).json(
        errors.categoryNotFound()
      )
    })
}