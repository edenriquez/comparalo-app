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