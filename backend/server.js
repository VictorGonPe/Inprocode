const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const storeRoutes = require('./routes/store.routes');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// Rutas
app.use('/api/stores', storeRoutes);

app.get('/', (req, res) => {
  res.send('API de tiendas funcionando');
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});