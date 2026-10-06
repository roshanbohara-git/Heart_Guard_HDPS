import joblib
from app.config import settings

model_pipeline = None


def load_model():
    global model_pipeline
    if model_pipeline is None:
        model_pipeline = joblib.load(settings.MODEL_PATH)
    return model_pipeline