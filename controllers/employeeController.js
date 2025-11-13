const { Employee, Department, Position, Branch, Evaluation } = require('../models/relations');
const { Op } = require("sequelize");

exports.list = async(req, res, next) => {
    try {
        const { page = 1, limit = 20, search, departmentId, positionId, branchId } = req.query;
        const where = {};

        if (search) {
          where[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } }
          ];
        }

        if (departmentId) where.departmentId = departmentId;
        if (positionId) where.positionId = positionId;
        if (branchId) where.branchId = branchId;

        const offset = (page - 1) * limit;
        const {rows, count} = await Employee.findAndCountAll({ 
          where, 
          limit: Number(limit), 
          offset: Number(offset),
          include: [
            { model: Department },
            { model: Position },
            { model: Branch },
            { model: Evaluation, as: 'evaluations' }
          ],
          order: [['id', 'ASC']]
        });

        res.json({
          data: rows,
          page: Number(page),
          total: count,
          totalPages: Math.ceil(count / Number(limit))
        });
    } catch(err) { next(err) }
};

exports.get = async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: [
        { model: Department },
        { model: Position },
        { model: Branch },
        { model: Evaluation, as: 'evaluations' }
      ]
    });
    if (!employee) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(employee);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, email, salary, departmentId, positionId, branchId } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name y email son requeridos' });

    if (departmentId) {
      const department = await Department.findByPk(departmentId);
      if (!department) return res.status(400).json({ error: 'Departamento no existe' });
    }
    if (positionId) {
      const position = await Position.findByPk(positionId);
      if (!position) return res.status(400).json({ error: 'Puesto no existe' });
    }
    if (branchId) {
      const branch = await Branch.findByPk(branchId);
      if (!branch) return res.status(400).json({ error: 'Sucursal no existe' });
    }

    const newEmployee = await Employee.create({ name, email, salary, departmentId, positionId, branchId });
    res.status(201).json(newEmployee);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ error: 'Un empleado con ese email ya existe' });
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Empleado no encontrado' });

    const { departmentId, positionId, branchId } = req.body;
    if (departmentId) {
      const department = await Department.findByPk(departmentId);
      if (!department) return res.status(400).json({ error: 'Departamento no existe' });
    }
    if (positionId) {
      const posiiton = await Position.findByPk(positionId);
      if (!posiiton) return res.status(400).json({ error: 'Puesto no existe' });
    }
    if (branchId) {
      const branch = await Branch.findByPk(branchId);
      if (!branch) return res.status(400).json({ error: 'Sucursal no existe' });
    }

    await employee.update(req.body);
    res.json(employee);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Empleado no encontrado' });
    await employee.destroy();
    res.json({ message: 'Empleado eliminado' });
  } catch (err) { next(err); }
};