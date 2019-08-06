var errors = require('../services/errors')
import models, {
  connectDb
} from '../models';
import mongoose from 'mongoose';

const CREATED = "created";
const ERROR_COULD_NOT_SAVER = errors.ERROR_UNABLE_SAVE_PRODUCT
module.exports.getAllJobs = (req, res) => {
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

module.exports.createJob = async (req, res) => {
  const prod = new models.Product({
    id: mongoose.Types.ObjectId(),
    mainImage: req.params.main,
    url: req.params.url,
    price: req.params.price,
    status: CREATED
  })

  let status = 200
  let response = await prod.save()
  if (!response) {
    status = 401
    response = ERROR_COULD_NOT_SAVER
  }

  res.status(status).json(response)
}