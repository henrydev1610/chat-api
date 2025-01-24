const express = require('express')
const { updateUser,  signup, logout, login, checkAuth } = require('../controllers/auth.controller');
const { protect_route } = require('../middlewares/auth.middleware');
 
const router = express.Router()


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout );

router.put('/update-profile', protect_route, updateUser)

router.get('/check', protect_route, checkAuth)



module.exports = router;