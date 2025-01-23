const User = require('../models/userModel');
const generateToken = require('../lib/utils');
const bcrypt = require('bcrypt');
const cloudnary = require('../middlewares/cloudnary')
exports.signup = async (req, res) => {
    try {
        const { fullname, email, password, profilepic } = req.body;

        // Verificação de campos obrigatórios
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        // Verificação de tamanho da senha
        if (password.length < 8) {
            return res.status(400).json({ message: "A senha precisa ter no mínimo 8 caracteres." });
        }

        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já existe." });
        }

        // Criar novo usuário
        const newUser = await User.create({
            fullname,
            email,
            password,
            profilepic,
        });

        // Gerar o token JWT
        const token = generateToken(newUser._id, res);

        // Responder com o usuário e o token
        return res.status(201).json({
            message: "Usuário criado com sucesso!",
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilepic: newUser.profilepic,
            },
            token, // Retorna o token no corpo da resposta
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar se os campos obrigatórios foram fornecidos
        if (!email || !password) {
            return res.status(400).json({ message: "Os campos 'email' e 'senha' são obrigatórios." });
        }

        // Procurar o usuário pelo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado." });
        }

        // Comparar a senha fornecida com a armazenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Senha incorreta." });
        }

        // Gerar o token JWT
        const token = generateToken(user._id, res);

        // Responder com os dados do usuário e o token
        return res.status(200).json({
            message: "Login realizado com sucesso!",
            user: {
                _id: user._id,
                fullname: user.fullname, // Pode incluir o fullname caso seja útil
                email: user.email,
                profilepic: user.profilepic, // Retorna a imagem de perfil, se existir
            },
            token,
        });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};


exports.logout = (req, res) => {
    try {
        // Limpar o cookie do token
        res.cookie('jwt', "", { maxAge: 0 });
        res.status(200).json({ message: "Deslogado com sucesso." });
    } catch (error) {
        console.error("Erro no logout,", error.message);
        res.status(500).json({ message: "Erro ao deslogar." });
    }
};

exports.updateUser = async (req, res)=>{
    try {
    // Recuperar o ID do usuário 
        const {profilepic} = req.body;
        const userId = req.user._id;

        if(!profilepic){
            return res.status(400).json({message: "Imagem de perfil é obrigatória."});
        }
        const uploadResponse = await cloudnary.uploadImage(profilepic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilepic: uploadResponse.secure_url }, { new: true });
        res.status(200).json({message: "Imagem de perfil atualizada com sucesso!", user: updatedUser});



    } catch (error) {
        console.error("Erro na atualização do usuário:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
}