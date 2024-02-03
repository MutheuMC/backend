const {Router} = require('express')
const userControllers = require('../controllers/userControllers')

const router = Router()

router.post('/signUp', userControllers.createUser );
router.post('/logIn', userControllers.logUser)
router.put('/update', userControllers.updateUser)
router.get('/user/blogs/:id', userControllers.getUserBlogs)
// router.get('/logout', )

module.exports = router