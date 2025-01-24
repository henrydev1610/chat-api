const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

exports.protect_route = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        // Verificar se o token está presente
        if (!token) {
            return res.status(401).json({ message: "Token não autorizado" });
        }
         
        // Verificar se o token é válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Token inválido" });
        }

        // Procurar o usuário com base no userId decodificado
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Se o usuário for encontrado, anexá-lo ao objeto de requisição
        req.user = user;
        next();

    } catch (error) {
        console.error("Erro no protect_route middleware:", error.message); // Corrigido para acessar 'message' corretamente
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};
