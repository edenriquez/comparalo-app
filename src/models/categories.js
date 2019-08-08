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

categorySchema.statics.findByName = async function (name) {
  return await this.findOne(name);
};

const Category = mongoose.model('Category', categorySchema);

export default Category;