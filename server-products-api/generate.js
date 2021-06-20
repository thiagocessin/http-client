var mongoose = require('mongoose');
var Product = require('./product.js');
var Faker = require('faker');

mongoose.connect('mongodb://127.0.0.1:27017/productsdb',{useNewUrlParser:true});


async function createRandomProducts(){
    const N = 10;

    for(let i =0; i< N; i++){
        let p = new Product({
            name: Faker.commerce.productName(),
            department: Faker.commerce.department(),
            price: Faker.commerce.price()
        });
       try{
            await p.save();
       
        }catch(err){
            throw new Error('Error generating new Person')
       }
    
    }
}

createRandomProducts().then(()=>{
    mongoose.disconnect();
    console.log('OK');
});

