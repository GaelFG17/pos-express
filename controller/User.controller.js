const { UserService } = require("../service/User.service");

class UserController {
    constructor() {
        this.service = new UserService();
    }

    async create(req, res) {
        try {
            const data = req.body;
            const result = await this.service.create(data);
            res.status(201).json(result);
        } catch (error) {
            console.error('UserController.create error:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }

    async read(req, res) {
        try {
            const users = await this.service.read();
            res.json(users);
        } catch (error) {
            console.error('UserController.read error:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const user = await this.service.findById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('UserController.findById error:', error);
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    }

    async findByUsuario(req, res) {
        try {
            const { usuario } = req.params;
            const user = await this.service.findByUsuario(usuario);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('UserController.findByUsuario error:', error);
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const changes = req.body;
            const [rows] = await this.service.update(id, changes);
            if (rows > 0) {
                res.json({ message: 'User updated' });
            } else {
                res.status(404).json({ error: 'User not found or no changes applied' });
            }
        } catch (error) {
            console.error('UserController.update error:', error);
            res.status(500).json({ error: 'Failed to update user' });
        }
    }

    async updatePassword(req, res) {
        try {
            const { id } = req.params;
            const { password_hash } = req.body;
            const [rows] = await this.service.updatePassword(id, password_hash);
            if (rows > 0) {
                res.json({ message: 'Password updated' });
            } else {
                res.status(404).json({ error: 'User not found or password not changed' });
            }
        } catch (error) {
            console.error('UserController.updatePassword error:', error);
            res.status(500).json({ error: 'Failed to update password' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const rows = await this.service.delete(id);
            if (rows > 0) {
                res.json({ message: 'User deleted' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('UserController.delete error:', error);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }

    async verificarActivo(req, res) {
        try {
            const { id } = req.params;
            const activo = await this.service.verificarActivo(id);
            res.json({ activo });
        } catch (error) {
            console.error('UserController.verificarActivo error:', error);
            res.status(500).json({ error: 'Failed to verify user status' });
        }
    }
}

module.exports = { UserController };