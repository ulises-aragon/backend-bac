const express = require("express");
const { body, param, query } = require("express-validator");
const controller = require("../controllers/contractController");
const { handleValidation } = require("./validations");

const router = express.Router();

router.get("/", controller.list);

router.get("/:id",
  param("id").isInt().withMessage("id debe ser entero"),
  handleValidation,
  controller.get
);

router.post("/",
  body("employeeId").isInt().withMessage("employeeId es requerido y debe ser entero"),
  body("positionId").optional().isInt().withMessage("positionId debe ser entero"),
  body("startDate").isISO8601().withMessage("startDate debe ser YYYY-MM-DD"),
  body("endDate").optional().isISO8601().withMessage("endDate debe ser YYYY-MM-DD"),
  body("contractType").optional().isIn(["Indefinido","Temporal","Por Servicio","Prueba"]).withMessage("contractType inválido"),
  body("salaryRate").isDecimal().withMessage("salaryRate debe ser decimal"),
  body("status").optional().isIn(["Activo","Terminado","Suspendido"]).withMessage("status inválido"),
  handleValidation,
  controller.create
);

router.put("/:id",
  param("id").isInt().withMessage("id debe ser entero"),
  body("employeeId").optional().isInt(),
  body("positionId").optional().isInt(),
  body("startDate").optional().isISO8601(),
  body("endDate").optional().isISO8601(),
  body("salaryRate").optional().isDecimal(),
  handleValidation,
  controller.update
);

router.delete("/:id",
  param("id").isInt().withMessage("id debe ser entero"),
  handleValidation,
  controller.delete
);

module.exports = router;
