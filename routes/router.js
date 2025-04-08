const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const jwtMiddleware=require('../middlewares/jwtMiddleware')
const multerMiddleware=require('../middlewares/multerMiddleware')


router.post("/register",userController.registerUserController)  

router.post("/login",userController.loginUserController)      

router.put("/update",jwtMiddleware,multerMiddleware.single('profilePhoto'),userController.editUserController)      

router.delete('/remove',jwtMiddleware,userController.deleteUserController)

module.exports=router