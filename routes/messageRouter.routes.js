const express = require('express')
const { protect_route } = require('../middlewares/auth.middleware');
const {gettingUsersforSideBar, getMesssages} = require('../controllers/message.controller');
const router = express.Router()


router.get('/users', protect_route, gettingUsersforSideBar);
router.get('/:id', protect_route, getMesssages)
router.post('/:send/:id', protect_route )

module.exports = router;