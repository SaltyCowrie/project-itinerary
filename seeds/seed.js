const sequelize = require('../config/connection');
const { User, Itinerary, Goal } = require('../models');

const userData = require('./userData.json');
const itineraryData = require('./itinerary.json')
const goalData = require('./goal.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


  const itinerarySeeds = await Itinerary.bulkCreate(itineraryData, {
    individualHooks: true,
    returning: true,
  });

  const goalSeeds = await Goal.bulkCreate(goalData, {
    individualHooks: true,
    returning: true,
  });



  process.exit(0);
};

seedDatabase();
