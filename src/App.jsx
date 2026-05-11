import React from 'react'
import InputCard from './components/inputCard'
import { fetchData } from './utils/script' 
import NotesCardList from './components/notesCardList'
import { createNote, updateNote } from './utils/script'
function App() {
  const [notes, setNotes] = React.useState([])
  const [title, setTitle] = React.useState("")
  const [note, setNote] = React.useState("")
  const [isEdit, setIsEdit] = React.useState(false)
  const [id, setId] = React.useState(null)
  const loadNotes = async () => {
    // window.location.reload()
    try {
      const data = await fetchData()
      setNotes(data)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  React.useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchData()
        setNotes(data)
      } catch (error) {
        console.error('Error fetching notes:', error)
      }
    }
    loadNotes();
  }, []);

  const handleEdit = (id, title, notes)=>{
    setTitle(title)
    setNote(notes)
    setIsEdit(true)
    setId(id)
    console.log(id);
  }

  const UpdateNote = async (title, note) => {
    try {
      await updateNote(id,  title,  note )
      setIsEdit(false)
      setTitle("")
      setNote("")
      setId(null)
      loadNotes()
    } catch (error) {
      console.error('Error updating note:', error)
    }
  }

  const handleSubmit = async (judul, notes) => {
    try {
        await createNote(judul, notes);
        setNote("");
        setTitle("");
        loadNotes();
    } catch (error) {
        console.error("Gagal menyimpan:", error);
    }
}
  
  // console.log(notes)
 return <>
  <h1>Aplikasi Catatan</h1>
  
    <InputCard title = {title} setTitle={setTitle}  note={note} setNote={setNote} handleSubmit={handleSubmit} isEdit={isEdit} UpdateNote={UpdateNote}/>
    <NotesCardList notes = {notes} handleEdit= {handleEdit} />
 </>
}

export default App
