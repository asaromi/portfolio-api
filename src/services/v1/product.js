const ProductRepository = require('../../repositories/v1/product')

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository()
  }

  getProductById = async (id) =>  {
    const currentProduct = await this.productRepository.findProductById(id)

    if (!currentProduct) {
      const error = new Error()
      error.statusCode = 404
      error.message = 'product does not found'
      throw error
    }

    return currentProduct
  }

  getProducts = async (where) => {
    return await this.productRepository.findProducts(where || {})
  }

  createProduct = async (data) => {
    if (!data) {
      const error = new Error()
      error.statusCode = 400
      error.message = 'product must be sent'
      throw error
    }

    return await this.productRepository.storeProduct(data)
  }

  updateProductById = async (id, product) => {
    if (!id || product?.constructor !== Object) {
      const error = new Error()
      error.statusCode = 400
      error.message = 'id must be sent, and product must be an object'
      throw error
    }

    const currentProduct = await this.productRepository.updateProductById(id, product)

    if (!currentProduct) {
      const error = new Error()
      error.statusCode = 400
      error.message = 'cannot update product, product does not found'
      throw error
    }

    return currentProduct
  }

  deleteProductById = async (id)=> {
    if (!id) {
      const error = new Error()
      error.statusCode = 400
      error.message = 'id must be sent'
      throw error
    }

    return await this.productRepository.deleteProductById(id)
  }

  isProductExistsById = async (id) => {
    if (!id) {
      const error = new Error()
      error.statusCode = 400
      error.message = 'id must be sent'
      throw error
    }

    return await this.productRepository.countProducts({id})
  }
}

module.exports = ProductService
