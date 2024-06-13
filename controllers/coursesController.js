const Course = require("../models/courses");
const University = require("../models/universities");

// Crea un nuovo corso
const createCourse = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Ottieni tutti i corsi
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Aggiorna un corso
const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Elimina un corso
const deleteCourse = async (req, res) => {
  try {
    const courseName = req.params.name;
    const deleteCourse = await Course.findOneAndDelete({ name: courseName });
    res.json({ message: "Course deleted", deleteCourse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const associateCourseToUniversity = async (req, res) => {
  const courseId = req.params.courseId; // ID del corso
  const universityId = req.params.universityId; // ID dell'ateneo da associare

  try {
    // Verifica se il corso e l'ateneo esistono
    const course = await Course.findById(courseId);
    const university = await University.findById(universityId);

    if (!course || !university) {
      return res
        .status(404)
        .json({ message: "Course or University not found" });
    }

    // Verifica se l'università è già associata al corso
    const isAlreadyAssociated = course.universities.some(
      (u) => String(u.universityId) === String(university._id)
    );
    if (isAlreadyAssociated) {
      return res
        .status(400)
        .json({ message: "University is already associated with the course" });
    }

    // Aggiungi l'ID dell'ateneo alla lista di università associate al corso
    course.universities.push({
      universityId: university._id,
      universityName: university.name,
    });
    await course.save();

    res.json({ message: "Course associated with University", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  associateCourseToUniversity,
};
