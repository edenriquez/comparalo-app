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