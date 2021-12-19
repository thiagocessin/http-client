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


app.get('/productsdelay',(req,res)=>{
    setTimeout(()=>{
        Product.find({}).lean().exec((err,data)=>{
            if(err) {
                return res.status(500).json({
                    error: err,
                    message:'Internal error'
                });
            }
            return res.status(200).json(data);
        });
    },2000)
});

app.get('/products_ids',(req,res)=>{

    Product.find().lean().exec((err,data)=>{
        if(err) {
                return res.status(500).json({
                error: err,
                message:'Internal error'
            });
        }
        return res.status(200).json(data.map(p=>p._id));
    });
});


app.get('/products/name/:id',(req,res)=>{
    console.log('teste')
    //.id = nome do param na url
    const id = req.params.id;

    Product.findById(id, (err,prod)=>{
        if(err) 
            res.status(500).send(err);
        else if(!prod)
            res.status(404).send({});
        else
            res.status(200).json(prod.name);
    });
});

app.post('/products',function(req,res){
    console.log('products post')
    p = new Product({
        name:req.body.name,
        price: req.body.price,
        department:req.body.department
    });
    p.save((err,prod)=>{
        if(err) res.status(500).send(err);

        else
            res.status(201).send(p);
    })
});


app.delete('/products/:id',function(req,res){
    Product.deleteOne({_id: req.params.id},
        (err)=>{
            if(err) res.status(500).send(err);

            else
                res.status(200).send({});

        });


});


app.use(function(req,res,next){
    res.status(404).send('Route does not exist');
});


app.listen(9000);




