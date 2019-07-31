module.exports.getCategories = (collection, category) => {
  return collection.find(i => category == i.category)
}

// TODO: fix status assignation
module.exports.getProduct = (categories, params) => {
  return categories.products.filter((i) => {
    if (params.id == i.id) {
      i.status = params.status
    }
  })
}