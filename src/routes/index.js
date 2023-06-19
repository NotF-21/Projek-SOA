const {Router} = require("express");

const employeeRouter = require("./employees");
const userRouter = require("./users");
const discountRouter = require("./discounts");

const router = Router();

router.use("/employees", employeeRouter);
router.use("/users", userRouter);
router.use("/discounts", discountRouter);

module.exports = router;