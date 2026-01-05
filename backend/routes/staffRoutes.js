const express = require("express");
const router = express.Router();

const staffController = require("../controllers/staffController");
const { validateStaff } = require("../validation/staffValidation");
const upload = require("../middleware/upload");

/* ============================
   CREATE STAFF
============================ */
router.post(
  "/",
  upload.single("photo"),   // 1️⃣ handle file
  validateStaff,            // 2️⃣ validate fields
  staffController.createStaff
);

/* ============================
   UPDATE STAFF
============================ */
router.put(
  "/:id",
  upload.single("photo"),   // 1️⃣ handle file
  validateStaff,            // 2️⃣ validate fields
  staffController.updateStaff
);

/* ============================
   READ
============================ */
router.get("/", staffController.getStaff);
router.get("/:id", staffController.getStaffById);

/* ============================
   DELETE
============================ */
router.delete("/:id", staffController.deleteStaff);

module.exports = router;
