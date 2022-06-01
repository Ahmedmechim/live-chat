let express=require('express')
const connectDB = require('./config/connectDB')
const user = require('./routers/user')
const conversation = require('./routers/conversation')
const message = require('./routers/message')
const path=require('path')
let app=express()

connectDB()
let PORT=process.env.PORT||666

app.use(express.json())
app.use('/user', user)
app.use('/conversation', conversation)
app.use('/message', message)


app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", (req, res) => {
    console.log("reached");
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });

// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

app.listen(PORT,(err)=>
err?console.log(err):console.log("server is started"))