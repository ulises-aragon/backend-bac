const express = require('express');
const { body, param } = require('express-validator');
const controller = require('../controllers/departmentController');
const { handleValidation } = require('./validations');
const router = express.Router();

router.get('/', controller.list);
router.get('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  handleValidation,
  controller.get
);


router.post('/',
  body('name').notEmpty().withMessage('name es requerido').isLength({ max: 100 }).withMessage('name muy largo'),
  handleValidation,
  controller.create
);

router.put('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  body('name').optional().notEmpty().withMessage('name no puede estar vacío').isLength({ max: 100 }).withMessage('name muy largo'),
  handleValidation,
  controller.update
);

router.delete('/:id',
  param('id').isInt().withMessage('id debe ser un entero'),
  handleValidation,
  controller.delete
);

module.exports = router;