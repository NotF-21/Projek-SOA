const { Router } = require("express");
const userController = require("../controllers/UserController");
const router = Router();

router.get("/list", userController.getAll);

module.exports = router;