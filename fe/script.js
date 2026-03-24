const API_URL = 'http://localhost:3000/api/notes'; 

const noteForm = document.getElementById('noteForm');
const notesContainer = document.getElementById('notesContainer');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

async function fetchNotes() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();

        const notes = result.data || result; 
        
        renderNotes(notes);
    } catch (error) {
        console.error('Gagal mengambil data catatan:', error);
    }
}

function renderNotes(notes) {
    notesContainer.innerHTML = ''; 

    notes.forEach(note => {
        const tanggal = new Date(note.tanggal_dibuat).toLocaleString('id-ID', {
            dateStyle: 'medium', timeStyle: 'short'
        });

        const card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <h3>${note.judul}</h3>
            <div class="note-date">${tanggal}</div>
            <div class="note-body">${note.isi}</div>
            <div class="actions">
                <button class="btn-edit" onclick="editNote(${note.id}, '${encodeURIComponent(note.judul)}', '${encodeURIComponent(note.isi)}')">Edit</button>
                <button class="btn-delete" onclick="deleteNote(${note.id})">Hapus</button>
            </div>
        `;
        notesContainer.appendChild(card);
    });
}

noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('noteId').value;
    const judul = document.getElementById('judul').value;
    const isi = document.getElementById('isi').value;

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul, isi })
        });

        resetForm();
        fetchNotes();
    } catch (error) {
        console.error('Gagal menyimpan catatan:', error);
    }
});

function editNote(id, encodedJudul, encodedIsi) {
    document.getElementById('noteId').value = id;
    document.getElementById('judul').value = decodeURIComponent(encodedJudul);
    document.getElementById('isi').value = decodeURIComponent(encodedIsi);
    
    saveBtn.textContent = 'Update Catatan';
    cancelBtn.style.display = 'inline-block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


async function deleteNote(id) {
    if (confirm('Apakah kamu yakin ingin menghapus catatan ini?')) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            fetchNotes();
        } catch (error) {
            console.error('Gagal menghapus catatan:', error);
        }
    }
}
window.resetForm = function() {
    document.getElementById('noteId').value = '';
    document.getElementById('judul').value = '';
    document.getElementById('isi').value = '';
    saveBtn.textContent = 'Simpan Catatan';
    cancelBtn.style.display = 'none';
}

fetchNotes();