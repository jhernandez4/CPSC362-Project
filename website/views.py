from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Note
from . import db
import json

# URLs defined here
views = Blueprint('views', __name__)

#Runs when we go to / homepage
@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    # # username = session.get('username')
    # if request.method == 'POST':
    #     note = request.form.get('note')

    #     if len(note) < 1:
    #         flash('Note is too short!', category='error')
    #     else:
    #         new_note = Note(data=note, user_id=current_user.id)
    #         db.session.add(new_note)
    #         db.session.commit()
    #         flash('Note added!', category='success')

    return render_template("home.html",user=current_user)

@views.route('/add-note', methods=['POST'])
def add_note():
    data = json.loads(request.data)
    new_note_data = data.get('noteData')
    user_id = current_user.id

    new_note = Note(data=new_note_data, user_id=current_user.id)
    db.session.add(new_note)
    db.session.commit()

    return jsonify({'noteId': new_note.id})


@views.route('/delete-note', methods=['POST'])
def delete_note():
    note = json.loads(request.data)
    noteId = note['noteId']
    note = Note.query.get(noteId)

    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()
            return jsonify({})