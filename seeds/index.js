const sequelize = require('../config/connection');
const { User, Budget, Transaction } = require('../models');

const userSeeds = require('./userSeeds.json');
const budgetSeeds = require('./budgetSeeds.json');
const transactionSeeds = require('./transactionSeeds.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  })

  const transactions = await Transaction.bulkCreate(transactionSeeds);
  const budget = await Budget.bulkCreate(budgetSeeds)

  process.exit(0);
};

seedDatabase();