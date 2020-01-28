import models from '../models';

import {
  buildSearchObject
} from '../api/utils/utils'


module.exports.allCoincidences = async (query, max) => {
  return new Promise(async (resolve, reject) => {
    const result = models.Search.allCoincidences(query, max)
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
};

module.exports.startCommitRegistry = async (body) => {
  return new Promise(async (resolve, reject) => {

    const data = buildSearchObject(body)
    const search = new models.Search(data)
    const exist = await models.Search.findByName(data.product_name)
    if (exist) {
      // it does not create the same registry on db for the same product name
      exist.stats = exist.stats + 1
      const statUpdated = exist.save()
      if (statUpdated) {
        resolve(statUpdated)
        // TODO: research if there is any way better to solve this return
        return
      }
      reject(statUpdated)
      // TODO: research if is ther any better way to solve this return
      return
    }
    const result = await search.save()
    if (!result) {
      reject(result.search_id)
      // TODO: research if is ther any better way to solve this return
      return
    }
    resolve(result)
    // TODO: research if is ther any better way to solve this return
    return
  })
};

module.exports.endCommitRegistry = async (productId, searchId) => {
  return new Promise(async (resolve, reject) => {
    const search = new models.Search()
    const result = search.findById(searchId)
    if (!result) {
      reject(result)
    }
    result.product_id = productId
    if (await result.update()) {
      resolve(result)
    }
    reject(result)
  })
};