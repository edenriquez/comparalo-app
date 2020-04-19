import models from '../models';
import {
  buildProductObject,
  updateProductObject,
  buildProductHistoryObjetc
} from '../api/utils/utils'

module.exports.getProductHistoric = async (productId) => {
  return new Promise(async (resolve, reject) => {
    const result = await models.ProducHistory.getProductHistoric(productId)
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
}

module.exports.allProducts = async () => {
  return new Promise(async (resolve, reject) => {
    const result = await models.Product.getAllProducts()
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
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
    if (body.meta && response.id) {
      const dataHistory = buildProductHistoryObjetc(body)
      dataHistory.product_id = response.id
      const entityHistory = new models.ProducHistory(dataHistory)
      if (await entityHistory.save()) {
        // TODO: update with logger 
        console.log('product history updated for ', response.id, ' name ', data.name)
      } else {
        console.log('product history cannot be updated for ', response.id)
      }
    }
    if (!response) {
      reject(response)
    }
    resolve(response)
  })
}
module.exports.updateProduct = (body, productId) => {
  return new Promise(async (resolve, reject) => {
    const result = await models.Product.findOne({
      id: productId
    })
    if (!result) {
      reject(result)
    }
    const data = updateProductObject(body)
    const response = await result.updateOne(data)
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