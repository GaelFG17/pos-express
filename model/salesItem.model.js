const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../data/config');

class SaleItem extends Model {
    static async crear(sale_id, product_id, cantidad, precio_unitario, descuento_item = 0, subtotal) {
        return this.create({ sale_id, product_id, cantidad, precio_unitario, descuento_item, subtotal });
    }

    static async obtenerPorId(id) {
        return this.findByPk(id, {
            attributes: ['id', 'sale_id', 'product_id', 'cantidad', 'precio_unitario', 'descuento_item', 'subtotal']
        });
    }

    static async obtenerPorVenta(sale_id) {
        return this.findAll({
            where: { sale_id },
            attributes: ['id', 'sale_id', 'product_id', 'cantidad', 'precio_unitario', 'descuento_item', 'subtotal']
        });
    }

    static async obtenerTodos() {
        return this.findAll({
            attributes: ['id', 'sale_id', 'product_id', 'cantidad', 'precio_unitario', 'descuento_item', 'subtotal']
        });
    }

    static async actualizar(id, cantidad, precio_unitario, descuento_item, subtotal) {
        return this.update({ cantidad, precio_unitario, descuento_item, subtotal }, { where: { id } });
    }

    static async eliminar(id) {
        return this.destroy({ where: { id } });
    }
}

SaleItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sale_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'sales',
                key: 'id'
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        cantidad: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        precio_unitario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        descuento_item: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'SaleItem',
        tableName: 'sale_items',
        engine: 'InnoDB',
        timestamps: false
    }
);

module.exports = SaleItem;
