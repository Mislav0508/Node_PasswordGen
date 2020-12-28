const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema ({
  email:{
    type: String,
    required: [true, "Please enter an email yo"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email brother"]
  },
  password: {
    type: String,
    required: [true, "Please enter a passsword man"],
    minlength: [3, "Minimum password length is 3 characters son"]
  },
  username: {
    type: String,
    required: [true, "Please enter a username dude"],
    unique: true
  }
}, {timestamps: true})

userSchema.pre("save", async function(next){
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.statics.login = async function(username,password){
  const user = await this.findOne({username})
  if(user){
    const auth = await bcrypt.compare(password, user.password)
    if(auth){
      return user
    }
    throw Error("incorrect password")
  }
throw Error("incorrect username")  
}

const User = mongoose.model("user", userSchema)

module.exports = User