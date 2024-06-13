const express = require("express");
const connectDB = require("./mongoose");
const courseController = require("./controllers/coursesController");
const universityController = require("./controllers/universitiesController");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

connectDB();

// Rotte per i corsi
app.post("/courses", courseController.createCourse);
app.get("/courses", courseController.getCourses);
app.put("/courses/:id", courseController.updateCourse);
app.delete("/courses/:name", courseController.deleteCourse);

app.put(
  "/courses/:courseId/universities/:universityId",
  courseController.associateCourseToUniversity
);

// Rotte per le università
app.post("/universities", universityController.createUniversity);
app.get("/universities", universityController.getUniversities);
app.put("/universities/:id", universityController.updateUniversity);
app.delete("/universities/:name", universityController.deleteUniversity);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
