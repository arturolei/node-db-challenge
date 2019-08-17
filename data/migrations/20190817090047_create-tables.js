

exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', function(projects) {
        projects.increments();
        projects.string('name', 128).notNullable();
        projects.text('description').notNullable();
        projects.boolean('completed').defaultTo(false);
      })
      .createTable('tasks', function(actions) {
        actions.increments();
    
        actions
          .integer('project_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('projects')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
    
        actions.string('description', 128).notNullable();
        actions.text('notes').notNullable();
        actions.boolean('completed').defaultTo(false);
      })
      .createTable('resources', function(resources){
          resources.increments();
          resources.string('name',128).notNullable();
          resources.text('description');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('resources')
    .dropTableIfExists('actions')
    .dropTableIfExists('projects');

};

