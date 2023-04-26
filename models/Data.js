const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  labName: String,
  studentPerSetup: Number,
  oddHours: Number,
  evenHours: Number,
  equipmentName: Array,
  utilizationStatusOdd: Array,
  utilizationStatusEven: Array,
  technicalStaff: {
    ref: "Staff",
    type: Schema.Types.ObjectId,
    default: null,
  },
});

const Data = mongoose.model("Data", DataSchema);

module.exports = Data;
