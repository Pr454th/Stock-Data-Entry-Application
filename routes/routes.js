const express = require("express");
const router = express.Router();
const {
  saveData,
  deleteData,
  getData,
} = require("../controllers/dataControllers");
const { saveStaff, getStaff } = require("../controllers/staffControllers");

router.route("/").get(getData).post(saveData);
router.route("/:id").delete(deleteData);
router.route("/staff").get(getStaff).post(saveStaff);

module.exports = router;
