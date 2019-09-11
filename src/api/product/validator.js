import models from '../../models';
import mongoose from 'mongoose';
var errors = require('../../services/errors');
const ERROR_MALFORMED_REQUEST = errors.ERROR_MALFORMED_REQUEST;
const CREATED = 'created'
const generateProductId = () => {
  return `prod_${mongoose.Types.ObjectId()}`
};
const prodObj = (req) => {
  return {
    id: generateProductId(),
    mainImage: req.body.main,
    url: req.body.url,
    price: req.body.price,
    status: CREATED
  }
}

module.exports.newProduct = (req, res, next) => {
  const obj = prodObj(req)
  const product = new models.Product(obj)

  const {
    error
  } = product.isValid(obj)

  if (error) {
    const details = error.details[0]
    const status = 402;
    // TODO: correct this 
    const response = ERROR_MALFORMED_REQUEST(details.message, details.context);
    res.status(status).json(response)
    return
  }
  next()
}