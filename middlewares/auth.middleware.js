const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

exports.protect_route = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(404).json({messsage: "Token não autorizado"})
        }
         
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(404).json({messsage: "Token inválido"})
        }
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({messsage: "Usuário não encontrado"})
        }

        req.user = user;
        next();




    } catch (error) {

        console.log("Ero no protect route middleware", error.messsage)
        res.status(500).json({messsage: "Erro interno do servidor"})
    }
};


