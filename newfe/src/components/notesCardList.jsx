import NotesCard from "./notesCard";


export default function NotesCardList ({ notes, handleEdit })  {
        return (
            <div className="notes-card-list">
                {notes.map(note => (
                    <NotesCard key={note.id} id={note.id} title={note.judul} content={note.isi} dates= {note.tanggal_dibuat} handleEdit={handleEdit} />
                ))}
            </div>
        );
}