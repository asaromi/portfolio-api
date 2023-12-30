const prisma = require('../../databases/prisma')

class ProductRepository {
  #findUniqueProduct = async (where) => await prisma.product.findUnique({where})

  #updateProduct = async (where, data) => await prisma.product.update({where, data})

  #deleteProduct = async (where) => await prisma.product.delete({where})

  countProducts = async (where) => await prisma.product.count({where})

  findProducts = async (where = {}) => await prisma.product.findMany({where})

  storeProduct = async (data) => await prisma.product.create({
    data: {
      id: data.id,
      ...data,
    }
  })

  findProductById = async (id) => await this.#findUniqueProduct({id})

  updateProductById = async (id, data) => await this.#updateProduct({id}, data)

  deleteProductById = async (id) => await this.#deleteProduct({id})
}

module.exports = ProductRepository
