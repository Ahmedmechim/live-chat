let mongoose=require('mongoose')
let config=require('config')
let db=config.get("db")

let connectDB=async(req,res)=>{
    try {
        await mongoose.connect(db)
        console.log("dataBase is connected")
    } catch (error) {
        console.log(error.message)
    }
}
module.exports=connectDB