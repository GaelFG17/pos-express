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
}

module.exports = { SalesController };