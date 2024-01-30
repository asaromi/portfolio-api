const prisma = require('../../databases/prisma')

class ProductRepository {
	async #findUniqueProduct(where) {
		return await prisma.product.findUnique({ where })
	}

	async #updateProduct(where, data) {
		return await prisma.product.update({ where, data })
	}

	async #deleteProduct(where) {
		return prisma.product.delete({ where })
	}

	async countProducts(where) {
		return await prisma.product.count({ where })
	}

	async findProducts(where = {}) {
		return await prisma.product.findMany({ where })
	}

	async storeProduct(data) {
		return await prisma.product.create({
			data: { id: data.id, ...data }
		})
	}

	async findProductById(id) {
		return await this.#findUniqueProduct({ id })
	}

	async updateProductById (id, data) {
		return await this.#updateProduct({ id }, data)
	}

	async deleteProductById(id) {
		return await this.#deleteProduct({ id })
	}
}

module.exports = ProductRepository
