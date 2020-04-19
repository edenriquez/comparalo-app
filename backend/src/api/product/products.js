import models from '../../models';
var errors = require('../../services/errors');
var service = require('../../services/produtcs');


module.exports.getProductHistoric = async (req, res) => {
  service.getProductHistoric(req.params.id)
    .then((product) => {
      res.status(200).json(product)
    })
    .catch((err) => {
      res.status(404).json(
        errors.productNotFound()
      )
    })
}

module.exports.allProducts = async (req, res) => {
  service.allProducts()
    .then((product) => {
      res.status(200).json(product)
    })
    .catch((err) => {
      res.status(404).json(
        errors.productNotFound()
      )
    })
}

module.exports.getProduct = async (req, res) => {
  service.findProductById(req.params.id)
    .then((product) => {
      res.status(200).json(product)
    })
    .catch((err) => {
      res.status(404).json(
        errors.productNotFound()
      )
    })
}

module.exports.createProduct = async (req, res, next) => {
  service.createProduct(req.body)
    .then((product) => {
      req.productId = product.id // pass product id through middleware
      res.status(200).json(product)
      next();
    })
    .catch((err) => {
      res.status(401).json(
        errors.couldNotSave()
      )
    })
}
module.exports.updateProduct = async (req, res) => {
  service.updateProduct(req.body, req.params.id)
    .then((product) => {
      res.status(200).json(product)
    })
    .catch((error) => {
      // TODO: create could not update 
      res.status(401).json(
        errors.couldNotSave()
      )
    })
}
module.exports.deleteProduct = async (req, res) => {
  service.deleteProduct(req.params.id)
    .then((product) => {
      res.status(200).json(product)
    })
    .catch((err) => {
      res.status(401).json(
        errors.couldNotSave()
      )
    })
}