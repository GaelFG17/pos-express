const User = require("../model/User.model");

class UserService {
    // no necesitamos instanciar la clase Sequelize; usamos sus métodos estáticos
    constructor() { }

    async read() {
        try {
            // retorna la lista completa de usuarios
            return await User.obtenerTodos();
        } catch (error) {
            console.error('Error en UserService.read:', error);
            throw error;
        }
    }

    async create(data) {
        try {
            const { nombre, usuario, password_hash, rol } = data;
            return await User.crear(nombre, usuario, password_hash, rol);
        } catch (error) {
            console.error('Error en UserService.create:', error);
            throw error;
        }
    }

    async findById(id) {
        try {
            return await User.obtenerPorId(id);
        } catch (error) {
            console.error('Error en UserService.findById:', error);
            throw error;
        }
    }

    async findByUsuario(usuario) {
        try {
            return await User.obtenerPorUsuario(usuario);
        } catch (error) {
            console.error('Error en UserService.findByUsuario:', error);
            throw error;
        }
    }

    async update(id, changes) {
        try {
            // desestructuramos los campos esperados o dejamos undefined
            const { nombre, usuario, rol, activo } = changes;
            // Sequelize 'update' devuelve [rowsAffected]
            return await User.actualizar(id, nombre, usuario, rol, activo);
        } catch (error) {
            console.error('Error en UserService.update:', error);
            throw error;
        }
    }

    async updatePassword(id, password_hash) {
        try {
            return await User.actualizarPassword(id, password_hash);
        } catch (error) {
            console.error('Error en UserService.updatePassword:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            return await User.eliminar(id);
        } catch (error) {
            console.error('Error en UserService.delete:', error);
            throw error;
        }
    }

    async verificarActivo(id) {
        try {
            return await User.verificarActivo(id);
        } catch (error) {
            console.error('Error en UserService.verificarActivo:', error);
            throw error;
        }
    }
}

module.exports = { UserService }; //para pasarlo al controller