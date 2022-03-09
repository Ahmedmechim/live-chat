let express=require('express')
const connectDB = require('./config/connectDB')
const user = require('./routers/user')
let app=express()

connectDB()
let PORT=process.env.PORT||666

app.use(express.json())
app.use('/user', user)

app.listen(PORT,(err)=>
err?console.log(err):console.log("server is started"))