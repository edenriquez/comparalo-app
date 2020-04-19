import mongoose from 'mongoose';

const productHistorySchema = new mongoose.Schema({
  product_id: {
    type: String,
  },
  price: {
    type: [String],
  },
  installments: {
    type: String,
  },
  shippingDetails: { // shipping details
    type: String,
  },
  vendorRank: { // product rank
    type: [Number],
  },
  vendorName: { // optional
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});


productHistorySchema.methods.isValid = (data) => {
  const Joi = require('joi');
  const schema = Joi.object().keys({
    product_id: Joi.string().required(),
    installments: Joi.string(),
    shippingDetails: Joi.string(),
    vendorRank: Joi.number(),
    vendorName: Joi.string()
  });
  return schema.validate(data);
};

productHistorySchema.statics.getProductHistoric = async function (productId) {
  return await this.find({
      product_id: productId,
    }).limit(10)
    .sort({
      stats: 'desc',
    });
}


const ProducHistory = mongoose.model('ProducHistory', productHistorySchema);

export default ProducHistory;