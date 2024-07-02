const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    // gender:{
    //     type:String,
    //     required:true
    // },
    // address:{
    //     type:String,
    // },
    // phone:{
    //     type:Number,
    // },
    // email:{
    //     type:String,
    // },
    aadharno:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isvoted:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['admin','voter'],
        default:"voter"
    }
})


userschema.methods.Compare=async function(candidatepassword){
    try {
        // const pass=this
        const isMatch=await bcrypt.compare(candidatepassword,this.password)
        return isMatch;
    } catch (error) {
        throw(error);
    }

}




userschema.pre('save',async function(next){
const user=this;
if(!user.isModified('password'))return next();
    try {
        //hash password genertion
        const salt=await bcrypt.genSalt(10);
        
        //hash passwords

        const hashpassword=await bcrypt.hash(user.password,salt);
        user.password=hashpassword;
        next();
    } catch (error) {
        return next(error);
        
    }
})




const usermodel=mongoose.model('PersonModel',userschema);
module.exports = usermodel;