const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var searchSchema = new mongoose.Schema({
  product_name: {
    type: String,
    unique: true,
    index: true
  },
  category: {
    type: String,
    unique: true,
    index: true
  },
  vendor: {
    type: String,
    unique: true,
    index: true
  },
  brand: {
    type: String,
    unique: true,
    index: true
  },
  attributes: {
    any: {}
  },
  stats: {
    type: Number,
    required: true
  }
});

searchSchema.statics.allCoincidences = async function (query, max) {
  const searchRegex = new RegExp(query, 'i')
  return await this.find({
      product_name: searchRegex,
      category: searchRegex,
      vendor: searchRegex,
      brand: searchRegex,
      // TODO: attributes is pending to include 
    })
    .limit(max)
    .sort('stats', -1); // get descending data 
};


const Search = mongoose.model('Search', searchSchema);

export default Search;