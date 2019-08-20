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
    /*
    let resourceQuery = await db('projects')
    .join('resources_projects', 'projects.id','resources_projects.project_id')
    .join('resources','resources_projects.resource_id','resources.resource_id')
    .select('resources.id', 'resources.name', 'resources.description')
    .where('projects.id', id)
    

    queryProject.resources = resourceQuery;
    console.log(resourceQuery);
    */

    queryProject.tasks = queryTasks.map(task=>mappers.actionToBody(task));

    let projectData = mappers.projectToBody(queryProject);
  
    return  projectData;

}

function insert(project){
    return db('projects')
    .insert(project)
    .then(([id]) => this.getById(id));
}
