from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.dependencies import get_db
from app.models.user import User
from app.models.prediction import HeartDiseasePrediction
from app.schemas.user import UserResponse
from app.schemas.prediction import PredictionHistoryResponse, AdminDashboardStats
from app.utils_auth import get_current_admin

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/users", response_model=list[UserResponse])
def get_all_users(
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin)
):
    return db.query(User).order_by(User.created_at.desc()).all()


@router.get("/predictions", response_model=list[PredictionHistoryResponse])
def get_all_predictions(
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin)
):
    return db.query(HeartDiseasePrediction).order_by(
        HeartDiseasePrediction.created_at.desc()
    ).all()


@router.get("/dashboard-stats", response_model=AdminDashboardStats)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin)
):
    total_users = db.query(func.count(User.id)).scalar()
    total_predictions = db.query(func.count(HeartDiseasePrediction.id)).scalar()
    high_risk_predictions = db.query(func.count(HeartDiseasePrediction.id)).filter(
        HeartDiseasePrediction.risk_level == "High"
    ).scalar()

    return {
        "total_users": total_users,
        "total_predictions": total_predictions,
        "high_risk_predictions": high_risk_predictions
    }


@router.get("/users/{user_id}/predictions", response_model=list[PredictionHistoryResponse])
def get_predictions_by_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    predictions = db.query(HeartDiseasePrediction).filter(
        HeartDiseasePrediction.user_id == user_id
    ).order_by(HeartDiseasePrediction.created_at.desc()).all()

    return predictions