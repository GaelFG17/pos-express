const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../data/config');
const User = require('./User.model');
const Payments = require('./Payments.model');

class Sales extends Model {}

Sales.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        descuento_total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
        metodo_pago: { type: DataTypes.STRING(40), allowNull: false },
        pagado_en: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
        cambio: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 }
    },
    {
        sequelize,
        modelName: 'Sales',
        tableName: 'sales',
        timestamps: true,
        createdAt: 'creado_en',
        updatedAt: false
    }
);

// Relación vital para poder traer los datos del cajero junto con la venta
Sales.belongsTo(User, { foreignKey: 'user_id', as: 'cajero' });
User.hasMany(Sales, { foreignKey: 'user_id', as: 'ventas' });

// Un pago (o varios en caso de pagos divididos) se almacena conectándolo con la venta
Sales.hasMany(Payments, { foreignKey: 'sale_id', as: 'pagos' });
Payments.belongsTo(Sales, { foreignKey: 'sale_id', as: 'venta' });

module.exports = { Sales };