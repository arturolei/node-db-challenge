exports.seed = function(knex) {
  return knex('tasks').insert([
    {
      project_id: 1,
      description: 'Create a hit song',
      notes:
        'Hit song will have sublminal messages',
    },
    {
      project_id: 1,
      description: 'Copyright fish',
      notes: 'Tie world food supply up in litigation',
    },
    {
      project_id: 1,
      description: 'Design and Build API Endpoints',
      notes: 'This is where the magic happens!',
    },
    {
      project_id:2,
      description:"Test things",
      notes: "Make sure all the endpoints work"
    },
    {
      project_id:2,
      description:"Dream of getting to stretch"
    }
  ]);
};

