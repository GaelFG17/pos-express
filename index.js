require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDb } = require('./data/config');
const productRouter = require('./routes/productsRoutes');

const app = express();
app.use(express.json());
app.use(cors());

connectDb();

// Rutas
app.use('/api/v1/products', productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));