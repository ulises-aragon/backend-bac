const express = require('express');
const { body, param } = require('express-validator');
const controller = require('../controllers/branchController');
const { handleValidation } = require('./validations');

const router = express.Router();

router.get('/', controller.list);

router.get('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  handleValidation,
  controller.get
);

router.post('/',
  body('name').notEmpty().withMessage('name es requerido').isLength({ max: 150 }).withMessage('name muy largo'),
  body('address').optional().isLength({ max: 250 }).withMessage('address muy largo'),
  handleValidation,
  controller.create
);

router.put('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  body('name').optional().notEmpty().withMessage('name no puede estar vacío'),
  body('address').optional().isLength({ max: 250 }).withMessage('address muy largo'),
  handleValidation,
  controller.update
);

router.delete('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  handleValidation,
  controller.delete
);

module.exports = router;
