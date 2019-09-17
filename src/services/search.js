import {
  Search
} from '../models';


module.exports.allCoincidences = async (query, max) => {
  return new Promise(async (resolve, reject) => {
    const result = Search.allCoincidences(query, mac)
    if (!result) {
      reject(result)
    }
    resolve(result)
  })
};