const {Router} = require('express')
const {
  getProducts,
  storeProduct,
  updateAllProductFields,
  updateProduct,
  getProductById,
  deleteProduct
} = require('../../controllers/v1/product')
const router = new Router()

router.get('/', getProducts)
router.post('/', storeProduct)
router.get('/:id', getProductById)
router.put('/:id', updateAllProductFields)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
