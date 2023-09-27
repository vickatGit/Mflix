const mongoose=require('mongoose')
const dotenv = require('dotenv').config();
const dbConnect=async () => {
    try{
        const connection=await mongoose.connect(process.env.DB_CONNECTION_URL)
        console.log('connection made to db successfully 🚀🚀')
        console.log(`db host ${connection.connection.host}`)
        console.log(`db name ${connection.connection.name}`)
    }catch(e){
        console.log(e)
        process.exit()
    }
}
module.exports=dbConnect