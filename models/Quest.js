const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection');

class Quest extends Model {}


Quest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, 
    url: {
      type: DataTypes.TEXT,
      // validate: {
      //   isUrl: true,
      // },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'quest',
  }
);

module.exports = Quest;