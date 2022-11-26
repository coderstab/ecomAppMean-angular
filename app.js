const express = require('express');
const app = express(); 
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
const api = '/api/v1';

//middleware 
app.use(express.json());
app.use(morgan('tiny')); 

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);



app.get(`${api}/products`, (req,res) =>{
    const product = {
        id:1,
        name:'hair dresser',
        image:'image_url'
    }
    res.send(product);
} )

app.post(`${api}/products`, (req,res) =>{
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    product.save().then((createdProduct =>{
        res.status(201).json(createdProduct)

    })).catch((err)=>{
        res.status(500).json({
            error:err,
            success: false
        })
    })
    // const newProduct = req.body;
    // console.log(newProduct);  
    // res.send(newProduct);
} )
const conn = 'mongodb+srv://mongomean:MongoMan123@mongomean.xccqhaf.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(conn,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName: 'eshop-database'
}).then(()=>{
    console.log('databse connected');
}).catch((err)=>{
    console.log(err)
})

app.listen(3000, () => {
    console.log(api)
    console.log('server is running http://localhost:3000')
})