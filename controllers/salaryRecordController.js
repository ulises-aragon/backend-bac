const { SalaryRecord, Employee, Contract } = require("../models/relations");

exports.list = async (req, res, next) => {
  try {
    const where = {};
    if (req.query.employeeId) where.employeeId = req.query.employeeId;
    if (req.query.contractId) where.contractId = req.query.contractId;
    if (req.query.period) where.period = req.query.period;

    const rows = await SalaryRecord.findAll({
      where,
      include: [{ model: Employee }, { model: Contract }]
    });
    res.json(rows);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const r = await SalaryRecord.findByPk(req.params.id, { include: [{ model: Employee }, { model: Contract }] });
    if (!r) return res.status(404).json({ error: "Registro de salario no encontrado" });
    res.json(r);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { employeeId, contractId, period, baseSalary, bonus = 0, deductions = 0, paymentDate, notes } = req.body;
    if (!employeeId || !period || typeof baseSalary === "undefined") return res.status(400).json({ error: "employeeId, period y baseSalary son requeridos" });

    const employee = await Employee.findByPk(employeeId);
    if (!employee) return res.status(400).json({ error: "Empleado no existe" });

    if (contractId) {
      const contract = await Contract.findByPk(contractId);
      if (!contract) return res.status(400).json({ error: "Contrato no existe" });
    }

    const netPay = (Number(baseSalary) + Number(bonus || 0)) - Number(deductions || 0);

    const newRecord = await SalaryRecord.create({ employeeId, contractId, period, baseSalary, bonus, deductions, netPay, paymentDate, notes });
    res.status(201).json(newRecord);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const record = await SalaryRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: "Registro de salario no encontrado" });

    if (req.body.employeeId) {
      const employee = await Employee.findByPk(req.body.employeeId);
      if (!employee) return res.status(400).json({ error: "Empleado no existe" });
    }

    if (req.body.contractId) {
      const contract = await Contract.findByPk(req.body.contractId);
      if (!contract) return res.status(400).json({ error: "Contrato no existe" });
    }

    // recalcular netPay si se pasan baseSalary/bonus/deductions
    const updates = { ...req.body };
    if (typeof updates.baseSalary !== "undefined" || typeof updates.bonus !== "undefined" || typeof updates.deductions !== "undefined") {
      const base = typeof updates.baseSalary !== "undefined" ? Number(updates.baseSalary) : Number(record.baseSalary);
      const bonus = typeof updates.bonus !== "undefined" ? Number(updates.bonus) : Number(record.bonus || 0);
      const deductions = typeof updates.deductions !== "undefined" ? Number(updates.deductions) : Number(record.deductions || 0);
      updates.netPay = (base + bonus) - deductions;
    }

    await record.update(updates);
    res.json(record);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    const record = await SalaryRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: "Registro de salario no encontrado" });
    await record.destroy();
    res.json({ message: "Registro de salario eliminado" });
  } catch (err) { next(err); }
};
