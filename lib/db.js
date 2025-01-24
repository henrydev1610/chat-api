const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () =>{
    try {
        
        
        const conn = await mongoose.connect(process.env.MONGO_URI) 
        console.log(`conectado ao mongo db: ${conn.connection.host}`);


    } catch (error) {
        console.error(`Error de conexão ao MongoDB: ${error.message}`);
        process.exit(1);  // termina o processo com status 1
    }
}

module.exports = connectDB;
