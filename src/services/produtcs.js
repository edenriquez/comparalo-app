import models from '../models';
import {
  buildProductObject
} from '../api/utils/utils'


module.exports.allProducts = async () => {
  // TODO: handle error here with promises
  return models
    .Product
    .getAllProducts()

}
module.exports.findProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    const result = await models.Product.findById(id)
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
}

module.exports.createProduct = (body) => {
  return new Promise(async (resolve, reject) => {
    const data = buildProductObject(body)
    const entity = new models.Product(data)
    const response = await entity.save()
    if (!response) {
      reject(response)
    }
    resolve(response)
  })
}

module.exports.deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    const response = await models.Product.deleteById(id)
    if (!response) {
      reject(response)
    }
    resolve(response)
  })

}