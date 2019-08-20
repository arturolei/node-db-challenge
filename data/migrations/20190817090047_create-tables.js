

exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', function(projects) {
        projects.increments();
        projects.string('name', 128).notNullable();
        projects.text('description').defaultTo('No description given');
        projects.boolean('completed').defaultTo(false);
      })
      .createTable('tasks', function(tasks) {
        tasks.increments();
    
        tasks
          .integer('project_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('projects')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
    
        tasks.string('description', 128).notNullable();
        tasks.text('notes').defaultTo('No Notes');
        tasks.boolean('completed').defaultTo(false);
      })
      .createTable('resources', function(resources){
          resources.increments();
          resources.string('name',128).unique().notNullable();
          resources.text('description').defaultTo('No Description Given');
      })
      .createTable('resources_projects', tbl => {
          tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('resources')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
          tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');;
          tbl.primary(['resource_id','project_id']);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('resources_projects')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects');
};

