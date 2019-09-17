import models from '../../models';
var service = require('../../services/search');


module.exports.searchOptions = async (req, res) => {
  return await service.allCoincidences(req.query.q, req.query.max)
}