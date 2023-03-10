const mongoose =require("mongoose")
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/iNotebookDB").then(()=>{
    console.log("Connected to Mongo Successfully")
}) .catch((e)=>{
    console.log(e);
})


