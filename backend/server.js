const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const storeRoutes = require('./routes/store.routes');
const connectDB = require('./config/db');
const cors = require('cors');


dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = [
  'https://inprocode.vercel.app',
  'https://inprocode-eight.vercel.app',
  'http://localhost:4200'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('❌ CORS bloqueado para:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));



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