const express = require('express');
const app = express();
const userModel = require("./models/user")

app.set("view engine", 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.render('index');
});
app.post("/create",function(req,res){
  try{
    let {name,username,email} = req.body
    userModel.create({
       name,
       username,
       email
    }).then(function(createdUser){
        console.log(createdUser)
       res.redirect('/users')
    })
  }
  catch(err){
    res.send(err)
  }
});

app.get("/users",function(req,res){
   try{
    userModel.find().then(function(user){
        res.render("users",{user})
       })
   }
   catch(err){
    res.send(err)
   }
});

// app.get("/delete/:_id",function(req,res){
//    try{
//     userModel.findOneAndDelete({_id: req.params._id}).then(function(user){
//         res.render("users",{user})
//        })
//    }
//    catch(err){
//     res.send(err)
//    }
// });

app.listen(3000)