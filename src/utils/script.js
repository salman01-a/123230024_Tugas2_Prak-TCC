var baseUrl = 'https://tugas3-123230024-backend-73763759634.us-central1.run.app/';

async function fetchData() {
    try {
        const response = await fetch(baseUrl + 'api/notes');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        return  data.data ;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

async function createNote(title, note) {
    try {
        const response = await fetch(baseUrl + 'api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({judul: title, isi: note })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Create error:', error);
        throw error;
    }
}
async function updateNote(id, title,note) {
    try {
        const response = await fetch(baseUrl + `api/notes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ judul: title, isi: note })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Update error:', error);
        throw error;
    }
}
async function deleteNote(id) { 
    try {
        const response = await fetch(baseUrl + `api/notes/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Delete error:', error);
        throw error;
    }
}

export { fetchData, createNote, updateNote, deleteNote };   