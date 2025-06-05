import sys
import os

# Add the backend directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from backend.app import create_app

# Create the Flask app
app = create_app()

# For Vercel serverless functions
def handler(event, context):
    return app

# Export the app for Vercel
if __name__ == '__main__':
    app.run()
