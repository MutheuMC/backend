const {Router} = require('express')
const userControllers = require('../controllers/userControllers')

const router = Router()

router.post('/signUp', userControllers.createUser );
router.post('/logIn', userControllers.logUser);
router.put('/update', userControllers.updateUser);
router.get('/delete',userControllers.deleteAccount)
router.get('/user/blogs', userControllers.getUserBlogs)
router.get('/logout', userControllers.logout);

module.exports = router