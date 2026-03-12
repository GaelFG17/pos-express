const { installDb } = require('../data/config');
const User = require('../model/User.model');

const installSystem = async (req, res) => {
    try {
        try {
            const adminExist = await User.findOne({ where: { usuario: 'admin' } });
            if (adminExist) {
                return res.send(`
                    <meta charset="utf-8">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
                    <div class="container py-5">
                        <div class="alert alert-warning">
                            <h3>El sistema ya está instalado</h3>
                            <p>Por seguridad, la instalación está bloqueada.</p>
                            <a class="btn btn-primary" href="/login">Ir al inicio de sesión</a>
                        </div>
                    </div>
                `);
            }
        } catch (e) {}

        await installDb();

        res.send(`
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
            <div class="container py-5">
                <h3>Instalación completada yupiiii :3</h3>
                <p>Usuario: <b>admin</b>, Contraseña: <b>admin</b></p>
                <a class="btn btn-primary" href="/login">Ir al inicio de sesión</a>
            </div>
        `);

    } catch (error) {
        console.error(error);
        res.status(500).send(`
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
            <div class="container py-5">
                <div class="alert alert-danger">
                    <h3>Error esta mal :c</h3>
                    <p>${error.message}</p>
                </div>
            </div>
        `);
    }
};

module.exports = { installSystem };