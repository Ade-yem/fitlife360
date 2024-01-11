#!/usr/bin/python3
""" User model"""

from models.base import BaseModel, Base
from sqlalchemy import Column, ForeignKey, String, Float, Table
from sqlalchemy.orm import relationship

user_classes = Table('user_classes', Base.metadata,
                     Column('user_profile_id', String(60), ForeignKey('user_profiles.id')),
                     Column('class_id', String(60), ForeignKey('classes.id'))
                     )

class UserProfile(BaseModel):
    """User profile"""
    __tablename__ = 'user_profiles'
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    weight = Column(Float)
    height = Column(Float)
    classes = relationship(
        'Class', secondary=user_classes, back_populates='class_users')
    goals = relationship('Goal', backref='user_profile')
    workout_plans = relationship('WorkoutPlan', backref='user_profile')
