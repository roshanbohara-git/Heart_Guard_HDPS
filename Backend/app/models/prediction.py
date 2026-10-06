from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class HeartDiseasePrediction(Base):
    __tablename__ = "heart_predictions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    age = Column(Integer, nullable=False)
    sex = Column(String(10), nullable=False)
    chest_pain_type = Column(String(10), nullable=False)
    resting_bp = Column(Integer, nullable=False)
    cholesterol = Column(Integer, nullable=False)
    fasting_bs = Column(Integer, nullable=False)
    resting_ecg = Column(String(20), nullable=False)
    max_hr = Column(Integer, nullable=False)
    exercise_angina = Column(String(10), nullable=False)
    oldpeak = Column(Float, nullable=False)
    st_slope = Column(String(20), nullable=False)

    prediction = Column(String(50), nullable=False)
    probability = Column(Float, nullable=False)
    risk_level = Column(String(20), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User")