const Employee = require("./employee");
const Department = require("./department");
const Position = require("./position");
const Branch = require("./branch");
const Evaluation = require("./evaluation");
const Contract = require("./contract");
const SalaryRecord = require("./salaryRecord");

// Employee - Department
Department.hasMany(Employee, { foreignKey: "departmentId", sourceKey: "id" });
Employee.belongsTo(Department, { foreignKey: "departmentId", targetKey: "id" });

// Employee - Position
Position.hasMany(Employee, { foreignKey: "positionId", sourceKey: "id" });
Employee.belongsTo(Position, { foreignKey: "positionId", targetKey: "id" });

// Employee - Branch
Branch.hasMany(Employee, { foreignKey: "branchId", sourceKey: "id" });
Employee.belongsTo(Branch, { foreignKey: "branchId", targetKey: "id" });

// Employee - Evaluation
Employee.hasMany(Evaluation, { foreignKey: "employeeId", sourceKey: "id", as: "evaluations" });
Evaluation.belongsTo(Employee, { foreignKey: "employeeId", targetKey: "id" });

// Employee - Contract
Employee.hasMany(Contract, { foreignKey: "employeeId", sourceKey: "id", as: "contracts" });
Contract.belongsTo(Employee, { foreignKey: "employeeId", targetKey: "id" });

// Position - Contract
Position.hasMany(Contract, { foreignKey: "positionId", sourceKey: "id" });
Contract.belongsTo(Position, { foreignKey: "positionId", targetKey: "id" });

// Employee - SalaryRecord
Employee.hasMany(SalaryRecord, { foreignKey: "employeeId", sourceKey: "id", as: "salaryRecords" });
SalaryRecord.belongsTo(Employee, { foreignKey: "employeeId", targetKey: "id" });

// Contract - SalaryRecord
Contract.hasMany(SalaryRecord, { foreignKey: "contractId", sourceKey: "id", as: "payments" });
SalaryRecord.belongsTo(Contract, { foreignKey: "contractId", targetKey: "id" });


module.exports = {
    Employee,
    Department,
    Position,
    Branch,
    Evaluation,
    Contract,
    SalaryRecord
};