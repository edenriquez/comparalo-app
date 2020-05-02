var service = require('../../services/user');
import {
  resultsNotFound,
  userHasNoProducts,
} from '../../services/errors';

const isAuthenticated = async (req, res, next) => {
  console.log('[authentication middleware] starting', req.user)
  if (req.user) {
    console.log('[authentication middleware] user session exists')
    next();
  } else {
    console.log('[authentication middleware] no user sesion')
    res.redirect('/'); // placeholder
  }
}

const getUserInformation = async (req, res) => {
  service.getUserInformation(req.user)
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(404).json(resultsNotFound())
    })
}

const getUserProduct = async (req, res) => {
  service.getUserProduct(req.params.userid)
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      res.status(401).json(userHasNoProducts())
    })
}

module.exports = {
  isAuthenticated,
  getUserInformation,
  getUserProduct,
}