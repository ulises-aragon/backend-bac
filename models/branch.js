const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Branch = sequelize.define("Branch", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: "branches",
  timestamps: true
});

module.exports = Branch;