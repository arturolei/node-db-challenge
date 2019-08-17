const db = require('../data/dbConfig.js');

const mappers = require('../data/helpers/mappers.js')

module.exports = {
    get, 
    getById,
    insert
}

function get() {
    return db('projects').then(projects => {
        return projects.map(project => mappers.projectToBody(project));
    });
}

async function getById(id){
    let queryProject = await db('projects').where('projects.id', id).first();
    let queryTasks = await db('tasks').where('project_id', id);

    queryProject.tasks = queryTasks.map(task=>mappers.actionToBody(task));

    let projectData = mappers.projectToBody(queryProject);
  
    return  projectData;

}

function insert(project){
    return db('projects')
    .insert(project)
    .then(([id]) => this.getById(id));
}
