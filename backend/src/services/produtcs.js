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
    // check if given job id has relation with a product
    // if not create new product
    // then save product_id into job_id 
    // job_id -> product_id
    // if yes get that object and update it

    const entity = new models.Product(data)
    const response = await entity.save()
    if (body.meta && response.id) {
      const dataHistory = buildProductHistoryObjetc(body)
      dataHistory.product_id = response.id // product ID is being generated every time
      const entityHistory = new models.ProducHistory(dataHistory)
      if (await entityHistory.save()) {
        console.log("\x1b[33m", 'product history updated for ', response.id, ' name ', data.name)
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