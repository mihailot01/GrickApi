const jwt = require("jsonwebtoken");

const generisiToken = async (id,verifikovan) => {
  return await jwt.sign({id:id,verifikovan:verifikovan}, process.env.TOKEN_SECRET);
};

const proveriToken = async function (token){
  return await jwt.verify(token,process.env.TOKEN_SECRET);
};

const auth = async function(req,res,next){
  try{
    console.log(req.headers.authorization);
    const t=(req.headers.authorization.split(" "))[1];
    console.log(t);
    const dektriptovan=await proveriToken(t);
    req.dektriptovan=dektriptovan;
    console.log(dektriptovan);
    next();
  }catch(err){
    console.error(err);
    res.status(403).json(err);
  }
}


module.exports={
  generisiToken,
  proveriToken,
  auth};