var errors = require('../services/errors')

const CREATED = "created";
const ERROR_COULD_NOT_SAVER = errors.ERROR_UNABLE_SAVE_PRODUCT
module.exports.createJob = (req, res) => {
  res.json({
    "jobs": [{
      "scrapping": {
        "product": "TV",
      },
      "updating": {
        "product": "Earphones",
      }
    }]
  });
}