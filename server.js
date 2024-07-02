const exp=require('express');
const app = exp();
const db=require('./db');
const bodyparser=require('body-parser');
const userroutes=require('./routes/userroutes');
const userschema=require('./models/user');


require('dotenv').config();

app.use(bodyparser.json());
app.get('/', (req, res) =>{
    res.send('heloo');
})

app.use(bodyparser.json());

app.use('/user',userroutes);


const port=process.env.port||800;
app.listen(port,()=>{
    console.log('Server is running on port 800');
})