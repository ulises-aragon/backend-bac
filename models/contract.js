const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Contract = sequelize.define("Contract", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employeeId: { type: DataTypes.INTEGER, allowNull: false, field: "employee_id" },
  positionId: { type: DataTypes.INTEGER, allowNull: true, field: "position_id" },
  startDate: { type: DataTypes.DATEONLY, allowNull: false, field: "start_date" },
  endDate: { type: DataTypes.DATEONLY, allowNull: true, field: "end_date" },
  contractType: { type: DataTypes.ENUM("Indefinido", "Temporal", "Por Servicio", "Prueba"), allowNull: false, field: "contract_type", defaultValue: "Indefinido" },
  salaryRate: { type: DataTypes.DECIMAL(12,2), allowNull: false, field: "salary_rate" },
  status: { type: DataTypes.ENUM("Activo", "Terminado", "Suspendido"), allowNull: false, defaultValue: "Activo" }
}, {
  tableName: "contracts",
  timestamps: true
});

module.exports = Contract;
