import mongoose from 'mongoose';

const productHistorySchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
  },
  price: {
    type: String,
  },
  msi: {
    type: String,
  },
  shipment: {
    type: String,
  },
  vendorRank: {
    type: Number,
  },
  vendorName: { // optional
    type: String,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});


productHistorySchema.methods.isValid = (data) => {
  const Joi = require('joi');
  const schema = Joi.object().keys({
    product_id: Joi.string().required(),
    msi: Joi.string(),
    shipment: Joi.string(),
    vendorRank: Joi.number(),
    vendorName: Joi.string()
  });
  return schema.validate(data);
};

const ProducHistory = mongoose.model('ProducHistory', productHistorySchema);

export default ProducHistory;