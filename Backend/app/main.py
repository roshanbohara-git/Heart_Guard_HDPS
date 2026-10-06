from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import User, HeartDiseasePrediction
from app.routers import auth, users, predictions, admin
from app.core.model_loader import load_model

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Heart Disease Prediction System API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    load_model()


@app.get("/")
def root():
    return {
        "message": "Heart Disease Prediction System API is running."
    }


app.include_router(auth.router)
app.include_router(users.router)
app.include_router(predictions.router)
app.include_router(admin.router)