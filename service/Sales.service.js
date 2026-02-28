const Sales = require('../model/Sales.model');
const User = require('../model/User.model');

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
}

module.exports = { SalesService };