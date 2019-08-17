
exports.seed = function(knex, Promise) {
  return knex('projects').insert([
    {
      name: 'Take over the world',
      description:
        'It is the same thing we do every night, Brain.',
    }, {
      name: 'Complete official React intro tutorial'
    }
  ]);
};
