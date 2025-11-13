// controllers/branchController.js
const { Branch, Employee } = require('../models/relations');

exports.list = async (req, res, next) => {
  try {
    const rows = await Branch.findAll();
    res.json(rows);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) return res.status(404).json({ error: 'Sucursal no encontrada' });
    res.json(branch);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, address } = req.body;
    if (!name) return res.status(400).json({ error: 'name es requerido' });
    const newBranch = await Branch.create({ name, address });
    res.status(201).json(newBranch);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) return res.status(404).json({ error: 'Sucursal no encontrada' });
    await branch.update(req.body);
    res.json(branch);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) return res.status(404).json({ error: 'Sucursal no encontrada' });

    const count = await Employee.count({ where: { branchId: branch.id } });
    if (count > 0) return res.status(400).json({ error: 'No se puede eliminar: existen empleados en esta sucursal' });

    await branch.destroy();
    res.json({ message: 'Sucursal eliminada' });
  } catch (err) { next(err); }
};
