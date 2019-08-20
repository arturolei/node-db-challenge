const express = require('express');

const taskModel = require('../tasks/taskModel.js')
const projectModel = require('../projects/projectModel.js');

const router = express.Router();


// POST task
router.post('/', validateTask, async (req, res) => {
    try {    
        const newtask = await taskModel.insert(req.body);
        res.status(201).json(newtask);
    } catch (err) {
        res.status(500).json({message:"Error posting task",errorMessage:err});
    }
});

//GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await taskModel.get();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({message:"Error retrieving/getting tasks"});
    }
});

// GET task by id
router.get('/:id', validateTaskId, async (req, res) => {
        res.status(200).json(req.task);
});


//MiddleWare (mostly for validating ID's)

async function validateTaskId (req, res, next) {
    try {
        
        const task = await taskModel.getById(req.params.id);
        if (!task) {
            res.status(404).json({message:'Invalid task id'});
        } else {
            req.task = task;
            next();
        }
    } catch (err) {
        res.status(500).json({message:"There was an error while validating task id"});
    }
};

async function validateTask (req, res, next) {
    //test if project_id is for a real project.
    try {
        const project = await projectModel.getById(req.body.project_id);
        if (!project) {
            res.status(404).json({message: "Invalid project id"});
        }
    } catch (err) {
        res.status(500).json({message:"There was an error while validating project id"});
    }

    if (!req.body){
        res.status(400).json({message: "Error: There is no req.body. There is no task"})
    } else if (!req.body.project_id || !req.body.description ) {
        res.status(400).json({message: "Missing project_id ID or description!"})
    } else if (req.body.description.length > 128 || req.body.description.length < 1) {
        res.status(400).json({message:"Description must be between 1 to 128 characters!"})
    } else {
        if(projectModel.get(req.body.project_id)){
            next();
        } else {
            res.status(404).json("Invalid project id");
        }
    }
};


module.exports = router;