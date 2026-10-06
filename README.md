# HeartGuard — Intelligent Heart Disease Prediction System (FYP)

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.3%2B-F7931E?style=flat&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-Academic%20FYP-lightgrey.svg)](#disclaimer)

**HeartGuard** is a full-stack, machine learning-driven web application developed as a Final Year Project (FYP). The platform assists users and healthcare professionals in assessing patient risk of cardiovascular disease using 11 key clinical biomarkers. Powered by a high-performing **Random Forest Classifier** trained on the unified 918-record Heart Disease dataset, HeartGuard provides instant risk classification (Low, Moderate, High), statistical confidence scores, patient history tracking, and role-based administrative monitoring.

---

## Table of Contents

1. [Key Features](#key-features)
2. [System Architecture](#system-architecture)
3. [Machine Learning Pipeline & Metrics](#machine-learning-pipeline--metrics)
4. [Technology Stack](#technology-stack)
5. [Directory Structure](#directory-structure)
6. [Prerequisites & System Requirements](#prerequisites--system-requirements)
7. [Installation & Setup Guide](#installation--setup-guide)
   - [Step 1: Clone or Copy Project](#step-1-clone-or-copy-project)
   - [Step 2: Database Initialization](#step-2-database-initialization)
   - [Step 3: Backend Setup & Environment Variables](#step-3-backend-setup--environment-variables)
   - [Step 4: Frontend Installation](#step-4-frontend-installation)
8. [Running the Application](#running-the-application)
9. [User Roles & Walkthrough](#user-roles--walkthrough)
10. [REST API Documentation](#rest-api-documentation)
11. [Database Schema](#database-schema)
12. [Troubleshooting & Common Issues](#troubleshooting--common-issues)
13. [Academic Disclaimer](#academic-disclaimer)

---

## Key Features

- **Real-Time ML Clinical Risk Scoring**: Evaluates 11 patient parameters to predict presence of heart disease and assigns a quantified probability and risk classification (Low, Moderate, or High).
- **Role-Based Access Control (RBAC)**: Secure authentication utilizing JWT (JSON Web Tokens) with distinct roles for **Standard Users** (Patients/Clinicians) and **Administrators**.
- **Interactive Patient Portal**:
  - Intuitive prediction assessment form with client-side range validation.
  - Comprehensive prediction history logs detailing all past clinical submissions with timestamps.
  - User profile management.
- **Dedicated Admin Operations Dashboard**:
  - Live analytics counters (total users, aggregate predictions count, high-risk cases identified).
  - Searchable directory of all registered system users with account statuses.
  - Complete system-wide audit of all patient predictions and drill-down views per specific user.
- **Self-Documenting REST API**: Built on FastAPI, providing automated interactive Swagger UI (`/docs`) and ReDoc (`/redoc`) API explorers.
- **Enterprise-Ready Database Schema**: Normalised relational tables in MySQL 8 with foreign key cascading and indexed queries.

---

## System Architecture

HeartGuard separates concerns between a reactive single-page frontend, a stateless asynchronous REST API, an embedded machine learning inference engine, and a relational persistence layer:

```
┌─────────────────────────────────────────────────────────────┐
│                   React 19 + Vite Frontend                  │
│   (Port: 5173 | Axios Interceptors | Context API Auth)      │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON (REST API)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    FastAPI Backend Engine                   │
│         (Port: 8000 | Pydantic Validation | JWT Auth)       │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               │ Preprocessed Data (Pandas)   │ SQLAlchemy ORM
               ▼                              ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│ Random Forest ML Pipeline    │ │      MySQL 8 Database      │
│ (heart_disease_pipeline.     │ │ (users, heart_predictions) │
│  joblib inference engine)    │ │ (Port: 3306)               │
└──────────────────────────────┘ └────────────────────────────┘
```

---

## Machine Learning Pipeline & Metrics

### 1. Dataset & Input Features

The machine learning pipeline is trained on the comprehensive **UCI / Kaggle Heart Disease Dataset** (918 patient observations):

| #   | Feature Name     | Description                           | Accepted Values / Range                                                                        |
| --- | ---------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1   | `Age`            | Patient age in years                  | Integer: 1 – 120                                                                               |
| 2   | `Sex`            | Biological sex                        | `M` (Male), `F` (Female)                                                                       |
| 3   | `ChestPainType`  | Chest pain classification             | `TA` (Typical Angina), `ATA` (Atypical Angina), `NAP` (Non-Anginal Pain), `ASY` (Asymptomatic) |
| 4   | `RestingBP`      | Resting blood pressure                | Integer: 50 – 250 (mmHg)                                                                       |
| 5   | `Cholesterol`    | Serum cholesterol                     | Integer: 0 – 700 (mg/dl)                                                                       |
| 6   | `FastingBS`      | Fasting blood sugar                   | `1` (if > 120 mg/dl), `0` (otherwise)                                                          |
| 7   | `RestingECG`     | Resting electrocardiogram results     | `Normal`, `ST` (ST-T wave abnormality), `LVH` (Left ventricular hypertrophy)                   |
| 8   | `MaxHR`          | Maximum heart rate achieved           | Integer: 60 – 250 (bpm)                                                                        |
| 9   | `ExerciseAngina` | Exercise-induced angina               | `Y` (Yes), `N` (No)                                                                            |
| 10  | `Oldpeak`        | ST depression induced by exercise     | Numeric float: -10.0 – 10.0                                                                    |
| 11  | `ST_Slope`       | Slope of the peak exercise ST segment | `Up` (Upsloping), `Flat` (Horizontal), `Down` (Downsloping)                                    |

### 2. Model Performance Benchmarks

After multi-model benchmarking (Logistic Regression, Decision Trees, SVM, KNN, Random Forest) inside `ML_Model_Training/ml_model.ipynb`, the optimized **Random Forest Classifier** was exported as a complete Scikit-Learn pipeline (`heart_disease_pipeline.joblib`).

- **Test Accuracy**: `88.59%`
- **Precision (Heart Disease)**: `88.57%`
- **Recall / Sensitivity**: `91.18%`
- **F1-Score**: `89.86%`
- **ROC-AUC Score**: `92.91%`
- **5-Fold Cross-Validation Accuracy**: `87.19%`

### 3. Risk Stratification Logic

The backend computes predicted probabilities via `predict_proba()` and categorizes risk:

- **Low Risk**: Heart Disease Probability `< 40%`
- **Moderate Risk**: Heart Disease Probability `40% – 74.99%`
- **High Risk**: Heart Disease Probability `≥ 75%`

---

## Technology Stack

### Frontend

- **Framework**: React 19 (Hooks, Context API)
- **Tooling & Bundler**: Vite 8
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios with automated bearer token injection & 401 interceptors
- **Icons & UI**: React Icons (`react-icons`), CSS3 custom design tokens

### Backend

- **Framework**: FastAPI (Asynchronous Python REST API)
- **ASGI Server**: Uvicorn
- **Data Validation & Settings**: Pydantic v2 & Pydantic-Settings
- **ORM & Database Driver**: SQLAlchemy 2.0 with `mysql-connector-python`
- **Authentication**: JWT via `python-jose`, password hashing via `passlib[bcrypt]`

### Machine Learning & Data Processing

- **Inference & Preprocessing**: Scikit-Learn, Pandas, NumPy, Joblib
- **Exploration & Training**: Jupyter Notebook, Matplotlib, Seaborn

### Database

- **Engine**: MySQL Server 8.0 (InnoDB storage engine, UTF-8 unicode encoding)

---

## Directory Structure

```text
HEART GURAD FYP/
├── README.md                              <- Project documentation
├── requirements.txt                      <- Consolidated Python dependencies
├── SETUP_GUIDE.html                      <- Standalone printable HTML installation guide
│
├── Backend/                              <- FastAPI application server
│   ├── .env                              <- Environment config (DB credentials & JWT secret)
│   ├── requirements.txt                  <- Backend-specific Python requirements
│   ├── heart_disease_pipeline.joblib     <- Serialized ML pipeline model
│   └── app/
│       ├── main.py                       <- Application entrypoint & CORS middleware
│       ├── config.py                     <- Pydantic settings loading from .env
│       ├── database.py                   <- SQLAlchemy engine & session maker
│       ├── dependencies.py               <- get_db session dependency injection
│       ├── utils_auth.py                 <- Current user & admin token validation
│       ├── core/
│       │   ├── security.py               <- Bcrypt password hashing & JWT encoding/decoding
│       │   └── model_loader.py           <- Singleton loader for joblib ML model
│       ├── models/
│       │   ├── user.py                   <- SQLAlchemy User model
│       │   └── prediction.py             <- SQLAlchemy HeartDiseasePrediction model
│       ├── routers/
│       │   ├── auth.py                   <- /auth/register and /auth/login routes
│       │   ├── users.py                  <- /users/me and /users/my-predictions routes
│       │   ├── predictions.py           <- /predictions/ inference route
│       │   └── admin.py                  <- /admin/* management & stats routes
│       └── schemas/
│           ├── auth.py                   <- Auth request & token response schemas
│           ├── user.py                   <- User profile serialization schemas
│           └── prediction.py             <- Clinical input, output & stats schemas
│
├── Frontend/                             <- React + Vite single-page application
│   ├── package.json                      <- NPM dependencies and scripts
│   ├── vite.config.js                    <- Vite build configuration
│   ├── index.html                        <- HTML template
│   └── src/
│       ├── main.jsx                      <- React DOM mounting
│       ├── App.jsx                       <- Application routing & role guards
│       ├── index.css                     <- Global styles & CSS variables
│       ├── api/
│       │   └── axios.js                  <- Axios instance configured with baseURL & interceptors
│       ├── context/
│       │   └── AuthContext.jsx           <- Authentication state & session handler
│       ├── components/
│       │   ├── Navbar.jsx                <- Responsive navigation bar with role detection
│       │   ├── ProtectedRoute.jsx        <- Role-based route guard
│       │   └── StatsCard.jsx             <- Admin metrics dashboard card
│       └── pages/
│           ├── LandingPage.jsx           <- Public homepage with features and CTA
│           ├── Login.jsx                 <- User & Admin authentication form
│           ├── Register.jsx              <- Account creation form with role selector
│           ├── user/
│           │   ├── Dashboard.jsx         <- Patient dashboard & quick links
│           │   ├── Predict.jsx           <- Clinical 11-feature diagnostic assessment form
│           │   └── MyPredictions.jsx     <- Personal historical assessment logs
│           └── admin/
│               ├── AdminDashboard.jsx    <- Admin analytics overview & metrics
│               ├── AllUsers.jsx          <- Registered users table
│               ├── AllPredictions.jsx    <- Global prediction audit log
│               └── UserPredictions.jsx   <- Per-user filtered predictions view
│
├── Database/
│   └── schema.sql                        <- MySQL initialization script (DDL & constraints)
│
└── ML_Model_Training/                    <- Model research & training artifacts
    ├── heart_disease_datasets.csv        <- 918-sample training dataset
    ├── ml_model.ipynb                    <- Primary model training & pipeline notebook
    ├── model.ipynb                       <- Exploratory data analysis & baseline notebook
    ├── heart_disease_pipeline.joblib     <- Generated pipeline artifact
    └── heart_disease_model.pkl           <- Raw model pickle artifact
```

---

## Prerequisites & System Requirements

Ensure the following tools are installed on your system before proceeding:

1. **Python 3.11** (Verify with `python --version` or `python3 --version`)
   - _Note for Windows_: Ensure **"Add python.exe to PATH"** was checked during installation.
2. **Node.js 18+ (LTS)** and **npm** (Verify with `node --version` and `npm --version`)
3. **MySQL Server 8.0+** and **MySQL Workbench** running on port `3306`.
4. Modern Web Browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Brave).

---

## Installation & Setup Guide

### Step 1: Clone or Copy Project

Place the project directory on your computer (e.g., `C:\FYP\HEART GURAD FYP` or `~/projects/heart-guard`).

### Step 2: Database Initialization

1. Open **MySQL Workbench** and establish connection to your local MySQL instance.
2. Navigate to **File** > **Open SQL Script...** and select:
   ```text
   Database/schema.sql
   ```
3. Execute the script (`Ctrl + Shift + Enter` or the ⚡ execute button).
4. Refresh the **Schemas** navigator. The database `heart_disease` will be created with two tables:
   - `users`
   - `heart_predictions`

_Alternative via Terminal:_

```bash
mysql -u root -p < "Database/schema.sql"
```

### Step 3: Backend Setup & Environment Variables

1. Open a terminal in the `Backend/` directory:
   ```bash
   cd Backend
   ```
2. Create and activate a Python virtual environment inside `Backend/`:
   - **Windows (Command Prompt / PowerShell):**
     ```powershell
     python -m venv .venv
     .venv\Scripts\activate
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```
   *(Note: You can use `.venv` or `venv` as your virtual environment folder name.)*
3. Upgrade pip and install backend dependencies:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```
4. Verify or create your `Backend/.env` configuration file:
   ```env
   DATABASE_URL = mysql+mysqlconnector://root:YOUR_PASSWORD@localhost/heart_disease
   SECRET_KEY = your_super_secret_jwt_key_here_12345
   ALGORITHM = HS256
   ACCESS_TOKEN_EXPIRE_MINUTES = 60
   MODEL_PATH = heart_disease_pipeline.joblib
   ```
   > **Note on Special Characters**: If your MySQL password contains special characters (like `@`, `#`, `/`), percent-encode them (e.g., `@` becomes `%40`).

### Step 4: Frontend Installation

1. Open a new terminal in the `Frontend/` directory:
   ```bash
   cd Frontend
   ```
2. Install Node.js packages:
   ```bash
   npm install
   ```

---

## Running the Application

### 1. Launch Backend Server

Open a terminal inside the project root, navigate to `Backend/`, activate the virtual environment, and start the Uvicorn server:

- **Windows (Command Prompt / PowerShell):**
  ```powershell
  cd Backend
  .venv\Scripts\activate
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
  ```

- **macOS / Linux:**
  ```bash
  cd Backend
  source .venv/bin/activate
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
  ```

> _Note: If your virtual environment is named `venv` instead of `.venv`, use `venv\Scripts\activate` (or `source venv/bin/activate`)._

- **API Base:** `http://localhost:8000`
- **Swagger Documentation:** `http://localhost:8000/docs`

### 2. Launch Frontend Client

Open a **separate terminal**, navigate to `Frontend/`, and start the Vite development server:

```bash
cd Frontend
npm run dev
```

- **Web App URL:** `http://localhost:5173`

_(Optional) Production Build Preview:_

```bash
cd Frontend
npm run build
npm run preview
```

---

## User Roles & Walkthrough

### 1. Registering an Initial Admin Account

Because the database starts empty, register your administrator account through the registration UI:

1. Navigate to `http://localhost:5173/register`.
2. Fill in the details:
   - **Full Name**: `System Admin`
   - **Username**: `admin`
   - **Email**: `admin@heartguard.com`
   - **Password**: `Admin@123`
   - **Role**: Select **Admin**
3. Click **Register** and then proceed to **Login**.

### 2. Administrator Capabilities (`/admin`)

- **Dashboard Overview**: Review system metrics including Total Users, Predictions Logged, and High-Risk Alerts.
- **User Directory (`/admin/users`)**: View registered accounts, emails, roles, creation dates, and statuses.
- **Global Predictions (`/admin/predictions`)**: Audit all predictions made across all registered users.
- **Per-User Records (`/admin/users/:userId/predictions`)**: Drill down into diagnostic history for an individual patient.

### 3. Patient / Regular User Capabilities (`/dashboard`)

1. Register with role **User**.
2. **Predict Risk (`/predict`)**: Input the 11 clinical features into the structured assessment form.
3. **Assessment Results**: Immediately receive prediction status (**Heart Disease** or **Normal**), probability percentage, and risk level badge (**Low**, **Moderate**, or **High**).
4. **My Predictions (`/my-predictions`)**: Review a persistent historical log of all previous assessments.

---

## REST API Documentation

FastAPI serves an interactive OpenAPI documentation portal at `http://localhost:8000/docs`.

### Primary Endpoints Summary

| Method | Endpoint                        | Access Role   | Description                                              |
| ------ | ------------------------------- | ------------- | -------------------------------------------------------- |
| `GET`  | `/`                             | Public        | Service health check                                     |
| `POST` | `/auth/register`                | Public        | Register new user or admin account                       |
| `POST` | `/auth/login`                   | Public        | Authenticate credentials and retrieve JWT token          |
| `GET`  | `/users/me`                     | Authenticated | Retrieve current user profile                            |
| `GET`  | `/users/my-predictions`         | User          | Retrieve current user's diagnostic history               |
| `POST` | `/predictions/`                 | User          | Execute machine learning inference and store record      |
| `GET`  | `/admin/dashboard-stats`        | Admin         | Aggregate system metrics (users, predictions, high risk) |
| `GET`  | `/admin/users`                  | Admin         | List all registered system accounts                      |
| `GET`  | `/admin/predictions`            | Admin         | List all predictions system-wide                         |
| `GET`  | `/admin/users/{id}/predictions` | Admin         | List predictions for a targeted user ID                  |

### Sample Prediction Request

**POST** `http://localhost:8000/predictions/`  
**Headers**: `Authorization: Bearer <JWT_ACCESS_TOKEN>`

```json
{
  "Age": 54,
  "Sex": "M",
  "ChestPainType": "ASY",
  "RestingBP": 130,
  "Cholesterol": 240,
  "FastingBS": 0,
  "RestingECG": "Normal",
  "MaxHR": 140,
  "ExerciseAngina": "Y",
  "Oldpeak": 1.5,
  "ST_Slope": "Flat"
}
```

### Sample Prediction Response

```json
{
  "prediction": "Heart Disease",
  "probability": 0.8421,
  "probability_percent": "84.21%",
  "risk_level": "High"
}
```

---

## Database Schema

```mermaid
erDiagram
    users ||--o{ heart_predictions : "submits"
    users {
        int id PK
        varchar full_name
        varchar username UK
        varchar email UK
        varchar password_hash
        varchar role
        tinyint is_active
        datetime created_at
    }
    heart_predictions {
        int id PK
        int user_id FK
        int age
        varchar sex
        varchar chest_pain_type
        int resting_bp
        int cholesterol
        int fasting_bs
        varchar resting_ecg
        int max_hr
        varchar exercise_angina
        float oldpeak
        varchar st_slope
        varchar prediction
        float probability
        varchar risk_level
        datetime created_at
    }
```

---

## Troubleshooting & Common Issues

| Symptom / Error                                        | Root Cause                                                          | Solution                                                                                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `RuntimeError: DATABASE_URL is not set`                | The `.env` file is missing, empty, or incorrectly named `.env.txt`. | Ensure `Backend/.env` exists with the exact name and contains `DATABASE_URL`.                                                           |
| `Access denied for user 'root'@'localhost'`            | Incorrect MySQL password in `DATABASE_URL`.                         | Verify credentials in `Backend/.env`. URL-encode special characters.                                                                    |
| `Can't connect to MySQL server on 'localhost:3306'`    | The MySQL service is stopped.                                       | Open Windows Services (`services.msc`), find **MySQL80**, and click **Start**.                                                          |
| `scikit-learn unpickling / version mismatch error`     | Missing dependencies or wrong scikit-learn version.                 | Activate virtual environment (`venv\Scripts\activate`) and run `pip install -r requirements.txt`.                                       |
| `You must pass the application as an import string...` | Started with `python main.py` instead of Uvicorn command.           | Launch using: `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`.                                                               |
| PowerShell: _Script execution disabled_                | Windows execution policy restrictions.                              | Open PowerShell as Administrator and run: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` or use standard Command Prompt (`cmd`). |
| `Port 8000 already in use`                             | A previous backend instance is still running in the background.     | Terminate the existing process via Task Manager or run `netstat -ano \| findstr :8000` and kill the PID.                                |
| Frontend displays _Network Error_ or _Failed to Fetch_ | Backend API is not currently running.                               | Ensure `uvicorn app.main:app` is running and accessible at `http://localhost:8000`.                                                     |

---

## Academic Disclaimer

> **IMPORTANT MEDICAL NOTICE**:  
> HeartGuard is an academic research software developed exclusively for educational and demonstration purposes as a Final Year Project (FYP). The predictive risk assessments generated by this application do **not** constitute clinical diagnosis, formal medical consultations, or prescription guidelines. Always consult qualified healthcare providers and certified medical specialists for cardiovascular diagnoses and clinical interventions.
