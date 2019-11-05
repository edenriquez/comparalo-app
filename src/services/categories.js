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

module.exports.filterProducts = (categoryName) => {
  return new Promise(async (resolve, reject) => {
    const result = await models.Category.filterProducts(categoryName);
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
}

module.exports.getProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    const result = await models.Category.getProductById(id);
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
}