from flask import Blueprint, render_template, request

# URLs defined here
auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    data = request.form
    return render_template('login.html', text="Welcome to your daily activity reminder!!")

@auth.route('/logout')
def logout():
    #return "<p>logout</p>"
    return render_template('logout.html')

@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    return render_template('sign_up.html')

