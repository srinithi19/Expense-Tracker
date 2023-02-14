const User = require('./User')
const Transaction = require('./Transaction')
const Budget = require('./Budget')
const Challenge = require('./Challenge')
const Quest = require('./Quest')
const QuestUser = require('./QuestUser')


// User has many transaction 
User.hasMany(Transaction, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})


// User has many challenge 
User.hasMany(Challenge, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})

// User has one budget
User.hasOne(Budget, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})

// Transaction belongs to user
Transaction.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})

Quest.belongsTo(User, {
  through: QuestUser
})

// Challenge belongs to user
Challenge.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})

// Budget belongs to user 
Budget.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})

module.exports = {User, Budget, Transaction, Challenge};