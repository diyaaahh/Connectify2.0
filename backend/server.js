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

 const PORT =process.env.PORT || 5000
app.listen(PORT ,
    console.log(`Server started on port ${PORT}`)
    )