from pydantic import BaseModel, EmailStr, Field
from enum import Enum


class RoleEnum(str, Enum):
    user = "user"
    admin = "admin"


class RegisterRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=5, max_length=100)
    role: RoleEnum = Field(default=RoleEnum.user, description="Account role: 'user' or 'admin'")


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    role: str