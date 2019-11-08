var service = require('../../services/search');


module.exports.startCommitOnSearchEngine = async (req, res, next) => {
  req.searchId = await service.startCommitRegistry(req.body)
  next()
}

module.exports.searchOptions = async (req, res) => {
  service.allCoincidences(req.query.q, parseInt(req.query.max))
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(404).json(resultsNotFound())
    })
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
