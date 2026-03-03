const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../data/config');

class Payments extends Model {
    // Método de utilidad para buscar todos los pagos de un ticket
    static async obtenerPorVenta(sale_id) {
        return this.findAll({
            where: { sale_id }
        });
    }
}

Payments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sale_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        metodo: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        monto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        referencia: {
            type: DataTypes.STRING(120),
            allowNull: true 
        }
    },
    {
        sequelize,
        modelName: 'Payments',
        tableName: 'payments',
        timestamps: true,
        createdAt: 'creado_en',
        updatedAt: false
    }
);

module.exports = Payments;