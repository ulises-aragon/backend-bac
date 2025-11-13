const { Department, Employee } = require('../models/relations');

exports.list = async(req, res, next) => {
    try {
        const rows = await Department.findAll();
        res.json(rows);
    } catch(err) { next(err) }
};

exports.get = async (req, res, next) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ error: 'Departamento no encontrado' });
    res.json(department);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'name es requerido' });
    const newDepartment = await Department.create(req.body);
    res.status(201).json(newDepartment);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ error: 'Un departamento con ese nombre ya existe' });
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ error: 'Departamento no encontrado' });
    await department.update(req.body);
    res.json(department);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ error: 'Departamento no encontrado' });

    const count = await Employee.count({ where: { departmentId: dep.id } });
    if (count > 0) return res.status(400).json({ error: 'No se puede eliminar: existen empleados en este departamento' });

    await department.destroy();
    res.json({ message: 'Departamento eliminado' });
  } catch (err) { next(err); }
};