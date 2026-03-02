const {SalesService} = require('../service/Sales.service');

class SalesController {
    static async recientes(req, res){
        try{
            const userId = req.user.id;

            const sales = await SalesService.recientes(userId);

            if(!sales || sales.length === 0){
                return res.status(404).json({ 
                    message: 'No se encontraron ventas para este usuario' 
                });
            }

            res.status(200).json(sales);

        }catch(error){
            res.status(500).json({ 
                message: error.message || 'Error al obtener las ventas recientes', 
                error: error.message 
            });
        }
    }
    static async crearVenta(req, res){
        try{
            const userId = req.user.id;
            const { total, descuento_total, metodo_pago, pagado_en, carrito } = req.body;
            const nuevaVenta = await SalesService.crearVenta({ user_id: userId, total, descuento_total, metodo_pago, pagado_en, carrito });
            res.status(201).json(nuevaVenta);
        }catch(error){
            res.status(500).json({ 
                message: error.message || 'Error al crear la venta', 
                error: error.message 
            });
        }
    }
}

module.exports = { SalesController };