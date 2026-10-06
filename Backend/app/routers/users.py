from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.user import UserResponse
from app.schemas.prediction import PredictionHistoryResponse
from app.models.prediction import HeartDiseasePrediction
from app.utils_auth import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
def get_my_profile(current_user = Depends(get_current_user)):
    return current_user


@router.get("/my-predictions", response_model=list[PredictionHistoryResponse])
def get_my_predictions(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    predictions = db.query(HeartDiseasePrediction).filter(
        HeartDiseasePrediction.user_id == current_user.id
    ).order_by(HeartDiseasePrediction.created_at.desc()).all()

    return predictions