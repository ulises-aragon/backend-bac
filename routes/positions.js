const express = require('express');
const { body, param } = require('express-validator');
const controller = require('../controllers/positionController');
const { handleValidation } = require('./validations');

const router = express.Router();

router.get('/', controller.list);

router.get('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  handleValidation,
  controller.get
);

router.post('/',
  body('title').notEmpty().withMessage('title es requerido').isLength({ max: 120 }).withMessage('title muy largo'),
  body('minSalary').optional().isDecimal().withMessage('minSalary debe ser decimal'),
  body('maxSalary').optional().isDecimal().withMessage('maxSalary debe ser decimal'),
  handleValidation,
  controller.create
);

router.put('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  body('title').optional().notEmpty().withMessage('title no puede estar vacío'),
  body('minSalary').optional().isDecimal().withMessage('minSalary debe ser decimal'),
  body('maxSalary').optional().isDecimal().withMessage('maxSalary debe ser decimal'),
  handleValidation,
  controller.update
);

router.delete('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  handleValidation,
  controller.delete
);

module.exports = router;
