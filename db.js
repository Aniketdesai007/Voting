const mongoose= require('mongoose');
require('dotenv').config();
const url=process.env.urldata;

mongoose.connect(url);
const db=mongoose.connection;


db.on('error', (err) =>{
    console.log(err);
});
db.on('connected', ()=>{
        console.log('successfully connected to mongodb database');
})

db.on('disconnected', ()=>{
    console.log('disconnected from mongodb database');
})

module.exports=db;