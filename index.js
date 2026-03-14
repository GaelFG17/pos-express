require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDb } = require('./data/config');
const productRouter = require('./route/productRoutes');
const userRoutes = require("./route/User.routes");
const salesRoutes = require('./route/Sales.routes');
const loginRoutes = require('./route/login.Route');
const installRoutes = require('./route/Install.routes');
const { ReportController } = require('./route/Report.Route');


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/install", installRoutes);
app.use('/api/v1/products', productRouter);
app.use("/users", userRoutes);
app.use("/api/v1/sales", salesRoutes);
app.use("/api/v1/auth", loginRoutes);
app.use("/api/v1/report", require('./route/Report.Route'));


app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
    connectDb().catch(() => {});
});