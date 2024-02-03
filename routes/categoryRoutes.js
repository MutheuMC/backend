const categoryControllers = require('../controllers/categoryControllers')
const {Router} = require("express")

const categoryRouter = Router()


categoryRouter.get('/' , categoryControllers.getCategories)
categoryRouter.get('/blogs', categoryControllers.getBlogsByCategories)



module.exports = categoryRouter