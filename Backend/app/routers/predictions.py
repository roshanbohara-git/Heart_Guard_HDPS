import pandas as pd
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.prediction import HeartDiseaseInput, PredictionResponse
from app.models.prediction import HeartDiseasePrediction
from app.core.model_loader import load_model
from app.utils_auth import get_current_user

router = APIRouter(prefix="/predictions", tags=["Predictions"])


@router.post("/", response_model=PredictionResponse)
def predict_heart_disease(
    data: HeartDiseaseInput,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        model = load_model()
        input_df = pd.DataFrame([data.model_dump()])

        prediction = int(model.predict(input_df)[0])
        probability = float(model.predict_proba(input_df)[0][1])

        result_label = "Heart Disease" if prediction == 1 else "Normal"

        if probability >= 0.75:
            risk_level = "High"
        elif probability >= 0.40:
            risk_level = "Moderate"
        else:
            risk_level = "Low"

        db_record = HeartDiseasePrediction(
            user_id=current_user.id,
            age=data.Age,
            sex=data.Sex,
            chest_pain_type=data.ChestPainType,
            resting_bp=data.RestingBP,
            cholesterol=data.Cholesterol,
            fasting_bs=data.FastingBS,
            resting_ecg=data.RestingECG,
            max_hr=data.MaxHR,
            exercise_angina=data.ExerciseAngina,
            oldpeak=data.Oldpeak,
            st_slope=data.ST_Slope,
            prediction=result_label,
            probability=probability,
            risk_level=risk_level
        )

        db.add(db_record)
        db.commit()
        db.refresh(db_record)

        return {
            "prediction": result_label,
            "probability": round(probability, 4),
            "probability_percent": f"{probability * 100:.2f}%",
            "risk_level": risk_level
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")