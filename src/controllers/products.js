import models from '../models';
import mongoose from 'mongoose';

var errors = require('../services/errors');


const ERROR_NOT_FOUND = errors.ERROR_NOT_FOUND;
const CREATED = 'created'

module.exports.allProducts = async (req, res) => {
  const all = await models.Product.getAllProducts()
  res.json(all);
}

module.exports.createProduct = async (req, res) => {
  const prod = new models.Product({
    id: mongoose.Types.ObjectId(),
    mainImage: req.body.main,
    url: req.body.url,
    price: req.body.price,
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