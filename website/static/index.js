function deleteNote(noteId) {
    fetch("/delete-note", {
        method: "POST",
        body: JSON.stringify({ noteId: noteId}),
    }).then(response => {
        if (response.ok) {
            // Note successfully deleted, update the UI accordingly
            document.getElementById(noteId).remove();

        } else {
            // Handle error cases if needed
            console.error('Failed to delete note:', response.status, response.statusText);
        }
    }).catch(error => {
        console.error('Error deleting note:', error);
    })
}