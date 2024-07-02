const jwt=require('jsonwebtoken');


const jwtmiddleware=async(req,res,next)=>{
    //authorization
    const authorization=req.headers.authorization;
    if(!authorization)return res.json({error:"token not found.."});



    //extract jwt token from request header
    const token=req.headers.authorization.split(' ')[1];
    if(!token)return res.status(403).json({error:"unauthorized"});
    try {
        //verify jwt token
       const decoded=await jwt.verify(token,process.env.jwt_secret);
       //attach user information to the request object
       req.user=decoded;
       next();
    } catch (err){
        
        res.status(401).json({error:"invalid jwt token"})
        console.log(err);
    }
}


//token generation
const generatetoken=(userdata)=>{
    //generate new jwt token using userdata
    return jwt.sign(userdata,process.env.jwt_secret,/*token expires after*/{expiresIn:300000} );
}


module.exports={jwtmiddleware,generatetoken}