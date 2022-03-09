let express=require('express')
const connectDB = require('./config/connectDB')
const user = require('./routers/user')
const conversation = require('./routers/conversation')
let app=express()

connectDB()
let PORT=process.env.PORT||666

app.use(express.json())
app.use('/user', user)
app.use('/conversation', conversation)

app.listen(PORT,(err)=>
err?console.log(err):console.log("server is started"))