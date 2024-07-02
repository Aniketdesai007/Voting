const express = require('express');
const router=express.Router();
const usermodel=require('../models/user');
const {jwtmiddleware,generatetoken}=require("../jwt");

router.post("/login",async(req,res)=>{
    try {
        const {aadharno,password}=req.body;
        const user=await usermodel.findOne({aadharno:aadharno});
        if( !user|| !(await user.Compare(password))){
            return res.status(401).json({message:"Invalid username or password"});
        } 
        const payload={
            id:user.id,
            name:user.name
        }
const token=generatetoken(payload);
console.log("token :",token);
res.json("token :"+token)
        
    } catch (error) {
        res.status(500).json('error');
        console.log('error = ',error);
        
    }
})

router.post('/signup',async function(req, res){
    try {  
     const data=req.body;
   const newdata=new usermodel(data);
   const saveddata=await newdata.save();
   const payload={
    id:saveddata.id,
    name:saveddata.name
   }
   const token=generatetoken(payload);

   res.status(200).json({response:saveddata,token:token});
   console.log("token :",token);
   console.log('data saved....');
        
    } catch (error) {
        res.status(500).json('error');
        console.log('error = ',error);
    }

})
router.put('/profile/password',jwtmiddleware,async (req, res) =>{
    try {
         const userid=req.user.id;//extract id from token
         const {currentpassword,newpassword}=req.body;//extract current passwod and new password from request body

        const user=await usermodel.findById(userid);//finding user

        if(!(await user.Compare(currentpassword))){
            return res.status(401).json({message:"Invalid password"});
        } 
        user.password=newpassword;
        await user.save();
    res.status(200).json('password updated successufully...');
    console.log('password updated');
    } catch (error) {
        res.status(500).json('error');
        console.log('errror = ',error);
    }
   



})



router.get('/profile',jwtmiddleware,async (req, res) =>{
try {
    const userdata=req.user;
    const userid=userdata.id;
    if(!userid)return res.status(404).json('invalid user id');
    const user=await usermodel.findById(userid);
    
    res.status(200).json(user);
    
} catch (error) {
    res.status(500).json('internal server error');
    console.log('error = ',error);
    
}

});




module.exports=router;