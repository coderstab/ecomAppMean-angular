const express = require('express');
const app = express(); 
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');

const api = process.env.API_URL;
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users')
const categoriesRouter = require('./routers/categories')

//middleware 
app.use(express.json());
app.use(morgan('tiny'));


// Routers
app.use(`${api}/products`,productsRouter);
app.use(`${api}/users`,usersRouter);
app.use(`${api}/categories`,categoriesRouter);

const conn = process.env.MONGO_CONN;
mongoose.connect(conn,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName: 'nodeman'
}).then(()=>{
    console.log('databse connected');
}).catch((err)=>{
    console.log(err)
})

app.listen(3000, () => {
    console.log(api)
    console.log('server is running http://localhost:3000')
})