const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Position = sequelize.define("Position", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    minSalary: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: "min_salary" },
    maxSalary: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: "max_salary" },
}, {
    tableName: "positions",
    timestamps: true,
});

module.exports = Position;