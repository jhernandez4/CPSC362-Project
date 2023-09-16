from flask import Blueprint, render_template

# URLs defined here
views = Blueprint('views', __name__)

#Runs when we go to / homepage
@views.route('/')
def home():
    return render_template("home.html")

