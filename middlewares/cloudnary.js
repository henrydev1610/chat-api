const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Configurando as variáveis de ambiente
dotenv.config();

// Configurando o Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Função para fazer upload de imagem
const uploadImage = async (filePath, folder = "default") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder, // Especifica a pasta no Cloudinary
    });
    return result;
  } catch (error) {
    console.error("Erro ao fazer upload de imagem:", error);
    throw error;
  }
};

// Função para deletar uma imagem usando o `public_id`
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
    throw error;
  }
};

// Exportando os métodos e o próprio objeto cloudinary
module.exports = {
  cloudinary,
  uploadImage,
  deleteImage,
};
