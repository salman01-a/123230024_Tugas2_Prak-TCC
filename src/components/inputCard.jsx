import {useState} from "react";

export default function InputCard({title, note , setNote, setTitle, handleSubmit, isEdit, UpdateNote}) {

    const handleNoteChange = (e) => {
        setNote(e.target.value);
      };
    const handleJudulChange = (e) => {
        setTitle(e.target.value);
      }
       
    return (
       <>
        <div className="container" >
            <form action="" id="noteForm" >
                <div className="input-group">
                    <label htmlFor="judul">Judul</label>
                    <input type="text" id="judul" name="judul" required value={title} onChange={handleJudulChange}/>
                </div>
                <div className="input-group">
                    <label htmlFor="isi">Isi Catatan</label>
                    <textarea id="isi" name="isi" rows="5" required value={note} onChange={handleNoteChange}></textarea>
                </div>
                {isEdit ? (
    <button type="submit" onClick={(e) => { e.preventDefault(); UpdateNote(title, note); }}>
        Update Catatan
    </button>
) : (
    <button type="submit" onClick={(e) => { e.preventDefault(); handleSubmit(title, note); }}>
        Simpan Catatan
    </button>
)}
                {/* <button type="submit" onClick={() => handleSubmit(title, note)} >Simpan Catatan</button> */}
            </form>
        </div>
       </>
    );
}