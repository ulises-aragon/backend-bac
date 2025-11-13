const { Evaluation, Employee } = require('../models/relations');

exports.list = async (req, res, next) => {
  try {
    // ?employeeId= filter
    const where = {};
    if (req.query.employeeId) where.employeeId = req.query.employeeId;
    const rows = await Evaluation.findAll({ where, order: [['date', 'DESC']] });
    res.json(rows);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findByPk(req.params.id);
    if (!evaluation) return res.status(404).json({ error: 'Evaluación no encontrada' });
    res.json(evaluation);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { employeeId, score, reviewer, comments, date } = req.body;
    if (!employeeId || typeof score === 'undefined') return res.status(400).json({ error: 'employeeId y score son requeridos' });

    const employee = await Employee.findByPk(employeeId);
    if (!employee) return res.status(400).json({ error: 'Empleado no existe' });

    const newEvaluation = await Evaluation.create({ employeeId, score, reviewer, comments, date });
    res.status(201).json(newEvaluation);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findByPk(req.params.id);
    if (!evaluation) return res.status(404).json({ error: 'Evaluación no encontrada' });

    if (req.body.employeeId) {
      const emp = await Employee.findByPk(req.body.employeeId);
      if (!emp) return res.status(400).json({ error: 'Empleado nuevo no existe' });
    }

    await evaluation.update(req.body);
    res.json(evaluation);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findByPk(req.params.id);
    if (!evaluation) return res.status(404).json({ error: 'Evaluación no encontrada' });
    await evaluation.destroy();
    res.json({ message: 'Evaluación eliminada' });
  } catch (err) { next(err); }
};
