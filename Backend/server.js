const express = require("express");
const mongoose = require("mongoose");
const bcrypt =  require("bcryptjs");
const cors =  require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use(cors());

app.use(express.static("public"));
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Mongodb connected succesfully");
})
.catch((error)=>{
    console.log(error)
});
const User = mongoose.model("User",{
    email:{
        type:String,
        unique:true
    },
    password:String

});
const journal = mongoose.model("journal",{
    title:String,
    description:String
});
app.post('/register',async(req,res)=>{
    try{
        const{email,password} = req.body;
        const hashedpassword = await bcrypt.hash(password,10);
        await User.create({
            email:email,
            password:hashedpassword

        });
        res.send("Registration Successfull");
    }
    catch(error){
        console.log(error);
        res.send("Registration failed");
    }
});
app.post('/login',async(req,res)=>{
    try{
        const{email,password} = req.body;
        const user = User.findOne({
        email:email});
        if(user&& await bcrypt.compare(password,user.password)){
            res.send("Login Succesfull")
        }
        else{
            res.status(401).send("Invalid email")
        }
    }
    catch(error){
        res.status(500).send("Server error")
    }
});
app.post('/post',async(req,res)=>{
    try{
        await journal.create(req.body);
        res.send("Journal saved");
    }
    catch(error){
        res.status(500).send("could not save entries")
    }
});
app.get('/entries',async(req,res)=>{
    try{
        const entries = await journal.find();
        res.json(entries);
    }
     catch(error){
        res.status(500).send("could not get entries")
    }
});
app.listen(3000,()=>{
    console.log("Server started running at port 3000");
});
  






