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
  }
});


userSchema.methods.isValid = (data) => {
  const Joi = require('joi');
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required().unique(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

userSchema.statics.findUser = async function (email) {
  return await this.findOne({
    email: email
  });
};

const User = mongoose.model('User', userSchema);

export default User;