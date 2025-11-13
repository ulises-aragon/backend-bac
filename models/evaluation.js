const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Evaluation = sequelize.define("Evaluation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { type: DataTypes.INTEGER, allowNull: false, field: "employee_id" },
  score: { type: DataTypes.FLOAT, allowNull: false }, // 0-10
  reviewer: { type: DataTypes.STRING, allowNull: true },
  comments: { type: DataTypes.TEXT, allowNull: true },
  date: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: "evaluations",
  timestamps: true
});

module.exports = Evaluation;
