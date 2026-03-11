const { sequilize } = require('../data/config');
const bcrypt = require('bcrypt');

// models
const User = require('../model/User.model');
const { Products, InventoryMovements } = require('../model/productsModel');
const { Sales } = require('../model/Sales.model');
const SaleItem = require('../model/salesItem.model');
const Payments = require('../model/Payments.model');

class InstallController {
    static async install(req, res) {
        try {
            await sequelize.sync({ force: false });
            console.log("Tablas sincronizadas correctamente.");

            const adminUser = await User.obtenerPorUsuario('admin');

            let message = "La base de datos ya estaba instalada y el administrador ya existe.";

            if (!adminUser) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash('admin', salt);

                await User.crear(
                    'Administrador', 
                    'admin', 
                    hash, 
                    'admin'
                );
                
                message = "Instalación completada. Usuario: admin, Contraseña: admin";
            }

            const htmlResponse = `
                <meta charset="utf-8">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
                <div class="container py-5">
                    <h3>${message}</h3>
                    <p><b>Nota:</b> Por seguridad, cambia la contraseña después del primer inicio de sesión.</p>
                </div>
            `;
            
            res.status(200).send(htmlResponse);

        } catch (error) {
            console.error("Error en la instalación:", error);
            res.status(500).send(`<h3>Error durante la instalación</h3><p>${error.message}</p>`);
        }
    }
}

module.exports = { InstallController };
