import models from '../models';

module.exports.getAllCategories = () => {
  return new Promise(async (resolve, reject) => {
    const result = await models.Category.getAllCategories();
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
}
module.exports.filterCategory = (categoryName) => {
  return new Promise(async (resolve, reject) => {
    const result = await models.Category.findCategory(categoryName);
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
}

module.exports.filterProductsByCategory = (categoryName) => {
  return new Promise(async (resolve, reject) => {
    const result = await models.Product.filterProductsByCategory(categoryName);
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
}

module.exports.getProductById = (categoryName, id) => {
  return new Promise(async (resolve, reject) => {
    const result = await models.Product.getProductByCategory(categoryName, id);
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
}