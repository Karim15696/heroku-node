let Project = require('../models/Project');
let Portfolio=require('../models/Portfolio');
let projectController = {

    getAllProjects:function(req, res){

        Project.find(function(err, projects){

            if(err)
                res.send(err.message);
            else
            console.log(projects[2].username);
                res.render('index', {projects});
        })
    },

    createProject:function(req, res){
        let project = new Project(req.body);

        project.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
                console.log("karim");
            }
            else{

                console.log(project);
                res.redirect('/');
            }
        })
    }
}

module.exports = projectController;
