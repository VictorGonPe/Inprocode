const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  description: String,
  type: {
    type: String,
    enum: [
      "estanco",
      "restaurante",
      "drogueria",
      "zapateria",
      "panaderia",
      "supermercado",
      "ropa",
      "ferreteria",
      "papeleria",
      "fruteria",
    ],
    required: true,
  },
  premium: { type: Boolean, default: false },
  image: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

module.exports = mongoose.model("Store", storeSchema);
