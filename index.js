require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDb } = require('./data/config');
const productRouter = require('./routes/productsRoutes');
const userRoutes = require("./route/User.routes");
const salesRoutes = require('./route/Sales.routes');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

connectDb();

// Rutas
app.use('/api/v1/products', productRouter);
app.use("/users", userRoutes);
app.use("/api/v1/sales", salesRoutes);

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

app.listen(PORT, () => {
  console.log(`Servidor furulando en http://localhost:${PORT}`);
});
