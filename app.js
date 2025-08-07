const express = require('express')

const userRoutes = require('./Routes/user.routes')

const productRoutes = require('./Routes/product.routes')

const app = express()


app.use(express.json());

app.use('/api/User', userRoutes)
app.use('/api/products', productRoutes)

// filepath: c:\Users\gianl\Documents\proyectoNode\node.js\app.js
app.use(express.static('Views'));



module.exports = app;

