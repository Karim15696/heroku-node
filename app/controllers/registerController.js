let Register = require('../models/Register');
let Project = require('../models/Project');
let Portfolio=require('../models/Portfolio');
let Screenshot=require('../models/Screenshot');
let Work=require('../models/Work');
var multer  = require('multer');
var upload = multer({ dest: 'views/' })
let registerController = {

    createUser:function(req, res){
var name=req.file.destination+ '/'+req.file.filename;
        let register = new Register({username:req.body.username,password:req.body.password,image:name});

        register.save(function(err, register){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{

                console.log(register);
                res.redirect('/');
            }
        })
    },
    redirectPage:function(req,res){
  console.log("karim 12");
      res.render('index2',{});
    },
    registerPage:function(req,res){
      console.log("karim ");
      res.render('index1',{});
    },
    login:function(req,res){
      var karim=req.body.username;
      console.log(karim);
      Register.findOne({username:req.body.username,password:req.body.password},function(err,register){
        if(err){
          console.log(err.message);
          res.redirect('/index1');
        }
        else{


          if(!register){
            console.log(req.body.username);
            res.json({success:false,message:"wrong username or password"})


          }
          else{
              console.log(req.body.username);
            console.log("mahmoud sidi we sid rasi");
            Project.find(function(err, projects){
                console.log('searching');
                if(err)
                    res.send(err.message);
                else{
                    console.log('searching');
                    console.log(karim);
                    Portfolio.findOne({username:req.body.username},function(err,find){
                      if(err){
                        console.log(err);
                      }
                      else{
                        if(find){
                          Work.find({username:req.body.username},function(err,projects){
                          if(err)
                          console.log("err");
                          else{
                          Screenshot.find({username:req.body.username},function(err,screenshots){
                              if(err){
                                res.send(error);
                              }
                              else{
                          console.log("found port");
                          console.log(karim);
                          res.render('Loggedin',{karim,projects,screenshots});
                        }
                      })
                      }

                    })
                  }
                    else{
                      console.log(karim);
                      console.log("not found port");
                      console.log(karim);
                      res.render('First',{karim});
                    }
}
                    })


                  }
            })
          }
}
      })
    }
}

module.exports = registerController;
