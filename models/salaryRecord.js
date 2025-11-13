const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const SalaryRecord = sequelize.define("SalaryRecord", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { type: DataTypes.INTEGER, allowNull: false, field: "employee_id" },
  contractId: { type: DataTypes.INTEGER, allowNull: true, field: "contract_id" },
  period: { type: DataTypes.STRING, allowNull: false }, // "2025-11" o "2025-11-01"
  baseSalary: { type: DataTypes.DECIMAL(12,2), allowNull: false, field: "base_salary" },
  bonus: { type: DataTypes.DECIMAL(12,2), allowNull: true, defaultValue: 0 },
  deductions: { type: DataTypes.DECIMAL(12,2), allowNull: true, defaultValue: 0 },
  netPay: { type: DataTypes.DECIMAL(12,2), allowNull: false, field: "net_pay" },
  paymentDate: { type: DataTypes.DATEONLY, allowNull: true, field: "payment_date" },
  notes: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: "salary_records",
  timestamps: true
});

module.exports = SalaryRecord;
