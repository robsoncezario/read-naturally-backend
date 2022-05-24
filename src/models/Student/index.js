const { DataTypes } = require('sequelize');
const sequelize = require('../../database/connection');

const Student = sequelize.define(
  'Student',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://avatarfiles.alphacoders.com/813/81319.jpg',
    },

    schoolName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    license: {
      type: DataTypes.ENUM(['licensed', 'not licensed']),
      allowNull: false,
    },
  },
  {
    // Other model options go here
  },
);

module.exports = Student;
