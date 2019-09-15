import mongoose from 'mongoose';
import Product from './products';
import Category from './categories';

const connectDb = () => {
  return mongoose.connect(
    process.env.DATABASE_URL, {
      useNewUrlParser: true
    });
};

const models = {
  Product,
  Category
};

export {
  connectDb
};

export default models;