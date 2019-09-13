import models from '../../models';
import {
  buildProductObject
} from '../utils/utils'

var errors = require('../../services/errors');

module.exports.productSchemaValidation = (req, res, next) => {
  const obj = buildProductObject(req.body);
  const product = new models.Product(obj);
  const {
    error
  } = product.isValid(obj);

  if (error) {
    const details = error.details[0]
    const status = 402;

    res.status(status).json(
      errors.malformedRequest(details.message, details.context)
    )
    return
  }
  next()
}