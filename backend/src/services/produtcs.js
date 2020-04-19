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
    let response;
    let data;
    response = await models.Product.findById(body.id)
    if (!response) {
      data = buildProductObject(body)
      const entity = new models.Product(data)
      response = await entity.save()
    }
    if (body.meta && response.id) {
      let productHistory = await models.ProducHistory.getProductHistoric(response.id)
      let entityHistory = {}
      let toUpdate = false;
      let result;
      console.log('\n\n\ANTES', productHistory);

      if (productHistory.length > 0) {
        toUpdate = true;
        productHistory = productHistory[0]
        entityHistory.price = [...productHistory.price, response.currentPrice]
        entityHistory.vendorRank = [...productHistory.vendorRank, (response.vendorRank || 0)]
        entityHistory.installments = body.meta.installments || 0
        entityHistory.shippingDetails = body.meta.shippingDetails || 0
        entityHistory.vendorName = body.meta.vendorName || 0
      } else {
        productHistory.price = [response.currentPrice]
        productHistory.vendorRank = [(body.meta.vendorRank || 0)]
        productHistory.installments = body.meta.installments || 0
        productHistory.shippingDetails = body.meta.shippingDetails || 0
        productHistory.vendorName = body.meta.vendorName || 0
        productHistory.product_id = response.id
        entityHistory = new models.ProducHistory(productHistory)
      }
      console.log('\n\n\nDESPUES', entityHistory);

      if (toUpdate) {
        console.log('UPDATING...');

        result = productHistory.updateOne(entityHistory)
      } else {
        result = entityHistory.save()
      }

      if (await result) {
        console.log("\x1b[33m", 'product history updated for ', body.id, ' name ', body.name)
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