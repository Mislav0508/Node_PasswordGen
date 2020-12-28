const jwt = require("jsonwebtoken")
const User = require("../models/user")

const requireAuth = (req,res,next) => {
  const token = req.cookies.jwt
  if(token){
    jwt.verify(token, "mi secreto", (err, verifiedToken) => {
      if(err){
        console.log(err.message)
        res.redirect("/login")
      }else{
        console.log(verifiedToken)
        next() 
      }
    })
  }else{
    res.redirect("/login")
  } 
}
const checkUser = (req,res,next) => {
  const token = req.cookies.jwt
  if(token){
    jwt.verify(token, "mi secreto", async (err, verifiedToken) => {
      if(err){
        console.log(err)
        res.locals.user = null
        next()
      }else{
        console.log(verifiedToken)
        let user = await User.findById(verifiedToken.id)
        res.locals.user = user
        next()
      }
    })
  }
  else{
    res.locals.user = null
    next()
  }
}

module.exports = {requireAuth,checkUser}