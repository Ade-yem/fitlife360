"""Authentication views"""

import datetime
from flask import request, abort, jsonify, make_response, g
from views import app_views
from models import storage
from models.trainer_profile import TrainerProfile
from models.user_profile import UserProfile
from models.user import User
from bcrypt import checkpw
from utils import save_image
from app import auth

# Login
@app_views.route('/login', methods=['POST', 'GET'], strict_slashes=False)
def login() -> str:
    """User login"""
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Not a json'}), 401)
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return make_response(jsonify({'error': 'Missing credentials'}), 401)
    # get the user
    user = storage.get_by(User, 'email', email)
    if not user:
        return make_response(jsonify({'error': 'User does not exist'}), 401)
    if not checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return make_response(jsonify({'error': 'Invalid credentials'}), 401)
    token = auth.encode_auth_token(user.id)
    response = make_response(
        jsonify({'message': 'User login successful',
                 'name': user.name, 'role': user.role}), 200)
    time = datetime.datetime.utcnow() + datetime.timedelta(days=3)
    response.set_cookie('auth_token', token, expires=time, httponly=True, secure=True, domain='http://localhost:5000', path='/')
    return response


@app_views.route('/register', methods=['POST'], strict_slashes=False)
def user_register() -> str:
    """User registration"""
    data = request.form()
    name = data.get('name')
    email = data.get('email')
    gender = data.get('gender')
    phone = data.get('phone')
    password = data.get('password')
    age = data.get('age')
    if not name or not email or not gender or not password or not phone:
        return make_response(jsonify({'error': 'Missing credentials'}), 401)
    # check for user
    user = storage.get_by(User, 'email', email)
    if user:
        return make_response(jsonify({'error': 'User exists'}), 401)
    gender = gender.lower()
    picture = request.files['picture']
    if not picture:
        abort(400, description="No picture provided")
    picture_url = save_image(picture, user.id)
    kwargs = {
        'name': name,
        'email': email,
        'gender': gender,
        'phone': phone,
        'age': age,
        'password': password,
        'picture': picture_url
    }
    user = User(**kwargs)
    user.save()
    token = auth.encode_auth_token(user.id)
    response = make_response(
        jsonify({'message': 'User created successfully',
                 'name': user.name}), 201)
    time = datetime.datetime.utcnow() + datetime.timedelta(days=3)
    response.set_cookie("auth_token", token, expires=time, httponly=True, secure=True, domain='http://localhost:5000', path='/')


@app_views.route('/role', methods=['POST'], strict_slashes=False)
def roles():
    """sets user role to trainer or member"""
    data = request.get_json()
    if not data:
        abort(401)
    roles = data.get('role')
    if roles not in ['member', 'trainer', 'admin']:
        abort(401)
    user = g.user
    if roles == 'member':
        user.role = 'member'
    elif roles == 'trainer':
        user.role = 'trainer'
    user.save()
    return make_response(
        jsonify({'message': 'User role successful'}), 201)


# trainer creation
@app_views.route('/trainer/create_profile',
                 methods=['POST'], strict_slashes=False)
def create_trainer() -> str:
    """trainer profile creation"""
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Not a json'}), 401)
    user = g.user
    kwargs = {
        'user_id': user.id,
        'bio': data.get('bio'),
        'approaches': data.get('approaches'),
        'specializations': data.get('specializations'),
        'experience': data.get('experience'),
    }
    profile = TrainerProfile(**kwargs)
    profile.save()
    setattr(user, 'trainer_profile', profile)
    storage.save() 
    return make_response(
        jsonify({'message': 'Trainer profile creation successful',
                 'name': user.name, 'role': user.role}), 201)


# member profile creation
@app_views.route('/member/create_profile',
                 methods=['POST'], strict_slashes=False)
def create_member() -> str:
    """Member profile"""
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Not a json'}), 400)
    user = g.user
    if not user:
        return make_response(jsonify({'error': 'user not found'}), 401)
    
    kwargs = {
        'user_id': user.id,
        'weight': data.get('weight'),
        'height': data.get('height'),
    }
    profile = UserProfile(**kwargs)
    profile.save()
    user.user_profile = profile
    storage.save() 
    return make_response(
        jsonify({'message': 'Member profile creation successful',
                 'name': user.name, 'role': user.role}), 201)


@app_views.route('/logout', strict_slashes=False, methods=['POST'])
def logout():
    """logs out the user and delete the token on redis"""
    response = make_response(jsonify({'message': 'Logged out successfully'}), 201)
    response.delete_cookie('auth_token', path='/', domain='http://localhost:5000', secure=True, httponly=True)
    return response


@app_views.route('/status', strict_slashes=False, methods=['GET'])
def auth_status():
    """logs out the user and delete the token on redis"""
    user = g.user
    return make_response(
        jsonify({'message': 'User login successful',
                 'name': user.name, 'role': user.role}), 200)