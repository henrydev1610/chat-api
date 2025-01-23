const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    fullname: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
        
    },
    profilepic:{
        type: String,
        default: ' '
    }
}, {timestamps: true})


// Middleware para hashar a senha antes de salvar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Só aplica hash se a senha for nova ou alterada
    const salt = await bcrypt.genSalt(8); // Gerar o salt
    this.password = await bcrypt.hash(this.password, salt); // Hashar a senha
    next();
});



module.exports = mongoose.model('Users', userSchema);
