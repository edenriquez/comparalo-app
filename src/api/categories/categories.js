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

// module.exports.filterCategories = (req, res) => {
//   const response = Category.getCategories(db.categories, req.params.category)
//   res.json(response);
// }

// module.exports.filterProducts = (req, res) => {
//   const response = Category.getCategories(db.categories, req.params.category)
//   res.json(response.products);
// }

// module.exports.filterProductById = (req, res) => {
//   let status = 200;
//   const categories = Category.getCategories(db.categories, req.params.category)
//   const product = Category.getProduct(categories, req.params)
//   if (!product) {
//     status = 404;
//     product = ERROR_NOT_FOUND;
//   } else {
//     // TODO: save model here
//     product.status = req.params.status
//   }
//   res.status(status).json(product);
// }

// module.exports.getProductById = (req, res) => {
//   let status = 200;
//   const categories = Category.getCategories(db.categories, req.params.category)
//   let product = Category.getProduct(categories, req.params)[0]
//   // TODO: handle this in a better way
//   if (!product) {
//     status = 404;
//     product = ERROR_NOT_FOUND;
//   }
//   res.status(status).json(product);
// }