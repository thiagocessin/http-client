const mongoose = require('mongoose');
const Product = require('./product.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/productsdb',{useNewUrlParser:true});

var myLogger = function(req,res,next){
    next();
}

//para cada requisição, essa função é chamada, middleware, intercepta a requisição http
app.use(myLogger);


app.get('/products',(req,res)=>{

    Product.find({}).lean().exec((err,data)=>{
        if(err) {
                return res.status(500).json({
                error: err,
                message:'Internal error'
            });
        }

        return res.status(200).json(data);
    });
});

app.get('/productserr',(req,res)=>{
    setTimeout(()=>{
        res.status(500).send({
            msg: "Error message from the server"
        });
    },2000)
    
});

app.use(function(req,res,next){
    res.status(404).send('Route does not exist');
});

app.listen(9000);




