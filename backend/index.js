const env = require("dotenv")
env.config()
require("./connection")
const express= require("express");


var cors = require('cors')
const port= 5000;
const app =express()


app.use(cors())
app.use(express.json())



app.use(express.json())
// Available routes 
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/notes',require('./Routes/notes'))




app.get('/',(req,res)=>{
    res.send("hellow")
})


// listen port
app.listen(port,(req,res)=>{
    console.log(`app is listen at port ${port}`)
})
