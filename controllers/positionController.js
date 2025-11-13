const { Position, Employee } = require('../models/relations');

exports.list = async (req, res, next) => {
  try {
    const rows = await Position.findAll();
    res.json(rows);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const position = await Position.findByPk(req.params.id);
    if (!position) return res.status(404).json({ error: 'Puesto no encontrado' });
    res.json(position);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { title, minSalary, maxSalary } = req.body;
    if (!title) return res.status(400).json({ error: 'title es requerido' });
    const newPos = await Position.create({ title, minSalary, maxSalary });
    res.status(201).json(newPos);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const position = await Position.findByPk(req.params.id);
    if (!position) return res.status(404).json({ error: 'Puesto no encontrado' });
    await position.update(req.body);
    res.json(position);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    const position = await Position.findByPk(req.params.id);
    if (!position) return res.status(404).json({ error: 'Puesto no encontrado' });

    const count = await Employee.count({ where: { positionId: position.id } });
    if (count > 0) return res.status(400).json({ error: 'No se puede eliminar: existen empleados con este puesto' });

    await position.destroy();
    res.json({ message: 'Position eliminada' });
  } catch (err) { next(err); }
};
