import models from '../models';

module.exports.getUserInformation = (user) => {
  return new Promise(async (resolve, reject) => {
    console.log('USERRRR ', user);

    const result = await models.User.findUser(user.email);
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
}