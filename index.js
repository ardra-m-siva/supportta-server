const express =require('express')
const cors=require('cors')
require('dotenv').config()
require('./databases/dbConnection')
const router=require('./routes/router')

const supporttaServer=express()
supporttaServer.use(cors())
supporttaServer.use(express.json())
supporttaServer.use(router)
supporttaServer.use('/uploads',express.static('./uploads'))

const PORT=3000||process.env.PORT

supporttaServer.listen(PORT,()=>{
    console.log("Server started successfully");
})

supporttaServer.get('/',(req,res)=>{
    res.send(`Server started at port ${PORT}`)
})