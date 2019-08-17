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

router.post('/', async (req, res) => {
    try {    
        const resource = await resourceModel.insert(req.body);
        res.status(201).json(resource);
    } catch (err) {
        res.status(500).json({message:"ERROR adding resource",errorMessage:err});
    }
});


module.exports = router;