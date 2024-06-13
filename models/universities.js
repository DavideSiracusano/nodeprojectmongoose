const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const University = mongoose.model("University", universitySchema);

module.exports = University;
