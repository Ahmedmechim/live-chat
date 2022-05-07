let express=require('express')
const connectDB = require('./config/connectDB')
const user = require('./routers/user')
const conversation = require('./routers/conversation')
const message = require('./routers/message')
let app=express()
const path=require('path')

connectDB()
let PORT=process.env.PORT||666

app.use(express.json())
app.use('/user', user)
app.use('/conversation', conversation)
app.use('/message', message)
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });

app.listen(PORT,(err)=>
err?console.log(err):console.log("server is started"))