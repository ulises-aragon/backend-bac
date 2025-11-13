const express = require("express");
const { body, param, query } = require("express-validator");
const controller = require("../controllers/salaryRecordController");
const { handleValidation } = require("./validations");

const router = express.Router();

router.get("/",
  query("employeeId").optional().isInt().withMessage("employeeId debe ser entero"),
  query("contractId").optional().isInt().withMessage("contractId debe ser entero"),
  query("period").optional().isString(),
  handleValidation,
  controller.list
);

router.get("/:id",
  param("id").isInt().withMessage("id debe ser entero"),
  handleValidation,
  controller.get
);

router.post("/",
  body("employeeId").isInt().withMessage("employeeId es requerido y debe ser entero"),
  body("contractId").optional().isInt().withMessage("contractId debe ser entero"),
  body("period").isString().withMessage("period es requerido (ej: 2025-11)"),
  body("baseSalary").isDecimal().withMessage("baseSalary requerido y debe ser decimal"),
  body("bonus").optional().isDecimal(),
  body("deductions").optional().isDecimal(),
  body("paymentDate").optional().isISO8601().withMessage("paymentDate debe ser YYYY-MM-DD"),
  handleValidation,
  controller.create
);

router.put("/:id",
  param("id").isInt().withMessage("id debe ser entero"),
  body("employeeId").optional().isInt(),
  body("contractId").optional().isInt(),
  body("period").optional().isString(),
  body("baseSalary").optional().isDecimal(),
  body("bonus").optional().isDecimal(),
  body("deductions").optional().isDecimal(),
  body("paymentDate").optional().isISO8601(),
  handleValidation,
  controller.update
);

router.delete("/:id",
  param("id").isInt().withMessage("id debe ser entero"),
  handleValidation,
  controller.delete
);

module.exports = router;
