const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const storeRoutes = require('./routes/store.routes');
const connectDB = require('./config/db');
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:4200',
  'https://inprocode.vercel.app'
];

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
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