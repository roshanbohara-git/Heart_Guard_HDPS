-- ============================================================
-- Heart Guard FYP — Database Schema
-- Compatible with: MySQL Workbench 8.0 CE
-- ============================================================
-- Run this script in MySQL Workbench to create the database
-- and all required tables on a new device.
-- ============================================================


-- 1. Create the database (if it doesn't already exist)
CREATE DATABASE IF NOT EXISTS heart_disease
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- 2. Select the database
USE heart_disease;


-- ============================================================
-- TABLE: users
-- Stores registered user accounts (both regular users & admins)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id              INT             NOT NULL AUTO_INCREMENT,
    full_name       VARCHAR(100)    NOT NULL,
    username        VARCHAR(50)     NOT NULL,
    email           VARCHAR(100)    NOT NULL,
    password_hash   VARCHAR(255)    NOT NULL,
    role            VARCHAR(20)     NOT NULL DEFAULT 'user'       COMMENT 'user or admin',
    is_active       TINYINT(1)      NOT NULL DEFAULT 1            COMMENT '1 = active, 0 = deactivated',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE  KEY uq_users_username (username),
    UNIQUE  KEY uq_users_email    (email),
    INDEX   idx_users_username    (username),
    INDEX   idx_users_email       (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- TABLE: heart_predictions
-- Stores every heart-disease prediction made by a user
-- ============================================================
CREATE TABLE IF NOT EXISTS heart_predictions (
    id                  INT             NOT NULL AUTO_INCREMENT,
    user_id             INT             NOT NULL,

    -- Patient clinical input features
    age                 INT             NOT NULL,
    sex                 VARCHAR(10)     NOT NULL        COMMENT 'M or F',
    chest_pain_type     VARCHAR(10)     NOT NULL        COMMENT 'ATA, NAP, ASY, TA',
    resting_bp          INT             NOT NULL        COMMENT 'Resting blood pressure (mmHg)',
    cholesterol         INT             NOT NULL        COMMENT 'Serum cholesterol (mg/dl)',
    fasting_bs          INT             NOT NULL        COMMENT '1 if fasting blood sugar > 120 mg/dl, else 0',
    resting_ecg         VARCHAR(20)     NOT NULL        COMMENT 'Normal, ST, LVH',
    max_hr              INT             NOT NULL        COMMENT 'Maximum heart rate achieved',
    exercise_angina     VARCHAR(10)     NOT NULL        COMMENT 'Y or N',
    oldpeak             FLOAT           NOT NULL        COMMENT 'ST depression (numeric)',
    st_slope            VARCHAR(20)     NOT NULL        COMMENT 'Up, Flat, Down',

    -- Model output
    prediction          VARCHAR(50)     NOT NULL        COMMENT 'Heart Disease or Normal',
    probability         FLOAT           NOT NULL        COMMENT 'Probability of heart disease (0–1)',
    risk_level          VARCHAR(20)     NOT NULL        COMMENT 'Low, Moderate, High',

    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX   idx_predictions_user_id    (user_id),
    INDEX   idx_predictions_risk_level (risk_level),

    CONSTRAINT fk_predictions_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- Verification: Show created tables
-- ============================================================
SHOW TABLES;
DESCRIBE users;
DESCRIBE heart_predictions;
