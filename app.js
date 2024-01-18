const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const router = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')
const blogRouter = require('./routes/blogRoutes')


const app = express()

app.use(express.json())
app.use(router)
app.use('/admin',adminRouter)
app.use('/blog', blogRouter)

mongoose.connect(process.env.DB_URI)
.then(()=>{
    const server = app.listen(process.env.DB_PORT || 4000, ()=>{
        const port = server.address().port
        console.log(`listening on port ${port}`)
    
    })
    
})

