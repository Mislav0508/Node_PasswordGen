const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require("mongoose")
const morgan = require("morgan")
const authRoutes = require("./routes/routes")
let cookies = require("cookie-parser")

const dbURI = "mongodb+srv://Mislav0508:05080639@nodecluster.fxfff.mongodb.net/1projectAuth?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
.then((result) => app.listen(PORT)) 
.catch((err) => console.log(err))

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookies())


app.use(authRoutes)

