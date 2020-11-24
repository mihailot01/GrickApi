const jwt = require("jsonwebtoken");

const jwtC={

  generisiToken: (id,verifikovan) => {
    return jwt.sign({id:id,verifikovan:verifikovan}, process.env.TOKEN_SECRET);
  }


}

module.exports=jwtC;