const express = require("express");
const router = express.Router();
const NotesController = require("../controllers/notesControllers");

router.get("/notes", NotesController.getAllNotes);
router.post("/notes", NotesController.createNote);
router.put("/notes/:id", NotesController.updateNote);
router.delete("/notes/:id", NotesController.deleteNote);

module.exports = router;
