const db = require('../data/dbConfig.js');

const mappers = require('../data/helpers/mappers.js');

module.exports = {
    get, 
    getById,
    insert
}

function get() {
    return db('resources')
}

function getById(resourceId) {
    return db('resources')
        .where('resources.id', resourceId);
}

//inserts resource then gets us newly added resource back as output
function insert(resource) {
    return db('resources')
        .insert(resource)
        .then(ids => {
        return getById(ids[0]);
    })
}
