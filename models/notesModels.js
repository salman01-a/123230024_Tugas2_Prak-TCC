const Notes = require('../scheme/Notes');

const getAllNotes = async () => {
    return await Notes.findAll({
        attributes: ["id", "judul","isi" ,"tanggal_dibuat"],
    })
}
const create = async (data) => {
    return await Notes.create(data);
}

const update = async (id, data) => {
    const note = await Notes.findByPk(id);
    if (!note) {
        throw new Error("Note not found");
    }
    return await note.update(data);
}

const deleteNote = async (id) => {
    const note = await Notes.findByPk(id);
    if (!note) {
        throw new Error("Note not found");
    }
    return await note.destroy();
}

module.exports = {
    getAllNotes,
    create,
    update,
    deleteNote
}