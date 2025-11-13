const express = require('express');
const { body, param, query } = require('express-validator');
const controller = require('../controllers/evaluationController');
const { handleValidation } = require('./validations');

const router = express.Router();

router.get('/',
  // ?employeeId=1
  query('employeeId').optional().isInt().withMessage('employeeId debe ser entero'),
  handleValidation,
  controller.list
);

router.get('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  handleValidation,
  controller.get
);

router.post('/',
  body('employeeId').isInt().withMessage('employeeId es requerido y debe ser entero'),
  body('score').isInt({ min: 0, max: 100 }).withMessage('score requerido entre 0 y 100'),
  body('reviewer').optional().isLength({ max: 150 }).withMessage('reviewer muy largo'),
  body('comments').optional().isString(),
  body('date').optional().isISO8601().withMessage('date debe ser YYYY-MM-DD'),
  handleValidation,
  controller.create
);

router.put('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  body('employeeId').optional().isInt().withMessage('employeeId debe ser entero'),
  body('score').optional().isInt({ min: 0, max: 100 }).withMessage('score entre 0 y 100'),
  body('reviewer').optional().isLength({ max: 150 }).withMessage('reviewer muy largo'),
  body('comments').optional().isString(),
  body('date').optional().isISO8601().withMessage('date debe ser YYYY-MM-DD'),
  handleValidation,
  controller.update
);

router.delete('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  handleValidation,
  controller.delete
);

module.exports = router;
