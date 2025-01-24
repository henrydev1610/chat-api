// Arquiva para autenticação de token jwt 


const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (userId, res) => {
    try {
        // Gerar o token JWT
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Configurar o cookie com o token
        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias em milissegundos
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production', // Somente seguro em produção
        });

        return token;
    } catch (error) {
        console.error('Erro ao gerar token:', error);
        throw new Error('Erro ao gerar o token');
    }
};

module.exports = generateToken;
