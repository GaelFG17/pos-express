const Sales = require('../model/Sales.model');
const User = require('../model/User.model');
const SalesItem = require('../model/salesItem.model');
class SalesService {
    static async recientes() {
        try {
            return await Sales.findAll({
                where: { user_id: userId },
                attributes: ['id', 'creado_en', 'total', 'metodo_pago', 'pagado_en', 'cambio'],

                include: [{
                    model: User,
                    as: 'cajero',
                    attributes: ['nombre']
                }],
                order: [['id', 'DESC']]
            });
        } catch (error) {
            throw error;
        }
    }

    static async crearVenta({ user_id, total,descuento_total, metodo_pago, pagado_en, carrito}) {
        try {
            const cambio = pagado_en - total + descuento_total;

            const nuevaVenta = await Sales.create({
                user_id,
                total,
                descuento_total,
                metodo_pago,
                pagado_en,
                cambio
            });
            const sale_id = nuevaVenta.id;
            for (const item of carrito) {
                await SalesItem.crear(sale_id, item.product_id, item.cantidad, item.precio_unitario, item.descuento_item, item.subtotal);
            }
            return nuevaVenta;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { SalesService };