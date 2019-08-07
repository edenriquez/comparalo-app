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
    type: String,
  },
  status: {
    type: String,
  },
});

productSchema.statics.findById = async function (id) {
  return await this.findOne({
    id: id
  });
};

productSchema.statics.getAllProducts = async function () {
  return await this.find();
};

const Product = mongoose.model('Product', productSchema);

export default Product;