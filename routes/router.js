const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const jwtMiddleware=require('../middlewares/jwtMiddleware')
const multerMiddleware=require('../middlewares/multerMiddleware')
const brandsController=require('../controllers/brandsController')
const productController=require('../controllers/productController')

// user Controller
// register user
router.post("/register",userController.registerUserController)

// login user
router.post("/login",userController.loginUserController)

// edit user (handle multipart data)- authorized user only
router.put("/update",jwtMiddleware,multerMiddleware.single('profilePhoto'),userController.editUserController)      

// delete user profile- authorized user only
router.delete('/remove',jwtMiddleware,userController.deleteUserController)

// access token using refresh token - authorized user only
router.get('/refresh-token',userController.refreshTokenController)

// block user - authorized user only 
router.put('/block-user',jwtMiddleware,userController.blockUserController)

// unblock user - authorized user only 
router.put('/unblock-user',jwtMiddleware,userController.unblockUserController)


// Brand Controller
// add a new brand - authorized user only
router.post('/add-brand',jwtMiddleware,brandsController.addBrandController)

// get all brands  - authorized user only
router.get('/all-brand',jwtMiddleware,brandsController.getAllBrandController)

// product Controller
// add a new product -authorized user only
router.post('/add-product',jwtMiddleware,productController.addProductController)

// update product - authorized user only - product added user only
router.put('/update-product/:id',jwtMiddleware,productController.updateProductController)

// delete product - authorized user only - product added user only
router.delete('/delete-product/:id',jwtMiddleware,productController.deleteProductController)

// all products - authorized user only - of unblocked ones
router.get('/all-products',jwtMiddleware,productController.getAllProductsController)

// all products of the loggedin User- authorized user only 
router.get('/my-products',jwtMiddleware,productController.getMyProductsController)

module.exports=router