// require dependincies
var express = require('express');
var router = express.Router();
var projectController = require('./controllers/projectController');
var registerController=require('./controllers/registerController');
var Register=require('./models/Register');
var Screenshot=require('./models/Screenshot');
var Portfolio=require('./models/Portfolio');
var Work=require('./models/Work');
var multer  = require('multer');
var upload = multer({ dest: 'Folder/' });
// add routes



//router.get('/', projectController.getAllProjects);
router.get('/' ,function(req,res){
  Portfolio.find(function(err, projects){

      if(err)
          res.send(err.message);
      else
      console.log(projects[0].username);
          res.render('Start', {projects});
  })
})

router.post('/createPortfolio',function(req,res){


var karim=req.body.username;
console.log(karim+'I am here');
let portfolio =new Portfolio({username:karim});
let work=new Work(req.body);

  portfolio.save(function(err, register){
      if(err){
          console.log("The error is here");
          console.log("karim");

      }
      else{

          console.log("saving");
          work.save(function(err,save){
            if(err){
              console.log(err);
            }
            else{
              console.log('work saved');
              console.log('username');
              Work.find({username:req.body.username},function(err, projects){



                  if(err)
                      res.send(err.message);
                  else{
    Screenshot.find({username:req.body.username},function(err, screenshots){
                        if (err)
                        res.send(err.message);
                        else {
                          console.log("error");
                              res.render('Loggedin', {projects,karim,screenshots});
                        }
                  })

                    }
                  })
              }
            })
          }
      })
    })



router.post('/work',function(req,res){
var karim=req.body.username;
console.log(karim+"I am here")
  let work=new Work({username:req.body.username,title:req.body.title,URL:req.body.URL});
  work.save(function(err,save){
    if(err){
      console.log("error in saving");
    }
    else{
      Work.find({username:req.body.username},function(err,projects){
        if (err){
        res.send(err.message);
      }
      else
        {
          Screenshot.find({username:req.body.username},function(err, screenshots){
                              if (err)
                              res.send(err.message);
                              else {
                                console.log("error");
                                    res.render('Loggedin', {projects,karim,screenshots});
                              }
                        })
        }
})
      }



})
})
router.post('/take', upload.single('FirstPhoto'), function (req, res) {
      console.log(req.file);
      console.log(req.files);
      console.log(req.file.originalname );
      console.log(req.file.destination );
      res.render(req.file.destination+'/'+req.file.filename,{});
})
router.post('/getUser',function(req,res){
  var karim=req.body.username;
  console.log(req.body);
  Work.find({username:karim},function(err,projects){
    if(err){
      res.send(err.message);

    }
    else{
  Screenshot.find({username:karim},function(err,screenshots){
    if(err)
    res.send(err.message);

  else{
    res.render('viewUser',{karim,projects,screenshots});
  }
})
    }

})
})
router.get('/register', registerController.redirectPage) ;
router.post('/project', projectController.createProject);
router.post('/karim',upload.single('FirstPhoto'),function(req,res){
  console.log(req.file);
  var name=req.file.destination+ ''+req.file.filename;
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
      })
      router.post('/screenshot',upload.single('FirstPhoto'),function(req,res){
      var karim=req.body.username;
      var destination=req.file.destination+''+req.file.filename;
      var name=req.file.originalname;
      var filen=req.file.filename;
    
      console.log(destination);
      console.log(karim+"I am here");
        let screenshot=new Screenshot({username:req.body.username,title:req.body.title,image:destination});
        screenshot.save(function(err,save){
          if(err){
            console.log("error in saving");
          }
          else{
            Work.find({username:req.body.username},function(err,projects){
              if (err){
              res.send(err.message);
            }
            else
              {
                Screenshot.find({username:req.body.username},function(err,screenshots){
                  if(err){
                    res.send(err.message);
                  }
                  else{

                res.render('Loggedin',{projects,karim,screenshots});
              }
            })
      }
    })



      }
    })
})

router.get('/register1', registerController.registerPage) ;
router.post('/login',registerController.login);
// export router

module.exports = router;
