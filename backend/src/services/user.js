import models from '../models';

module.exports.getUserInformation = (user) => {
  return new Promise(async (resolve, reject) => {
    const result = models.Users.findUser(user.email);
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
}
module.exports.getUserProduct = (userId) => {
  return new Promise(async (resolve, reject) => {

    const result = models.Product.userProducts(userId);
    console.log(result);

    if (!result) {
      reject(result)
    }
    resolve(result)
  })
}