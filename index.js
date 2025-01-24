const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');
const authRoutes =  require('./routes/auth.routes')
const messageRouter = require('./routes/messageRouter.routes')
const dotenv = require('dotenv');
const connectDB = require('./lib/db');
const app = express()
const cookieParser = require ('cookie-parser');

// app.js ou server.js
const EventEmitter = require('events');
const Bus = new EventEmitter();

// Configuração do limite
// resolvendo o erro de limite de listeners a ser chamado
Bus.setMaxListeners(20);

// Exporta o Bus para outros arquivos, se necessário
module.exports = Bus;




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
app.use('/api/message', messageRouter)

const port = process.env.PORT;



app.listen(port, ()=> console.log(`http://localhost:${port}`))