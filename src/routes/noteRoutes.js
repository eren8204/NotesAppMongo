const express = require('express');
const { createNote,getNote,getNotes,updateNote,deleteNote } = require('../controllers/noteController');
const noteRouter = express.Router();
const auth = require('../middlewares/auth');

noteRouter.post("/createNote",auth,createNote);
noteRouter.post("/getAllNotes",auth, getNotes);
noteRouter.post("/updateNote",auth, updateNote);
noteRouter.post("/deleteNote",auth, deleteNote);

module.exports = noteRouter;