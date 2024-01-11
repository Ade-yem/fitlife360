#!/usr/bin/python3
""" User model"""

from models.base import BaseModel
from sqlalchemy import CheckConstraint, Column, Integer, String
from sqlalchemy.orm import relationship
from bcrypt import hashpw, gensalt


class User(BaseModel):
    """Representation of a user """
    __tablename__ = 'users'
    picture = Column(String(255))
    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(128), nullable=False)
    name = Column(String(128), nullable=True)
    phone = Column(String(20))
    gender = Column(String(60), CheckConstraint(
        "gender IN ('male', 'female')"), nullable=False)
    age = Column(Integer)
    role = Column(String(50), CheckConstraint(
        "role IN ('member', 'trainer', 'admin' )"))
    user_profile = relationship('UserProfile', backref='user', uselist=False)
    trainer_profile = relationship('TrainerProfile', backref='user', uselist=False)
    

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with bcrypt encryption"""
        if name == "password":
            value = hashpw(value.encode('utf-8'), gensalt())
        super().__setattr__(name, value)
