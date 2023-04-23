const Data = require("../models/Data");
const Staff = require("../models/Staff");

const saveData = (req, res) => {
  console.log(req.body);
  const data = new Data(req.body);
  const staffdata = new Staff({
    name: req.body.name,
    designation: req.body.designation,
    qualification: req.body.qualification,
  });
  staffdata
    .save()
    .then((result) => {
      console.log(result);
      data.technicalStaff = result._id;
      data
        .save({
          upsert: true,
        })
        .then((result) => {
          res.json({ message: "Data saved successfully" });
        });
    })
    .catch((err) => {
      res.json({ message: "Error while saving data" });
    });
};

const getData = async (req, res) => {
  const data = await Data.find().populate("technicalStaff");
  res.json(data);
};

const deleteData = async (req, res) => {
  try {
    console.log(req.params.id);
    const delData = await Data.findByIdAndDelete(req.params.id);
    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    res.json({ message: "Error while deleting data" });
  }
};

const updateData = async (req, res) => {
  try {
    console.log(req.params.id);
    await Data.findByIdAndUpdate(req.params.id, req.body);
    res.json({ updated: 1 });
  } catch (err) {
    res.json({ message: "Error while updating data" });
  }
};

module.exports = {
  saveData,
  deleteData,
  updateData,
  getData,
};
