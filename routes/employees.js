// routes/employees.js
const express = require('express');
const { body, param, query } = require('express-validator');
const controller = require('../controllers/employeeController');
const { handleValidation } = require('./validations');

const router = express.Router();

router.get('/',
  query('page').optional().isInt({ min: 1 }).withMessage('page debe ser entero >= 1'),
  query('limit').optional().isInt({ min: 1 }).withMessage('limit debe ser entero >= 1'),
  query('search').optional().isString(),
  query('departmentId').optional().isInt().withMessage('departmentId debe ser entero'),
  query('positionId').optional().isInt().withMessage('positionId debe ser entero'),
  query('branchId').optional().isInt().withMessage('branchId debe ser entero'),
  handleValidation,
  controller.list
);

router.get('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  handleValidation,
  controller.get
);

router.post('/',
  body('name').notEmpty().withMessage('name es requerido').isLength({ max: 150 }).withMessage('name muy largo'),
  body('email').isEmail().withMessage('email inválido'),
  body('salary').optional().isDecimal().withMessage('salary debe ser decimal'),
  body('departmentId').optional().isInt().withMessage('departmentId debe ser entero'),
  body('positionId').optional().isInt().withMessage('positionId debe ser entero'),
  body('branchId').optional().isInt().withMessage('branchId debe ser entero'),
  handleValidation,
  controller.create
);

router.put('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  body('name').optional().notEmpty().withMessage('name no puede estar vacío'),
  body('email').optional().isEmail().withMessage('email inválido'),
  body('salary').optional().isDecimal().withMessage('salary debe ser decimal'),
  body('departmentId').optional().isInt().withMessage('departmentId debe ser entero'),
  body('positionId').optional().isInt().withMessage('positionId debe ser entero'),
  body('branchId').optional().isInt().withMessage('branchId debe ser entero'),
  handleValidation,
  controller.update
);

router.delete('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  handleValidation,
  controller.delete
);

module.exports = router;
