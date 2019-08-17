const express = require('express');

const projectModel = require('../projects/projectModel.js');

const router = express.Router();

//get ALL Projects
router.get('/', async (req,res) => {
    try{
       
        const projects = await projectModel.get();
        res.status(200).json(projects);
    }
    catch(err){
        res.status(500).json({message: 'Error', errorMessage: err})
    }
})

//GET Project by ID
router.get('/:id', validateProjectId, async (req, res) => {
    res.status(200).json(req.project);
});


//POST Project
router.post('/', validateProject, async (req, res) => {
    try {    
        const project = await projectModel.insert(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({message:err});
    }
});


//MiddleWare
function validateProject(req, res, next) {
    if (!req.body.name) {
        res.status(404).json({message:'Project name is missing.'});
    } else {
        next();
    }
};

async function validateProjectId (req, res, next) {
    try {
        const project = await projectModel.getById(req.params.id);
        if (project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({message: "Invalid project id"});
        }
    } catch (err) {
        res.status(500).json({message:"There was an error while validating project id"});
    }
};

module.exports = router;