const { DataTypes } = require('sequelize');
const { sequelize } = require('../data/config');

const Products = sequelize.define('Products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    sku: { type: DataTypes.STRING, unique: true },
    precio: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    costo: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    stock: { type: DataTypes.FLOAT, defaultValue: 0 },
    min_stock: { type: DataTypes.FLOAT, defaultValue: 0 },
    status: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: true });

const InventoryMovements = sequelize.define('InventoryMovements', {
    cantidad: { type: DataTypes.FLOAT, allowNull: false },
    tipo: { type: DataTypes.ENUM('entrada', 'salida'), allowNull: false },
    nota: { type: DataTypes.STRING }
}, { timestamps: true });

// Relaciones
Products.hasMany(InventoryMovements, { foreignKey: 'product_id' });
InventoryMovements.belongsTo(Products, { foreignKey: 'product_id' });

module.exports = { Products, InventoryMovements };