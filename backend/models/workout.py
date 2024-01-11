"""Workout Model"""

from sqlalchemy import Column, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from .base import BaseModel


class WorkoutPlan(BaseModel):
    __tablename__ = 'workout_plans'
    name = Column(String(255), nullable=False)
    user_profile_id = Column(
        String(255), ForeignKey('user_profiles.id'), nullable=False)
    description = Column(String(1000))
    plan_exercises = relationship('Exercise', backref='user_workout_plan')
