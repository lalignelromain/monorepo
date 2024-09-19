const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-client");

class Univers extends Model {}

Univers.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  sequelize,
  tableName: "univers", 
});

module.exports = Univers;