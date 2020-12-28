// home_get, avatar_get, signup_get, signup_post, login_get, login_post, logout_get, memes_get
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const handleErrors = (error) => {
  let errors = { email: "", password: "", username: ""}
  if(error.message === "incorrect username"){
    errors.username = "that user is not registered"
  }
  if(error.message === "incorrect password"){
    errors.password = "that password is incorrect"
  }
  if(error.code === 11000){
    errors.email = "That user is already registered"
  }
  if(error.message.includes("user validation failed")){
    Object.values(error.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message
    })
  }
  console.log(errors)
  return errors
}
const createToken = (id) => {
  return jwt.sign({id}, "mi secreto", {expiresIn: 24*60*60*1000})
} 
module.exports.avatar_get = (req,res) => {
  res.render("avatar")
}
module.exports.signup_get = (req,res) => {
  res.render("signup")
}
module.exports.signup_post = async (req,res) => {
  const {email,password,username} = req.body
  try {
    const user = await User.create({email,password,username})
    const token = createToken(user._id)
    res.cookie("jwt", token, {httpOnly:true,maxAge: 24*60*60*1000*1000})
    res.status(201).json({user})
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({errors})
  }
}
module.exports.login_get = (req,res) => {
  res.render("login")
}
module.exports.login_post = async (req,res) => {
  const {username, password} = req.body
  try {
    const user = await User.login(username, password)
    const token = createToken(user._id)
    res.cookie("jwt", token, {httpOnly:true,maxAge: 24*60*60*1000*1000})
    res.status(200).json({user: user._id})
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({errors})
  }
}
module.exports.logout_get = (req,res) => {
  res.cookie("jwt", "", {maxAge: 1})
  res.redirect("/")
}
module.exports.home_get = (req,res) => {
  const {id} = req.body
  console.log(id)
  User.findById(id)
  .then((result) => {
    res.render("home", ({user: result, title: "Home"}))
  }).catch(err => console.log(err))
}
module.exports.passwords_get = (req,res) => {
  res.render("passwords")
}