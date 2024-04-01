const User = require('./User');
const Itinerary = require('./Itinerary');

User.hasMany(Itinerary, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Itinerary.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Itinerary };
