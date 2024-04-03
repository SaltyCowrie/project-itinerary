const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Itinerary extends Model {}

Itinerary.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    iteneraryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    goalOne: {
      type: DataTypes.STRING,
    },
    goalTwo: {
      type: DataTypes.STRING,
    },
    goalThree: {
      type: DataTypes.STRING,
    },
    goalFour: {
      type: DataTypes.STRING,
    },
    goalFive: {
      type: DataTypes.STRING,
    },
    goalSix: {
      type: DataTypes.STRING,
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
    modelName: 'itinerary',
  }
);

module.exports = Itinerary;
