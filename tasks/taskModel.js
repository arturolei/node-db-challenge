const db = require ('../data/dbConfig.js');
const mappers = require('../data/helpers/mappers.js')

module.exports = {
    get,
    insert,
    getById
}
//GET all tasks
function get() {
    return db('tasks').then(tasks => {
        return tasks.map(task=>mappers.actionToBody(task))
    });
}

function getById(taskId) {
    return db('tasks')
        .where('tasks.id', taskId)
        .first()
        .then(task => mappers.actionToBody(task));
}

//inserts task then gets us newly added action back as output
function insert(task) {
    return db('tasks')
        .insert(task)
        .then(ids => {
        return getById(ids[0]);
    })
}