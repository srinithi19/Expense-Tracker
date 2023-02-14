const sequelize = require('../config/connection');
const { User, Budget, Transaction, Challenge, Quest, QuestUser } = require('../models');

const userSeeds = require('./userSeeds.json');
const budgetSeeds = require('./budgetSeeds.json');
const transactionSeeds = require('./transactionSeeds.json');
const challengeSeeds = require('./challengeSeeds.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  })

  const transactions = await Transaction.bulkCreate(transactionSeeds);
  const budget = await Budget.bulkCreate(budgetSeeds)
  const challenge = await Challenge.bulkCreate(challengeSeeds)
  const quest = await Quest.bulkCreate(quest)
  const questUser = await QuestUser.bulkCreate(questUser)

  process.exit(0);
};

seedDatabase();