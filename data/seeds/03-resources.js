
exports.seed = function(knex) {
  return knex('resources').insert([
    {
      name: "Lab cage",
     description: "It's the lab cage where we plan everything. it's also where we sleep"
    },
    {
      name: "Little gray cells"
    },
  ]);
};
