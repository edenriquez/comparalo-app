import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  mainImage: {
    type: String,
  },
  url: {
    type: String,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
  },
});

productSchema.methods.isValid = (data) => {
  const Joi = require('joi');
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    mainImage: Joi.string().required(),
    url: Joi.string().uri().trim().required(),
    price: Joi.number().required(),
    status: Joi.string().valid("created", "pending").required()
  });
  return schema.validate(data);
};

productSchema.statics.findById = async function (id) {
  return await this.findOne({
    id: id
  });
};

productSchema.statics.deleteById = async function (id) {
  return await this.deleteOne({
    id: id
  });
};

productSchema.statics.getAllProducts = async function () {
  var productProjection = {
    __v: false,
    _id: false
  };
  return await this.find({}, productProjection);
};

const Product = mongoose.model('Product', productSchema);

export default Product;