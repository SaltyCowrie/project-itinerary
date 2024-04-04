const sequelize = require('../config/connection');
const { User, Itinerary, Goal } = require('../models');

const userData = require('./userData.json');
const itineraryData = require('./itinerary.json')
const goalData = require('./goal.json')
//const projectData = require('./projectData.json');

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


 // for (const project of projectData) {
//await Itinerary.create({
//...project,
   //   user_id: users[Math.floor(Math.random() * users.length)].id,
//});
//}

  process.exit(0);
};

seedDatabase();
