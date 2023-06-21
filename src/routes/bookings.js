const { Router } = require("express");
const bookingController = require("../controllers/BookingController");
const router = Router();

const validateManager = require("../middlewares/validateManager");

router.get("/list", validateManager ,bookingController.getEvents);
router.post("/add-event", validateManager, bookingController.addEvent);
router.put("/update/:id", validateManager, bookingController.updateEvent);

module.exports = router;