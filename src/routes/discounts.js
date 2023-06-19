const { Router } = require("express");
const DiscountController= require("../controllers/DiscountController");
const router = Router();

router.get("/list", DiscountController.getAll);
router.post("/add", DiscountController.addDiscount);
router.put("/update/:id", DiscountController.updateDiscount);

module.exports = router;