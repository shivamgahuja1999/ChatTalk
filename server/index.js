const express = require('express')
const cors=require("cors");
const dotenv=require("dotenv");
const app = express()
dotenv.config();

const port = process.env.PORT;
const connectDB=require("../server/database");
connectDB();
const userRoutes=require('./routes/userRoutes');
const messagesRoute=require('../server/routes/messagesRoute');

const socket = require("socket.io");

app.use(cors());
app.use(express.json());
app.use('/api/auth',userRoutes);
app.use('/api/messages',messagesRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Chat app listening on port ${process.env.PORT}`)
// })

const server =require("http").createServer(app);
// Attach socket.io to the server
const io=socket(server,{
  cors:{
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  },
});
// Global map to store online users
global.onlineUsers=new Map();

// Socket connection
io.on("connection",(socket)=>{
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});
// Start the server
server.listen(port,()=>{
  console.log(`Chat app listening on port ${process.env.PORT}`)
});
