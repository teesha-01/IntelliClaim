from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
import uuid
from enum import Enum


class ClaimStatus(str, Enum):
    Pending = "Pending"
    Approved = "Approved"
    Denied = "Denied"
    Draft = "Draft"


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    hashed_password: str
    role: str  # "employee" or "admin"
    is_verified: bool = Field(default=False)

    claims: List["Claim"] = Relationship(back_populates="user")
    audits: List["ClaimAudit"] = Relationship(back_populates="user")


class Claim(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    claim_number: str = Field(
        default_factory=lambda: f"CLM-{uuid.uuid4().hex[:6].upper()}", index=True
    )
    status: ClaimStatus = Field(default=ClaimStatus.Pending, index=True)
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    user_id: int = Field(foreign_key="user.id")
    user: Optional[User] = Relationship(back_populates="claims")

    # Step 1: Vehicle Details
    policy_no: str
    vehicle_make: str
    policy_start_date: datetime
    policy_end_date: datetime
    claim_count: str
    engine_no: str
    vehicle_model: str
    claim_paid_amount: float
    claim_intimation_amount: float
    chassis_no: str
    vehicle_color: str
    vehicle_start_date: datetime
    vehicle_end_date: datetime
    deductible_amount: float
    registration_no: str
    year_of_manufacture: str
    outstanding: str

    # Step 2: Claim Info
    claim_type: str
    branch: str
    incident_datetime: datetime
    incident_place: str
    current_location: str
    circumstances: str
    missing_parts_details: str
    workshop_type: str
    vehicle_type: str
    workshop_name: str
    vehicle_availability: str


    # Step 3: Contact & Remarks
    relation_with_insured: str
    contact_person_name: str
    contact_number: str
    email: str
    remarks: Optional[str] = None
    remarks2: Optional[str] = None
    date_time: datetime

    # File upload URLs (local storage)
    registration_book_url: Optional[str] = None
    driving_license_url: Optional[str] = None
    roznamcha_url: Optional[str] = None
    nic_url: Optional[str] = None

    audits: List["ClaimAudit"] = Relationship(back_populates="claim")


class ClaimAudit(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    claim_id: int = Field(foreign_key="claim.id")
    changed_by: int = Field(foreign_key="user.id")
    old_status: Optional[ClaimStatus] = None
    new_status: ClaimStatus
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    claim: Optional[Claim] = Relationship(back_populates="audits")
    user: Optional[User] = Relationship(back_populates="audits")
