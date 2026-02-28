const { Products, InventoryMovements } = require('../model/products');
const { Op } = require('sequelize');

class ProductsService {
    static async getAllProducts(query = '') {
        try {
            const filter = { status: true };
            if (query) {
                filter[Op.or] = [
                    { nombre: { [Op.like]: `%${query}%` } },
                    { sku: { [Op.like]: `%${query}%` } }
                ];  
            }
            return await Products.findAll({ 
                where: filter, 
                order: [['id', 'DESC']], 
                limit: 100 
            });
        } catch (error) { throw error; }
    }

    static async getProductById(id) {
        return await Products.findOne({ where: { id, status: true } });
    }

    static async createProduct(data) {
        const product = await Products.create(data);
        await InventoryMovements.create({
            product_id: product.id,
            cantidad: data.stock || 0,
            tipo: 'entrada',
            nota: 'Alta inicial'
        });
        return product;
    }

    static async updateProduct(id, data) {
        const [affected] = await Products.update(data, { where: { id } });
        return affected > 0 ? await Products.findByPk(id) : null;
    }

    static async adjustStock(id, { cantidad, tipo, nota }) {
        const product = await Products.findByPk(id);
        if (!product) return null;

        const delta = tipo === 'entrada' ? parseFloat(cantidad) : -parseFloat(cantidad);
        product.stock += delta;
        await product.save();

        await InventoryMovements.create({
            product_id: id,
            cantidad: parseFloat(cantidad),
            tipo,
            nota: nota || 'Ajuste manual'
        });
        return product;
    }

    static async deleteProduct(id) {
        const [affected] = await Products.update({ status: false }, { where: { id } });
        return affected > 0;
    }
}

module.exports = { ProductsService };