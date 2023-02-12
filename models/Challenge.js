const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection');

class Challenge extends Model {}


Challenge.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, 
    Content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Badge: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'challenge',
  }
);

module.exports = Challenge;