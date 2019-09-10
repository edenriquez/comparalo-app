module.exports.ERROR_NOT_FOUND = {
  message: "error item not found",
}

module.exports.ERROR_UNABLE_SAVE_PRODUCT = {
  message: "error item could not be saved",
}

module.exports.ERROR_MALFORMED_REQUEST = (field, context) => {
  return {
    message: `error malformed request`,
    details: `validation error on field ${field}`,
    context: context
  }
}