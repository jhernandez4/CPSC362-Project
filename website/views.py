from flask import Blueprint, render_template,session

# URLs defined here
views = Blueprint('views', __name__)

#Runs when we go to / homepage
@views.route('/')
def home():
    username = session.get('username')
    return render_template("home.html",username=username)

