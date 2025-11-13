const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Employee = sequelize.define("Employee", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    salary: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: { isDecimal: true }
    },
    departmentId: {
        type: DataTypes.INTEGER,
        field: 'department_id',
    },
    positionId: {
        type: DataTypes.INTEGER,
        field: 'position_id',
    },
    branchId: {
        type: DataTypes.INTEGER,
        field: 'branch_id',
    }
}, {
    tableName: "employees",
    timestamps: true
})

module.exports = Employee;