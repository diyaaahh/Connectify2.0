const express = require('express')
const dotenv = require('dotenv')
const {chats} = require('./data/Data')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes=require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middlewares/errormiddleware')

const app = express()
dotenv.config()
connectDB()

app.use(express.json()); //to accept JSON data




 app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));



app.use('/api/user' , userRoutes)
app.use('/api/chat' , chatRoutes )
app.use('/api/message', messageRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:5173', // Update this to match your client's origin
  },
});
io.on('connection', (socket) => {
  console.log('connected to socket');
  socket.on("setup", (userData) => {
    if (userData){
      socket.join(userData._id);
      console.log(userData._id);
      socket.emit("connected");
    }else{
      console.log("invalid user data")
    }
  });
  socket.on ("join chat", (room)=>
  {
    socket.join(room)
    console.log("user joined room " + room )
  })
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});




  