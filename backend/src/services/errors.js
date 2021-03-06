import {
  ERRORS
} from '../config/constants';

module.exports.cannotLinkProduct = (context) => {
  return {
    message: `error cannot link the product with user`,
    context: JSON.stringify(context)
  }
}

module.exports.malformedRequest = (field, context) => {
  return {
    message: `error malformed request`,
    details: `validation error on field ${field}`,
    context: context
  }
}
module.exports.categoryNotFound = () => {
  return {
    message: ERRORS.CATEGORY_NOT_FOUND,
    details: `Cannot display categories`,
  }
}
module.exports.productNotFound = () => {
  return {
    message: ERRORS.ITEM_NOT_FOUND,
    details: `Id provided was not found in our records`,
  }
}
module.exports.resultsNotFound = () => {
  return {
    message: ERRORS.RESULTS_NOT_FOUND,
    details: `Search params not match in our records`,
  }
}
module.exports.userHasNoProducts = () => {
  return {
    message: ERRORS.RESULTS_NOT_FOUND,
    details: `user id doesn't have products linked`,
  }
}
module.exports.couldNotSave = () => {
  return {
    message: ERRORS.COULD_NOT_SAVE_PRODUCT,
    details: `Cannot save product object, try again later`,
  }
}

module.exports.couldNotSaveUser = () => {
  return {
    message: ERRORS.COULD_NOT_SAVE_USER,
    details: `Cannot save user object, try again later`,
  }
}