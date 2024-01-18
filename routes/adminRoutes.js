const {Router} = require('express')
const adminControllers = require('../controllers/adminControllers')

const adminRouter = Router()

adminRouter.get('/users', adminControllers.getUsers);
adminRouter.post('/createUser', adminControllers.createUser);
adminRouter.get('/getUser', adminControllers.getUsersById)
adminRouter.get('/delete', adminControllers.deleteUser)

module.exports = adminRouter