const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    description :{
        type:String,
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

const products=mongoose.model("products",productSchema)

module.exports=products