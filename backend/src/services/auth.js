import models from '../models';
import {
  buildUserObject
} from '../api/utils/utils'

module.exports.createUser = (body) => {
  return new Promise(async (resolve, reject) => {
    const data = buildUserObject(body)
    const entity = new models.Users(data)
    const response = await entity.save()
    if (response.id) {
      return resolve(response)
    }
    reject(data)
  })
}