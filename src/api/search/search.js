var service = require('../../services/search');


module.exports.searchOptions = async (req, res) => {
  return await service.allCoincidences(req.query.q, parseInt(req.query.max))
}

module.exports.startCommitOnSearchEngine = async (req, res, next) => {
  req.searchId = await service.startCommitRegistry(req.body)
  next()
}

module.exports.endCommitOnSearchEngine = async (req, res, next) => {
  if (req.productId && req.searchId) {
    const productId = req.productId
    const searchId = req.searchId
    await service.endCommitRegistry(productId, searchId)
    delete req.productId
    delete req.searchId
    next()
  }
}