import models from '../../models';
import {
  buildProductObject
} from '../utils/utils'

var errors = require('../../services/errors');

module.exports.createProduct = async (req, res) => {
  let status = 200;
  let response = ''
  const data = buildProductObject(req.body)
  const product = new models.Product(data)
  response = await product.save()
  if (!response) {
    status = 401;
    response = ERROR_COULD_NOT_SAVE;
  }

  res.status(status).json(response)
}

module.exports.getProduct = async (req, res) => {
  if (!req.params.id) {
    res.status(404).json(errors.productNotFound())
    return
  }
  const response = await models.Product.findById(req.params.id)
  res.status(200).json(response)
}

module.exports.deleteProduct = async (req, res) => {
  if (!req.params.id) {
    res.status(404).json(errors.productNotFound())
    return
  }
  const response = await models.Product.deleteById(req.params.id)
  res.status(200).json(response)
}
module.exports.allProducts = async (req, res) => {
  const all = await models.Product.getAllProducts()
  res.json(all);
}