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

const getStaff = (req, res) => {
  Staff.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: "Error while getting staff" });
    });
};

module.exports = {
  saveStaff,
  getStaff,
};
