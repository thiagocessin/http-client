const mongoose = require('mongoose');
const Person = require('./person.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/namesdb',{useNewUrlParser:true});

app.get('/',(req,res)=>{
    Person.find({}).lean().exec((err,data)=>{
        if(err) {
                return res.status(500).json({
                error: err,
                message:'Internal error'
            });
        }

        return res.status(200).json(data);
    });
});


app.get('/:text',(req,res)=>{

    let text = req.params.text;
    
    Person.find({ 
        $or:[
            {firstName:{$regex:text, $options:'i'}},
            {lastName:{$regex:text, $options:'i'}},
            {email:{$regex:text, $options:'i'}},
            {country:{$regex:text, $options:'i'}}
                
    ]}).lean().exec((err,data)=>{
        if(err) {
            console.log(query);
                return res.status(500).json({
                error: err,
                message:'Internal server error'
            });
        }
        setTimeout(()=>{return res.status(200).json(data)},700);
        
    });
});

app.use(function(req,res,next){
    res.status(404).send('Route does not exist');
});

app.listen(9000);




