require('dotenv').config();
const express = require('express');
const { connectDb } = require('./data/config');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());


connectDb();

app.listen(PORT, () => {
  console.log(`Servidor furulando en http://localhost:${PORT}`);
});