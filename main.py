from website import create_app


app = create_app()

# Only execute this line when file is running
if __name__ == '__main__':
    app.run(debug=True)