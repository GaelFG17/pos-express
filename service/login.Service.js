const User = require('../model/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const authUser = async (usuario, password) => {
    try {

        const user = await User.obtenerPorUsuario(usuario);
        
        if (!user) {
            return { success: false, message: 'Usuario no encontrado' };
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch) {
            const payload = {
                id: user.id, 
                usuario: user.usuario,
                rol: user.rol
            };

            const secretKey = process.env.JWT_SECRET || 'super_secreto';
            const tokenGenerado = jwt.sign(payload, secretKey, { expiresIn: '2h' });

            return {
                success: true,
                token: tokenGenerado,
                user: { 
                    usuario: user.usuario, 
                    rol: user.rol, 
                    nombre: user.nombre 
                }
            };
        } else {
            return { success: false, message: 'Contraseña incorrecta' };
        }
    } catch (error) {
        console.error("Error en la base de datos: ", error);
        throw new Error('Error al autenticar');
    }
};

module.exports = { authUser };