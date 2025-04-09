const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const jwtMiddleware=require('../middlewares/jwtMiddleware')
const multerMiddleware=require('../middlewares/multerMiddleware')
const brandsController=require('../controllers/brandsController')


router.post("/register",userController.registerUserController)  

router.post("/login",userController.loginUserController)      

router.put("/update",jwtMiddleware,multerMiddleware.single('profilePhoto'),userController.editUserController)      

router.delete('/remove',jwtMiddleware,userController.deleteUserController)

router.post('/refresh-token',userController.refreshTokenController)

router.post('/add-brand',jwtMiddleware,brandsController.addBrandController)

router.get('/all-brand',jwtMiddleware,brandsController.getAllBrandController)

module.exports=router