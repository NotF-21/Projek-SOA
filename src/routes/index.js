const {Router} = require("express");

const employeeRouter = require("./employees");
const userRouter = require("./users");

const router = Router();

router.use("/employees", employeeRouter);
router.use("/users", userRouter);

module.exports = router;