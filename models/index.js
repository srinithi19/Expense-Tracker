const User = require('./User')
const Transaction = require('./Transaction')
const Budget = require('./Budget')

// User has many transaction 
User.hasMany(Transaction, {
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

// Budget belongs to user 
Budget.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
})

module.exports = {User, Budget, Transaction};