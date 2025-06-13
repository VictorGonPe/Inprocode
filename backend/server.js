const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

const app = express();

const connectDB = require('./config/db');
connectDB();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('conectado a MongoDB'))
    .catch((err) => console.error('Error al conectar a MongoDB, err'));


app.get('/', (req, res) => {
  res.json('API Tiendas funcionando 🏪');
});

app.listen(3000, () => console.log("Backend en http://localhost:3000"));
