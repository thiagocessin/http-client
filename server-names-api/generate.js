const mongoose = require('mongoose');
const faker = require('faker');
const Person = require('./person.js');

mongoose.connect('mongodb://127.0.0.1:27017/namesdb',{useNewUrlParser:true});

async function createRandomPeople(){
    const N = 1000;

    for(let i =0; i< N; i++){
        let p = new Person({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            city:faker.address.city(),
            country: faker.address.country()
        });
       try{
            await p.save();
       
        }catch(err){
            throw new Error('Error generating new Person')
       }
    

    }
}

createRandomPeople().then(()=>{
    mongoose.disconnect();
    console.log('OK');
});

