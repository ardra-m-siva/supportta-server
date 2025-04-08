const express =require('express')
const cors=require('cors')
require('dotenv').config()
require('./databases/dbConnection')

const supporttaServer=express()
supporttaServer.use(cors())
supporttaServer.use(express.json())

const PORT=3000||process.env.PORT
supporttaServer.listen(PORT,(req,res)=>{
    console.log("Server started successfully");
})

supporttaServer.get('/',(req,res)=>{
    res.send(`Server started at port ${PORT}`)
})