const { Sales } = require('../model/Sales.model');
const User = require('../model/User.model');
const SaleItem = require('../model/salesItem.model');
const { Products } = require('../model/productsModel');
const { Op, fn, col } = require('sequelize');

class ReportService {
  static async getCorteCajaDiario() {
    const inicioHoy = new Date();
    inicioHoy.setHours(0, 0, 0, 0);

    const ventas = await Sales.findAll({
      where: {
        creado_en: { [Op.gte]: inicioHoy }
      },
      include: [
        { model: User, as: 'cajero', attributes: ['nombre'] },
      ],
      order: [['creado_en', 'DESC']]
    });

    const resumen = await Sales.findOne({
      where: { creado_en: { [Op.gte]: inicioHoy } },
      attributes: [
        [fn('SUM', col('total')), 'totalVentas'],
        [fn('SUM', col('descuento_total')), 'totalDescuentos'],
        [fn('COUNT', col('id')), 'cantidadTransacciones']
      ],
      raw: true
    });

    return {
      resumen,
      ventas
    };
  }
}

module.exports = { ReportService };