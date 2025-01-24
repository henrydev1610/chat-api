const User = require('../models/userModel')
const Message = require('../models/messages')
const cloudinary = require('cloudinary')
exports.gettingUsersforSideBar = async (req, res) =>{
    try {
        const loggedUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedUserId} }).select("-password")
        res.status(200).json(filteredUsers)

        
    } catch (error) {
        console.error('erro ao buscar usuário no banco de dados:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.getMesssages = async(req,res)=>{
    try {
        const {id:userToChild} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChild},
                {senderId:userToChild, receiverId:myId}
            ]
        }) 
        res.status(200).json(messages);

    } catch (error) {
        console.error('Erro ao buscar mensagens no banco de dados:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

exports.sendMessage = async(req,res)=>{
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params
        const senderId = req.user._id;
        
        let imageUrl;
        if(image){
            //upload base64 para o cloudinary
            imageUrl = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
           image: imageUrl,
        });

        await newMessage.save();
        // aqui vou adicionar a funcionalidade de socket.io

        res.status(201).json(newMessage);
        
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }




}