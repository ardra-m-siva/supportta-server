const mongoose=require('mongoose')

const productModel=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    price :{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})