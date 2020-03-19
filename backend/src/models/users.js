const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    index: true,
    unique: true
  },
  username: {
    type: String,
    index: true
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    index: true
  },
  photo: {
    type: String,
  },
  status: {
    type: String
  }
});


userSchema.methods.isValid = (data) => {
  const Joi = require('joi');
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required().unique(),
    password: Joi.string().required(),
    photo: Joi.string().required(),
    status: Joi.string().valid(
      "activated",
      "inactive"
    )
  });
  return schema.validate(data);
};

userSchema.statics.findUser = async function (email) {
  return await this.findOne({
    email: email
  });
};

userSchema.statics.generateHash = async function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.statics.validPassword = async function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;