const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
  name: String,
  designation: String,
  qualification: String,
});

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
