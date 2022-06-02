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


  const server= app.listen(PORT,(err)=>
  err?console.log(err):console.log("server is started")) 
 

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  console.log(users)
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  // send and get conversation
  socket.on("sendConversation", ({ senderId, receiverId, conversationId}) => {
    const user = getUser(receiverId);
    console.log("conv id",conversationId)
    if (user) {
      io.to(user.socketId).emit("getConversation", {
        senderId,
        receiverId,
        // conversationId,
      });
    }
  });
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId,conversationId, text }) => {
      const user = getUser(receiverId);
      console.log(user)
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          receiverId,
          conversationId,
          text,
        });
      }
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  


