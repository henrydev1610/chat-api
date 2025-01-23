const express = require('express')
const { updateUser,  signup, logout, login } = require('../controllers/auth.controller');
const { protect_route } = require('../middlewares/auth.middleware');
 
const router = express.Router()


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout );

router.put('/update-profile', protect_route, updateUser)





module.exports = router;