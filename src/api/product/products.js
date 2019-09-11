import models from '../../models';
import mongoose from 'mongoose';

var errors = require('../../services/errors');


const ERROR_NOT_FOUND = errors.ERROR_NOT_FOUND;
const ERROR_COULD_NOT_SAVE = errors.ERROR_UNABLE_SAVE_PRODUCT;

const CREATED = 'created'

const generateProductId = () => {
  return `prod_${mongoose.Types.ObjectId()}`
};

const newProduct = (req) => {
  return {
    id: generateProductId(),
    mainImage: req.body.main,
    url: req.body.url,
    price: req.body.price,
    status: CREATED
  }
}

module.exports.getProduct = async (req, res) => {
  if (!req.params.id) {
    res.status(404).json({
      "message": "product not found"
    })
  }
  const product = await models.Product.findById(req.params.id)

  res.json(product)
}


module.exports.deleteProduct = async (req, res) => {
  if (!req.params.id) {
    res.status(404).json({
      "message": "product not found"
    })
  }
  const product = await models.Product.deleteById(req.params.id)

  res.json(product)
}
module.exports.allProducts = async (req, res) => {
  const all = await models.Product.getAllProducts()

  res.json(all);
}
module.exports.createProduct = async (req, res) => {
  let status = 200;
  let response = ''

  const product = new models.Product(newProduct(req))
  response = await product.save()
  if (!response) {
    status = 401;
    response = ERROR_COULD_NOT_SAVE;
  }

  res.status(status).json(response)
}