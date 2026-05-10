// import React from 'react';
import { deleteNote } from '../utils/script';

export default function NotesCard({ id, title, content, dates, handleEdit }) {
    const handleDelete = async () => {
        try {
            await deleteNote(id);
            alert('Catatan berhasil dihapus');
            window.location.reload()
        } catch (error) {
            alert('Gagal menghapus catatan: ' + error.message);
        }
    }
    return (
        <div className="notes-card">
            <h2>{title}</h2>
            <p>{content}</p>
                <p className="note-date">{new Date(dates).toLocaleString('id-ID', {
                    dateStyle: 'medium', timeStyle: 'short'
                })}</p>
            <button onClick={() => handleEdit(id, title, content)}>
                Edit
            </button>
            <button onClick={handleDelete}>
                Hapus
            </button>
        </div>
    );
}