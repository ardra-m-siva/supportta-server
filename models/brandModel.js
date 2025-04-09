const mongoose =require('mongoose')

const brandSchema=mongoose.Schema({
    brandName:{
        type:String,
        required:true,
        unique:true
    },
    brandLogo :{
        type:String,
        required:true
    },
    categories :{
        type:[String],
        required:true
    }
})

const brands=mongoose.model("brands",brandSchema)

module.exports=brands