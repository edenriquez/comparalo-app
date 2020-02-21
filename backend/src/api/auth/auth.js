var service = require('../../services/auth');
var errors = require('../../services/errors');

module.exports.createUser = async (req, res) => {
  service.createUser(req.body)
    .then((user) => {
      res.status(200).json(user)
    }).catch(err => {
      res.status(404).json(
        errors.couldNotSaveUser()
      )
    })
}