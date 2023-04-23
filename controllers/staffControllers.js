const Staff = require("../models/Staff");

const saveStaff = (req, res) => {
  const staff = new Staff(req.body);
  staff
    .save()
    .then((result) => {
      res.json({ message: "Staff saved successfully", staff: result });
    })
    .catch((err) => {
      res.json({ message: "Error while saving staff" });
    });
};

const getStaff = async (req, res) => {
  await Staff.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: "Error while getting staff" });
    });
};

const updateStaff = async (req, res) => {
  try {
    console.log(req.params.id);
    await Staff.findByIdAndUpdate(req.params.id, req.body);
    res.json({ updated: 1 });
  } catch (err) {
    res.json({ message: "Error while updating staff" });
  }
};

module.exports = {
  saveStaff,
  updateStaff,
  getStaff,
};
