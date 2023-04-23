const express = require("express");
const router = express.Router();
const {
  saveData,
  deleteData,
  updateData,
  getData,
} = require("../controllers/dataControllers");
const {
  saveStaff,
  updateStaff,
  getStaff,
} = require("../controllers/staffControllers");

router.route("/").get(getData).post(saveData);
router.route("/:id").delete(deleteData).put(updateData);
router.route("/staff").get(getStaff).post(saveStaff);
router.route("/staff/:id").put(updateStaff);

module.exports = router;
