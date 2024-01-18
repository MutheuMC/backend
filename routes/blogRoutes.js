const {Router} = require('express');
const blogControllers = require("../controllers/blogControllers")

const blogRoutes =  Router()


blogRoutes.get('/blogs', blogControllers.getBlogs)
blogRoutes.get('/blog', blogControllers.getBlog)
blogRoutes.post('/add',blogControllers.createBlog)
blogRoutes.put('/update/:id', blogControllers.updateBlog)
