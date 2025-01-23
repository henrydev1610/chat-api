const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const authRoutes =  require('./routes/auth.routes')
const dotenv = require('dotenv');
const connectDB = require('./lib/db');
const app = express()
const cookieParser = require ('cookie-parser')

//dotenv
dotenv.config()

//banco de dados
 connectDB()



// midlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())
//app.use(bodyParser.json())
app.use('/api/auth', authRoutes)

const port = process.env.PORT;



app.listen(port, ()=> console.log(`http://localhost:${port}`))