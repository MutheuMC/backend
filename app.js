const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser')
const cors = require('cors')

const router = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')
const blogRouter = require('./routes/blogRoutes')
const categoriesRouter = require('./routes/categoryRoutes')

const app = express()

// Configure CORS options
// const corsOptions = {
//     origin: 'http://example.com', // Specify allowed origin(s) here
//     methods: ['GET', 'POST'], // Specify allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
// };
// app.use(cors(corsOptions))


app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.use(router)
app.use('/admin',adminRouter)
app.use('/blog', blogRouter)
app.use('/categories', categoriesRouter)


mongoose.connect(process.env.DB_URI)
.then(()=>{
    const server = app.listen(process.env.DB_PORT || 4000, ()=>{
        const port = server.address().port
        console.log(`listening on port ${port}`)
    
    })
    
})

