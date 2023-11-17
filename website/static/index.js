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

function addNote(){
    let noteData = document.getElementById('note').value;

    if (noteData != ''){
    fetch("/add-note" , {
        method: "POST",
        body: JSON.stringify({noteData: noteData}),
    }).then(response => {
        if(response.ok) {
            return response.json();
        }
        else{
            console.error('Failed to add note:', response.status, response.statusText);
        }
    }).then(data => {
        let newNoteId = data.noteId;
        
        let checkBox = document.createElement('input');
        checkBox.className = 'form-check-input';
        checkBox.type = 'checkbox';
        checkBox.value = '';

        let newNoteElement = document.createElement('li');
        newNoteElement.className = 'list-group-item note';
        newNoteElement.id = newNoteId;
        // newNoteElement.innerHTML = noteData;

        newNoteElement.appendChild(checkBox);
        newNoteElement.appendChild(document.createTextNode(noteData));
        
        // Add a delete button
        let deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'close';
        deleteButton.innerHTML = '<span aria-hidden="true">&times;</span>';
        deleteButton.onclick = function() {
            deleteNote(newNoteId);
        };

        
        newNoteElement.appendChild(deleteButton);

        // Add the new note to the existing list
        document.getElementById('notes').appendChild(newNoteElement);

        document.getElementById('note').value = "";
    }).catch(error => {
        console.error('Error adding note:', error);
    });
}
}