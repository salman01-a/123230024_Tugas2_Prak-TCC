const notesService = require('../models/notesModels');

const getAllNotes = async (req, res) => {
    try {
        const notes = await notesService.getAllNotes();
        
        res.status(200).json({
            status: "success",
            data: notes
        });
    } catch (error) {

        res.status(500).json({ 
            status: "error", 
            message: error.message 
        });
    }
}

const createNote = async (req, res) => {
    try {
        const { judul, isi } = req.body;

        if (!judul || !isi) {
            return res.status(400).json({
                status: "fail",
                message: "Judul dan isi tidak boleh kosong"
            });
        }

        const newNote = await notesService.create({ judul, isi });
        
        res.status(201).json({
            status: "success",
            message: "Catatan berhasil ditambahkan",
            data: newNote
        });
    } catch (error) {
        res.status(500).json({ 
            status: "error", 
            message: error.message 
        });
    }
}


const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, isi } = req.body;
        
        const updatedNote = await notesService.update(id, { judul, isi });
        
        res.status(200).json({
            status: "success",
            message: "Catatan berhasil diperbarui",
            data: updatedNote
        });
    } catch (error) {
        if (error.message === "Note not found") {
            return res.status(404).json({ 
                status: "fail", 
                message: "Catatan tidak ditemukan" 
            });
        }
        res.status(500).json({ 
            status: "error", 
            message: error.message 
        });
    }
}


const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        
        await notesService.deleteNote(id);
        
        res.status(200).json({
            status: "success",
            message: "Catatan berhasil dihapus"
        });
    } catch (error) {
        if (error.message === "Note not found") {
            return res.status(404).json({ 
                status: "fail", 
                message: "Catatan tidak ditemukan" 
            });
        }
        res.status(500).json({ 
            status: "error", 
            message: error.message 
        });
    }
}

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote
}