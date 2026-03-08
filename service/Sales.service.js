const Sales = require('../model/Sales.model');
const User = require('../model/User.model');
const Payments = require('../model/Payments.model');
const SalesItem = require('../model/salesItem.model');
class SalesService {
    static async recientes(userId) {
        try {
            return await Sales.findAll({
                where: { user_id: userId },
                attributes: ['id', 'creado_en', 'total', 'metodo_pago', 'pagado_en', 'cambio'],
                include: [
                    {
                        model: User,
                        as: 'cajero',
                        attributes: ['nombre']
                    },
                    {
                        model: Payments,
                        as: 'pagos',
                        attributes: ['metodo', 'monto', 'referencia']
                    }
                ],
                order: [['id', 'DESC']]
            });
        } catch (error) {
            throw error;
        }
    }

    static async crearVenta({ user_id, total, descuento_total, metodo_pago, pagado_en, referencia, carrito}) {
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

            // crear los items de la venta
            for (const item of carrito) {
                await SalesItem.crear(sale_id, item.product_id, item.cantidad, item.precio_unitario, item.descuento_item, item.subtotal);
            }

            // registrar el pago asociado
            await Payments.create({
                sale_id,
                metodo: metodo_pago,
                monto: pagado_en,
                referencia: referencia || null
            });

            // devolver la venta con la información de pago incluida
            const ventaConPago = await Sales.findByPk(sale_id, {
                include: [{ model: Payments, as: 'pagos', attributes: ['metodo', 'monto', 'referencia'] }]
            });
            return ventaConPago;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { SalesService };