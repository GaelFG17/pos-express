const { ReportService } = require('../service/Report.Service');

class ReportController {
  static async obtenerCorte(req, res) {
    try {
      const reporte = await ReportService.getCorteCajaDiario();
      
      if (!reporte.ventas.length) {
        return res.status(200).json({ 
          success: true, 
          message: "Aún no hay ventas el día de hoy.",
          data: reporte 
        });
      }

      res.status(200).json({
        success: true,
        data: reporte
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false, 
        message: "Error al generar el reporte de ventas." 
      });
    }
  }
}

module.exports = { ReportController };