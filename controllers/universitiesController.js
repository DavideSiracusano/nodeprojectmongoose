const University = require("../models/universities");

// Crea una nuova università
const createUniversity = async (req, res) => {
  try {
    const newUniversity = new University(req.body);
    const savedUniversity = await newUniversity.save();
    res.status(201).json(savedUniversity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Ottieni tutte le università
const getUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.json(universities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Aggiorna un'università
const updateUniversity = async (req, res) => {
  try {
    const updatedUniversity = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUniversity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Elimina un'università
const deleteUniversity = async (req, res) => {
  try {
    const universityName = req.params.name;
    const deleteUniversity = await University.findOneAndDelete({
      name: universityName,
    });
    res.json({ message: "University deleted", deleteUniversity });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUniversity,
  getUniversities,
  updateUniversity,
  deleteUniversity,
};
