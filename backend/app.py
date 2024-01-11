#!/usr/bin/env python3
"""Flask engine"""

from models import storage
from flask import Flask, jsonify, make_response, request, g
from flask_cors import CORS
from views import app_views
from utils.auth import Authentication
from os import getenv

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.register_blueprint(app_views)

ALLOWED_ROUTES = ['/api/login', '/api/register', '/api/classes', '/api/trainers']
secret_key = getenv('SECRET_KEY')
auth = Authentication()


@app.teardown_appcontext
def teardown_db(exception):
    """teardown"""
    storage.close()


@app.before_request
def before_request_func() -> None:
    """before request"""
    if request.path not in ALLOWED_ROUTES:
          token = request.cookies.get("auth_token")
          if not token:
                return make_response(jsonify({'error': "Unauthorized"}), 401)
          try:
              user_id = auth.decode_auth_token(token)
              auth.verify_user(user_id)
              return None
          except Exception as e:
              return make_response(jsonify({'error': e}), 401)    


@app.route('/', strict_slashes=False)
def index() -> str:
    """index route"""
    return 'FitLife360'


@app.errorhandler(401)
def unauthorized(error):
    """ 401 Error
    ---
    responses:
      401:
        description: Unauthorized request
    """
    return make_response(jsonify({'error': "Unauthorized"}), 401)


@app.errorhandler(403)
def forbidden(error):
    """ 403 Error
    ---
    responses:
      403:
        description: Forbidden request
    """
    return make_response(jsonify({'error': "Forbidden"}), 403)


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)
