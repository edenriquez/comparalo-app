import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  mainImage: {
    type: String,
    unique: true,
  },
  url: {
    type: String,
    unique: true,
  },
  price: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    unique: true,
  },
});

productSchema.statics.findById = async function (id) {
  let product = await this.findOne({
    id: id,
  });

  if (!product) {
    product = await this.findOne({
      id: id
    });
  }
  return product;
};

const Product = mongoose.model('Product', productSchema);

export default Product;