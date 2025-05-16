const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({

    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
},{
    timestamps: true,
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;