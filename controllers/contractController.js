const { Contract, Employee, Position } = require("../models/relations");

exports.list = async (req, res, next) => {
  try {
    const rows = await Contract.findAll({ include: [{ model: Employee }, { model: Position }] });
    res.json(rows);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const contract = await Contract.findByPk(req.params.id, { include: [{ model: Employee }, { model: Position }] });
    if (!contract) return res.status(404).json({ error: "Contrato no encontrado" });
    res.json(contract);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { employeeId, positionId, startDate, endDate, contractType, salaryRate, status } = req.body;
    if (!employeeId || !startDate || !salaryRate) return res.status(400).json({ error: "employeeId, startDate y salaryRate son requeridos" });

    const employee = await Employee.findByPk(employeeId);
    if (!employee) return res.status(400).json({ error: "Empleado no existe" });

    if (positionId) {
      const position = await Position.findByPk(positionId);
      if (!position) return res.status(400).json({ error: "Puesto no existe" });
    }

    const newContract = await Contract.create({ employeeId, positionId, startDate, endDate, contractType, salaryRate, status });
    res.status(201).json(newContract);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const contract = await Contract.findByPk(req.params.id);
    if (!contract) return res.status(404).json({ error: "Contrato no encontrado" });

    if (req.body.employeeId) {
      const employee = await Employee.findByPk(req.body.employeeId);
      if (!employee) return res.status(400).json({ error: "Empleado no existe" });
    }
    if (req.body.positionId) {
      const position = await Position.findByPk(req.body.positionId);
      if (!position) return res.status(400).json({ error: "Puesto no existe" });
    }

    await contract.update(req.body);
    res.json(contract);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    const contract = await Contract.findByPk(req.params.id);
    if (!contract) return res.status(404).json({ error: "Contrato no encontrado" });
    await contract.destroy();
    res.json({ message: "Contrato eliminado" });
  } catch (err) { next(err); }
};
