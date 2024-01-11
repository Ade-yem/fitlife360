import datetime
from flask import g, abort
import jwt
from os import getenv
from models import storage
from models.user import User

class Authentication:
    """Authentication class"""
    def verify_user(self, user_id: str):
        """Implement user verification logic"""
        user = storage.get(User, user_id)
        if not user:
            abort(401, 'Unauthorized user')
        g.user = user
        return

    @staticmethod
    def decode_auth_token(auth_token) -> str:
        """
        Decodes the auth token
        @param auth_token: the authentication token
        return: integer|string
        """
        
        try:
            payload = jwt.decode(auth_token, getenv('SECRET_KEY'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            raise jwt.ExpiredSignatureError('Signature expired. Please log in again.')
        except jwt.InvalidTokenError:
            raise jwt.InvalidTokenError('Invalid token. Please log in again.')

    def encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=3),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                getenv('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e
