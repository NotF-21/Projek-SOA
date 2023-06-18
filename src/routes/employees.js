const { Router } = require("express");
const employeeController = require("../controllers/EmployeeController");
const router = Router();

router.get("/list", employeeController.getAll);
router.get("/search", employeeController.searchKaryawan);
router.put("/update", employeeController.updateKaryawan);
router.delete("/delete", employeeController.deleteKaryawan);

module.exports = router;