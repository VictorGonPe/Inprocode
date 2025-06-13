const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  description: String,
  image: String,
});


module.exports = mongoose.model('Store', storeSchema);
