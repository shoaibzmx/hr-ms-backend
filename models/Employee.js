const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String, required: true },
  joiningDate: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
