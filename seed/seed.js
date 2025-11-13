// seed/seed.js
const { sequelize } = require("../config/database");
const { Employee, Department, Position, Branch, Evaluation, Contract, SalaryRecord } = require("../models/relations");

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Creando base de datos");

    const deps = await Department.bulkCreate([
      { name: "Finanzas", description: "Encargado de la gestión financiera, contabilidad y presupuesto." },
      { name: "Sistemas", description: "Responsable del desarrollo, mantenimiento y soporte de sistemas informáticos." },
      { name: "Recursos Humanos", description: "Gestión de talento, reclutamiento, formación y relaciones laborales." },
      { name: "Atención al Cliente", description: "Atiende consultas, quejas y soporte a clientes para garantizar su satisfacción." }
    ], { returning: true });

    const positions = await Position.bulkCreate([
      { title: "Cajero", minSalary: 408, maxSalary: 600 },
      { title: "Analista", minSalary: 600, maxSalary: 1200 },
      { title: "Gerente", minSalary: 1500, maxSalary: 3500 }
    ], { returning: true });

    const branches = await Branch.bulkCreate([
      { name: "Sucursal Centro", address: "Av. Central #123" },
      { name: "Sucursal Norte", address: "Col. Norte #45" }
    ], { returning: true });

    const employees = await Employee.bulkCreate([
      { name: "Carlos Gómez", email: "carlos.gomez@bac.com", salary: 350.00, departmentId: deps[3].id, positionId: positions[0].id, branchId: branches[0].id },
      { name: "Ana Sánchez", email: "ana.sanchez@bac.com", salary: 800.00, departmentId: deps[1].id, positionId: positions[1].id, branchId: branches[1].id },
      { name: "María López", email: "maria.lopez@bac.com", salary: 2000.00, departmentId: deps[0].id, positionId: positions[2].id, branchId: branches[0].id }
    ], { returning: true });

    const contracts = await Contract.bulkCreate([
      { employeeId: employees[0].id, positionId: positions[0].id, startDate: "2024-01-01", contractType: "Indefinido", salaryRate: 350.00, status: "Activo" },
      { employeeId: employees[1].id, positionId: positions[1].id, startDate: "2024-03-01", endDate: "2025-03-01", contractType: "Temporal", salaryRate: 800.00, status: "Activo" },
    ], { returning: true });

    await SalaryRecord.bulkCreate([
      { employeeId: employees[0].id, contractId: contracts[0].id, period: "2025-10", baseSalary: 350.00, bonus: 20, deductions: 10, netPay: 360.00, paymentDate: "2025-10-31" },
      { employeeId: employees[1].id, contractId: contracts[1].id, period: "2025-10", baseSalary: 800.00, bonus: 0, deductions: 50, netPay: 750.00, paymentDate: "2025-10-31" }
    ]);

    await Evaluation.bulkCreate([
      { employeeId: employees[0].id, score: 78, reviewer: "Jefe Local", comments: "Buen desempeño general", date: "2025-11-12" },
      { employeeId: employees[1].id, score: 88, reviewer: "Gerente de área", comments: "Destaca en análisis", date: "2025-11-05" },
      { employeeId: employees[2].id, score: 95, reviewer: "Director", comments: "Líder sobresaliente", date: "2025-11-01" }
    ]);

    console.log("Seed completado con departamentos, posiciones, sucursales, empleados, evaluaciones, contratos y salarios.");
    process.exit(0);
  } catch (err) {
    console.error("Error en seed:", err);
    process.exit(1);
  }
})();
