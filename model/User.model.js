const { DataTypes, Model } = require ('sequelize');
const { sequelize } = require('../data/config');

class User extends Model {
    static async crear(nombre, usuario, password_hash, rol = 'admin') {
        return this.create({ nombre, usuario, password_hash, rol });
    }

    static async obtenerPorId(id) {
        return this.findByPk(id, {
            attributes: ['id', 'nombre', 'usuario', 'rol', 'activo', 'creado_en']
        });
    }

    static async obtenerPorUsuario(usuario) {
        return this.findOne({
            where: { usuario },
            attributes: ['id', 'nombre', 'usuario', 'password_hash', 'rol', 'activo', 'creado_en']
        });
    }

    static async obtenerTodos() {
        return this.findAll({
            attributes: ['id', 'nombre', 'usuario', 'rol', 'activo', 'creado_en']
        });
    }

    static async actualizar(id, nombre, usuario, rol, activo) {
        return this.update({ nombre, usuario, rol, activo }, { where: { id } });
    }

    static async actualizarPassword(id, password_hash) {
        return this.update({ password_hash }, { where: { id } });
    }

    static async eliminar(id) {
        return this.destroy({ where: { id } });
    }

    static async verificarActivo(id) {
        const user = await this.findByPk(id, { attributes: ['activo'] });
        return user ? user.activo : false;
    }
}

User.init(
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol: {
            type: DataTypes.STRING,
            defaultValue: 'admin'
        },
        activo: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false
    }
);

module.exports = User;
