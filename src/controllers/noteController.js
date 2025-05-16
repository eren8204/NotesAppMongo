const note = require('../models/note');

const createNote = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.userId;
    console.log(userId);
    if (!title || !description) {
        return res.status(400).json({ status: "false", message: "Please provide title and description" });
    }
    try {
        const newNote = await note({
            title: title,
            description: description,
            userId: userId,
        });
        await newNote.save();
        if (!newNote) {
            return res.status(400).json({ status: "false", message: "Note not created" });
        }
        res.status(201).json({ status: "success", message: "Note created successfully", note: newNote });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}
const updateNote = async (req, res) => {
    const { noteId, title, description} = req.body;
    const userId = req.userId;
    console.log(userId);
    if (!userId) {
        return res.status(400).json({ status: "false", message: "Please provide user ID" });
    }
    if (!title || !description || !noteId) {
        return res.status(400).json({ status: "false", message: "Please provide title, description and note ID" });
    }
    try {
        const updatedNote = await note.findByIdAndUpdate(noteId, {
            title,
            description,
            userId: userId,
        }, { new: true });
        res.status(200).json({ status: "success", message: "Note updated successfully", note: updatedNote });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}
const deleteNote = async (req, res) => {
    const { noteId } = req.body;
    const userId = req.userId;
    console.log(userId);
    if (!userId) {
        return res.status(400).json({ status: "false", message: "Please provide user ID" });
    }
    if (!noteId) {
        return res.status(400).json({ status: "false", message: "Please provide note ID" });
    }
    try {
        const deletedNote = await note.findByIdAndDelete(noteId);
        if (!deletedNote) {
            return res.status(404).json({ status: "false", message: "Note not found" });
        }
        res.status(202).json({ status: "success", message: "Note deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}
const getNotes = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(400).json({ status: "false", message: "Please provide user ID" });
    }
    console.log(userId);
    try {
        const notes = await note.find({ userId: userId });
        res.status(200).json({ status: "success", message: "Notes fetched successfully", notes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}
const getNote = async (req, res) => {
    const { noteId } = req.body;
    const userId = req.userId;
    if (!noteId) {
        return res.status(400).json({ status: "false", message: "Please provide note ID" });
    }
    try {
        const note = await note.findOne({ _id: noteId, user: userId });
        if (!note) {
            return res.status(404).json({ status: "false", message: "Note not found" });
        }
        res.status(200).json({ status: "success", message: "Note fetched successfully", note });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "false", message: "Internal server error" });
    }
}
module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes,
    getNote
}