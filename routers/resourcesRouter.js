const express = require('express');

const taskModel = require('../tasks/taskModel.js')
const projectModel = require('../projects/projectModel.js');
const resourceModel = require('../resources/resourceModel.js')

const router = express.Router();

router.get('/', async (req,res) => {
    try{
       
        const resources = await resourceModel.get();
        res.status(200).json(resources);
    }
    catch(err){
        res.status(500).json({message: 'Error', errorMessage: err})
    }
})

router.post('/', validateResource, async (req, res) => {
    try {    
        const resource = await resourceModel.insert(req.body);
        res.status(201).json(resource);
    } catch (err) {
        res.status(500).json({message:"ERROR adding resource",errorMessage:err});
    }
});

//MiddleWare for Valididating whether resource in POST request has right components

async function validateResource (req, res, next) {
    if (!req.body){
        res.status(400).json({message: "Error: There is no req.body. There is no task"})
    } else if (!req.body.name) {
        res.status(400).json({message: "A resource needs a name!"})
    } else {
       next();
    }
}

module.exports = router;