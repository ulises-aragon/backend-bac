const express = require("express");
const router = express.Router();

const departmentRoutes = require("./departments");
const positionRoutes = require("./positions");
const branchRoutes = require("./branches");
const evaluationRoutes = require("./evaluations");
const employeeRoutes = require("./employees");
const contractRoutes = require("./contracts");
const salaryRoutes = require("./salaries");

router.use("/departments", departmentRoutes);
router.use("/positions", positionRoutes);
router.use("/branches", branchRoutes);
router.use("/evaluations", evaluationRoutes);
router.use("/employees", employeeRoutes);
router.use("/contracts", contractRoutes);
router.use("/salaries", salaryRoutes);

module.exports = router;