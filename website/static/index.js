function toggleStrikeThru(checkbox, noteId){
     // Traverse the DOM to find the parent li element
     let listItem = checkbox.closest('li');

     // Get the text element inside the li element
     let textElement = listItem.querySelector('.text-break');
 
      // Toggle the 'strikethrough' class based on the checkbox state
    if (checkbox.checked) {
        textElement.classList.add('strikethrough');
    } else {
        textElement.classList.remove('strikethrough');
    }

    // Send an AJAX request to update the is_checked field in the database
    fetch(`/update_checkbox/${noteId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            checked: checkbox.checked,
        }),
    });
}


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
        checkBox.onchange = function() {
            toggleStrikeThru(this, newNoteId);
        }

        let newNoteElement = document.createElement('li');
        newNoteElement.className = 'list-group-item note';
        newNoteElement.id = newNoteId;
        // newNoteElement.innerHTML = noteData;

       newNote = document.createElement('div')
       newNote.className = 'text-break';
       newNote.innerHTML = noteData;

        newNoteElement.appendChild(checkBox);
        // newNoteElement.appendChild(document.createTextNode(noteData));
        newNoteElement.appendChild(newNote)
        
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


document.addEventListener("DOMContentLoaded", function () {
    let editableInput = document.getElementById("title-note");

    // Toggle readonly on double-click
    editableInput.addEventListener("dblclick", function () {
        editableInput.readOnly = !editableInput.readOnly;
    });

    // Add readonly on Enter key press
    editableInput.addEventListener("keypress", function (e) {
        let titleData = document.getElementById('title-note').value;
        if (e.key === "Enter" || e.keyCode === 13) {
            // 13 is the keycode for Enter
            editableInput.readOnly = true;
            fetch(`/save_title`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: titleData
                }),
            }).then(response => response.json())  // Parse the JSON response
            .then(data => {
                existing_title = data.title;
                editableInput.value = existing_title;  // Set the value of the input field
            })
        }
    });
});