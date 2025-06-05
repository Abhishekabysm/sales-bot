import sys
import os
from flask import Flask

# Add the backend directory to the Python path
current_dir = os.path.dirname(__file__)
backend_dir = os.path.join(current_dir, '..', 'backend')
sys.path.insert(0, backend_dir)

# Import after adding to path
from app import create_app

# Create the Flask app
app = create_app()

# Vercel serverless function handler
def handler(request):
    return app

# For development
if __name__ == '__main__':
    app.run(debug=True)
