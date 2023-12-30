const ProductService = require('../../services/v1/product')
const {successResponse, errorResponse} = require('../../libs/response')
const productService = new ProductService()

exports.getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts()

    return successResponse(res, {data: products})
  } catch (error) {
    return errorResponse(res, {error})
  }
}

exports.getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id)
    const product = await productService.getProductById(productId)

    return successResponse(res, {data: product})
  } catch (error) {
    return errorResponse(res, {error})
  }
}

exports.storeProduct = async (req, res) => {
  try {
    const {name, description, price, image} = req.body

    const product = await productService.createProduct({name, description, price, image})

    return successResponse(res, {data: product, statusCode: 201})
  } catch (error) {
    return errorResponse(res, {error})
  }
}

exports.updateAllProductFields = async (req, res) => {
  try {
    const {name, description, price, image} = req.body
    const productId = parseInt(req.params.id)

    if (!name || !description || !price || !image) {
      const error = new Error()
      error.statusCode = 400
      error.message = 'product attributes are missing'

      throw error
    }

    await productService.updateProductById(productId, {
      name,
      description,
      price,
      image,
    })

    return successResponse(res, {data: "Successfully update the product"})
  } catch (error) {
    return errorResponse(res, {error})
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const {name, description, price, image} = req.body
    const productId = parseInt(req.params.id)

    await productService.updateProductById(productId, {
      name,
      description,
      price,
      image,
    })

    return successResponse(res, {data: "Successfully update the product"})
  } catch (error) {
    return errorResponse(res, {error})
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id

    const isExists = await productService.isProductExistsById(productId)

    if (!isExists) {
      const error = new Error()
      error.statusCode = 400
      error.message = 'product not found'

      throw error
    }

    await productService.deleteProductById(productId)

    return successResponse(res, {data: "Successfully delete the product"})
  } catch (error) {
    return errorResponse(res, {error})
  }
}
