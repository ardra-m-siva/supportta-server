const mongoose=require('mongoose')

const connectionString=process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("Connection Success with mongodb atlas");
}).catch(err=>{
    console.log("Connection with database failed");
})