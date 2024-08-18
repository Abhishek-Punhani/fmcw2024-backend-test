const jwt = require("jsonwebtoken")

module.exports=(req,res,next)=>{
    try{
        const token=req.get('Authorization').slice(7);
        // const token=req.cookies['authToken'];
        const email = jwt.verify(token,process.env.JWT_SECRET)['email'][0]['value'];
        res.email=email
        res.auth=true
        console.log("authorised");
    }catch(err){
        // console.log(err);
        res.auth=false
    }
    next()
}