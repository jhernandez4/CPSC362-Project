from flask import Blueprint, render_template,session
from flask_login import login_required, current_user
# URLs defined here
views = Blueprint('views', __name__)

#Runs when we go to / homepage
@views.route('/')
@login_required
def home():
    username = session.get('username')
    return render_template("home.html",user=current_user)

