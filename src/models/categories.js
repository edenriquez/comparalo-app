import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  status: {
    type: String,
  },
});

categorySchema.methods.isValid = (data) => {
  const Joi = require('joi');
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    status: Joi.string().required(),
  })
  return schema.validate(data)

}
categorySchema.statics.findByName = async function (name) {
  return await this.findOne(name);
};

const Category = mongoose.model('Category', categorySchema);

export default Category;