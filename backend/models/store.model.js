const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  localizacion: String,
  descripcion: String,
  imagen: String
});

module.exports = mongoose.model('Store', storeSchema);
