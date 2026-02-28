const { ProductsService } = require('../services/productsService');

class ProductsController {
    static async getAll(req, res) {
        try {
            const { q } = req.query;
            const products = await ProductsService.getAllProducts(q);
            res.json(products);
        } catch (e) { res.status(500).json({ error: e.message }); }
    }

    static async getOne(req, res) {
        try {
            const product = await ProductsService.getProductById(req.params.id);
            product ? res.json(product) : res.status(404).json({ message: 'No encontrado' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    }

    static async create(req, res) {
        try {
            const product = await ProductsService.createProduct(req.body);
            res.status(201).json(product);
        } catch (e) { res.status(500).json({ error: e.message }); }
    }

    static async update(req, res) {
        try {
            const product = await ProductsService.updateProduct(req.params.id, req.body);
            product ? res.json(product) : res.status(404).json({ message: 'No encontrado' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    }

    static async adjust(req, res) {
        try {
            const result = await ProductsService.adjustStock(req.params.id, req.body);
            result ? res.json(result) : res.status(404).json({ message: 'No encontrado' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    }

    static async delete(req, res) {
        try {
            const success = await ProductsService.deleteProduct(req.params.id);
            success ? res.json({ message: 'Eliminado' }) : res.status(404).json({ message: 'No encontrado' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    }
}

module.exports = { ProductsController };