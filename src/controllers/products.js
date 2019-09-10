import models from '../models';
import mongoose from 'mongoose';

var errors = require('../services/errors');


const ERROR_NOT_FOUND = errors.ERROR_NOT_FOUND;
const ERROR_COULD_NOT_SAVE = errors.ERROR_UNABLE_SAVE_PRODUCT;
const ERROR_MALFORMED_REQUEST = errors.ERROR_MALFORMED_REQUEST;
const CREATED = 'created'

module.exports.allProducts = async (req, res) => {
  const all = await models.Product.getAllProducts()
  res.json(all);
}

const generateProductId = () => {
  return `prod_${mongoose.Types.ObjectId()}`
};
module.exports.createProduct = async (req, res) => {
  let status = 200;
  let response = ''

  const obj = {
    id: generateProductId(),
    mainImage: req.body.main,
    url: req.body.url,
    price: req.body.price,
    status: CREATED
  }

  const product = new models.Product(obj)

  const {
    error
  } = product.isValid(obj)

  if (error) {
    const details = error.details[0]
    status = 402;
    // TODO: correct this 
    response = ERROR_MALFORMED_REQUEST(details.message, details.context);
    res.status(status).json(response)
    return
  }

  response = await product.save()
  if (!response) {
    status = 401;
    response = ERROR_COULD_NOT_SAVE;
  }

  res.status(status).json(response)
}