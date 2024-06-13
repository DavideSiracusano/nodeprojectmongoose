const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  //associare un corso ad un`università
  universities: [
    {
      universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
        required: true,
      },
      universityName: {
        type: String,
        required: true,
      },
      _id: false,
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
