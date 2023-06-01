const {Router} = require("express");

const userRouter = require("../routes/users");

const router = Router();

router.use("/employees", userRouter);

module.exports = router;