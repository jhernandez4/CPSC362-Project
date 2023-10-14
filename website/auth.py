from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db

# URLs defined here
auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # user input can be email OR username
        user_input = request.form.get('email')
        password = request.form.get('password')
        
        user = get_user(user_input)
        
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                return redirect(url_for('views.home'))
            else:
                flash('Incorrect password!', category='error')
        else:
            flash('An account with this username or password does not exist', category='error')
    return render_template('login.html', text="Welcome to your daily activity reminder!")

@auth.route('/logout')
def logout():
    #return "<p>logout</p>"
    return render_template('logout.html')

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        username = request.form.get('username')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        user_by_email = get_user(email)
        user_by_name = get_user(username)
        if user_by_email:
            flash('An account with this email already exists!', category='error')
        elif user_by_name:
            flash('An account with this username already exists!', category='error')
        elif len(email) < 4:
            flash('Email must be greater than 3 characters.', category='error')
        elif len(username) < 3:
            flash('Username must be greater than 2 characters.', category='error')
        elif password1 != password2:
            flash('Passwords must match', category='error')
        elif len(password1) < 8:
            flash('Password must be at least 8 characters.', category='error')
        else:
            new_user = User(email=email, username=username, password=generate_password_hash(password1, method="sha256"))
            db.session.add(new_user)
            db.session.commit()
            flash('Account created!', category='success')
            return redirect(url_for('views.home'))
            
    return render_template('sign_up.html')

def has_at(email):
    for letter in email:
        if letter == '@':
            return True
        
#check if user is logging in 
def get_user(user_input):
    if has_at(user_input):
            user = User.query.filter_by(email=user_input).first()
    else:
            user = User.query.filter_by(username=user_input).first()
    return user