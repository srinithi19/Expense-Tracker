const sequelize = require('../config/connection');
const { User, Budget, Transaction } = require('../models');

const userSeeds = require('./userSeeds.json');
const budgetSeeds = require('./budgetSeeds.json');
const transactionSeeds = require('./transactionSeeds.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(UsersSeedData, {
    individualHooks: true,
    returning: true,
  })

  const transactions = await Posts.bulkCreate(transactionSeeds);
  const budget = await Posts.bulkCreate(budgetSeeds)


  process.exit(0);
};

seedDatabase();