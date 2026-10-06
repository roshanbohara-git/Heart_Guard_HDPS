from pydantic import BaseModel, Field
from typing import Literal
from datetime import datetime


class HeartDiseaseInput(BaseModel):
    Age: int = Field(..., ge=1, le=120)
    Sex: Literal["M", "F"]
    ChestPainType: Literal["ATA", "NAP", "ASY", "TA"]
    RestingBP: int = Field(..., ge=50, le=250)
    Cholesterol: int = Field(..., ge=0, le=700)
    FastingBS: Literal[0, 1]
    RestingECG: Literal["Normal", "ST", "LVH"]
    MaxHR: int = Field(..., ge=60, le=250)
    ExerciseAngina: Literal["Y", "N"]
    Oldpeak: float = Field(..., ge=-10, le=10)
    ST_Slope: Literal["Up", "Flat", "Down"]


class PredictionResponse(BaseModel):
    prediction: str
    probability: float
    probability_percent: str
    risk_level: str


class PredictionHistoryResponse(BaseModel):
    id: int
    age: int
    sex: str
    chest_pain_type: str
    resting_bp: int
    cholesterol: int
    fasting_bs: int
    resting_ecg: str
    max_hr: int
    exercise_angina: str
    oldpeak: float
    st_slope: str
    prediction: str
    probability: float
    risk_level: str
    created_at: datetime

    class Config:
        from_attributes = True


class AdminDashboardStats(BaseModel):
    total_users: int
    total_predictions: int
    high_risk_predictions: int