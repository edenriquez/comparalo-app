var service = require('../../services/user');
import {
  resultsNotFound
} from '../../services/errors';




module.exports.getUserInformation = async (req, res) => {
  service.getUserInformation(req.user)
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(404).json(resultsNotFound())
    })
}

module.exports.isAuthenticated = async (req, res, next) => {
  console.log('[authentication middleware] starting')
  if (req.usedStrategy) {
    console.log('[authentication middleware] user session exists')
    next();
  } else {
    console.log('[authentication middleware] no user sesion')
    res.redirect('/auth/facebook');
    // TODO: check how to identify user type
    // res.redirect('/auth/google');
  }
}