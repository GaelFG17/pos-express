require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: false
    }
);

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); 
        console.log("conectado yupiiii :3");
    } catch (error) {
        console.error("error esta mal :c", error.message);
    }
};

const installDb = async () => {
    const tempConn = new Sequelize('', process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: false
    });
    
    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await tempConn.close();

    await sequelize.authenticate();

    const User = require('../model/User.model');
    const { Products, InventoryMovements } = require('../model/productsModel');
    const { Sales } = require('../model/Sales.model');
    const SaleItem = require('../model/salesItem.model');
    const Payments = require('../model/Payments.model');

    await sequelize.sync({ alter: true });

    const bcrypt = require('bcrypt');
    const adminExist = await User.findOne({ where: { usuario: 'admin' } });
    
    if (!adminExist) {
        const hash = await bcrypt.hash('admin', 10);
        await User.create({
            nombre: 'Administrador',
            usuario: 'admin',
            password_hash: hash,
            rol: 'admin'
        });
    }

    return true;
};

module.exports = { sequelize, connectDb, installDb };