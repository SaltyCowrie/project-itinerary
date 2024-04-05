const User = require('./User');
const Itinerary = require('./Itinerary');
const Goal = require("./Goal")

User.hasMany(Itinerary, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Itinerary.hasMany(Goal, {
  foreignKey: 'itinerary_id',
  onDelete: 'CASCADE'
});

User.hasMany(Goal, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { User, Itinerary, Goal };
