"""
FastAPI backend skeleton for the Triangle Reconstruction customer portal.

This module defines the FastAPI app and a handful of stub endpoints
modelled after the proposed API contract.  All endpoints currently return
static sample data; integrations with external systems (Jobber, Stripe,
SensorPush) should be implemented in separate modules and injected via
dependency‐injection patterns once credentials are available.
"""

from typing import List, Optional
from datetime import datetime

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Triangle Reconstruction Customer Portal API",
              description="Stub API implementing core customer portal flows",
              version="0.1.0")

# In-memory storage for requests and messages.  These lists simulate
# persistence for the stub API.  In production a database should be used
# instead.
requests_db: list[dict] = []
messages_db: list[Message] = []


class User(BaseModel):
    id: int
    auth_uid: str = Field(..., description="Firebase UID or other auth provider ID")
    name: str
    email: str
    phone: Optional[str] = None


class Property(BaseModel):
    id: int
    user_id: int
    address: str
    access_notes: Optional[str] = None


class Job(BaseModel):
    id: int
    user_id: int
    property_id: int
    crm_ref: str
    status: str
    scheduled_at: Optional[datetime] = None


class Estimate(BaseModel):
    id: int
    job_id: int
    crm_ref: str
    total: float
    pdf_url: str
    status: str


class Invoice(BaseModel):
    id: int
    job_id: int
    crm_ref: str
    amount_due: float
    status: str
    stripe_pi: Optional[str] = None


class Message(BaseModel):
    id: int
    job_id: int
    sender: str
    text: str
    media: Optional[List[str]] = None


class Promo(BaseModel):
    id: int
    title: str
    body: str
    target_segment: str
    active_from: Optional[datetime] = None
    active_to: Optional[datetime] = None


class FAQ(BaseModel):
    id: int
    question: str
    answer: str


class Membership(BaseModel):
    id: int
    plan: str
    status: str
    renews_at: Optional[datetime]


@app.get("/me", response_model=User)
async def get_me() -> User:
    """Return the current user's profile.

    In a real implementation this would authenticate the request, look up
    the user via the auth UID, and pull related properties and membership
    status.  Here we return a static user record.
    """
    return User(
        id=1,
        auth_uid="firebase:abc123",
        name="Jane Customer",
        email="jane.customer@example.com",
        phone="555-0100",
    )


@app.get("/jobs", response_model=List[Job])
async def list_jobs(status: Optional[str] = None) -> List[Job]:
    """List jobs for the current user.

    Query parameter ``status`` may filter jobs by status (e.g. "open",
    "past").  This stub returns a static list regardless of the query.
    """
    jobs = [
        Job(
            id=101,
            user_id=1,
            property_id=1,
            crm_ref="JB-0001",
            status="open",
            scheduled_at=datetime(2025, 11, 15, 10, 0),
        ),
        Job(
            id=102,
            user_id=1,
            property_id=1,
            crm_ref="JB-0002",
            status="past",
            scheduled_at=datetime(2025, 10, 1, 9, 0),
        ),
    ]
    if status:
        jobs = [job for job in jobs if job.status == status]
    return jobs


@app.get("/jobs/{job_id}", response_model=Job)
async def get_job(job_id: int) -> Job:
    """Return details for a single job."""
    # In a real implementation this would query a database
    if job_id == 101:
        return Job(
            id=101,
            user_id=1,
            property_id=1,
            crm_ref="JB-0001",
            status="open",
            scheduled_at=datetime(2025, 11, 15, 10, 0),
        )
    if job_id == 102:
        return Job(
            id=102,
            user_id=1,
            property_id=1,
            crm_ref="JB-0002",
            status="past",
            scheduled_at=datetime(2025, 10, 1, 9, 0),
        )
    raise HTTPException(status_code=404, detail="Job not found")


@app.post("/requests")
async def create_request(request: dict) -> dict:
    """Create a new service request.

    This stub simply echoes the request payload back with a fake ID and
    timestamp.  In production, this would persist the request in a database
    and forward it to the CRM via webhook.
    """
    # Assign a fake ID based on current number of requests
    new_id = len(requests_db) + 1001
    record = {
        "id": new_id,
        "status": "submitted",
        "submitted_at": datetime.utcnow().isoformat(),
        **request,
    }
    requests_db.append(record)
    return record


@app.get("/requests")
async def list_requests() -> list[dict]:
    """Return a list of submitted service requests.

    This endpoint is primarily for the admin console.  In the stub
    implementation it returns the in-memory requests list.  Future
    enhancements should include filtering by status and pagination.
    """
    return requests_db


@app.get("/invoices", response_model=List[Invoice])
async def list_invoices(status: Optional[str] = None) -> List[Invoice]:
    """List invoices for the current user."""
    invoices = [
        Invoice(id=201, job_id=101, crm_ref="INV-001", amount_due=500.0, status="open"),
        Invoice(id=202, job_id=102, crm_ref="INV-002", amount_due=0.0, status="paid"),
    ]
    if status:
        invoices = [inv for inv in invoices if inv.status == status]
    return invoices


@app.post("/invoices/{invoice_id}/pay")
async def pay_invoice(invoice_id: int) -> dict:
    """Stub endpoint to simulate paying an invoice.

    Returns a fake Stripe PaymentIntent client secret.
    """
    # Validate invoice existence (omitted)
    return {"client_secret": "pi_1234_secret_ABC"}


@app.post("/messages")
async def post_message(message: Message) -> Message:
    """Post a new chat message to a job thread."""
    # Append to in-memory message list
    messages_db.append(message)
    return message


@app.get("/messages")
async def list_messages(job_id: Optional[int] = None) -> list[Message]:
    """List messages optionally filtered by job_id.

    In the stub implementation messages are stored in an in-memory list.
    A real implementation should query the database and include
    pagination and sorting.
    """
    if job_id is None:
        return messages_db
    return [msg for msg in messages_db if msg.job_id == job_id]


@app.get("/promos", response_model=List[Promo])
async def list_promos() -> List[Promo]:
    """Return active promotions for the current user.

    Promotions could be targeted based on segment (e.g. past customers,
    membership status).  This stub returns a generic promotion.
    """
    return [
        Promo(
            id=301,
            title="Winter Crawlspace Checkup",
            body="Get 15% off your next crawlspace inspection when scheduled before Dec 31.",
            target_segment="all",
        ),
        Promo(
            id=302,
            title="Member Appreciation",
            body="Members receive a free dehumidifier check with any service call this month.",
            target_segment="members",
        ),
    ]


@app.get("/faqs", response_model=List[FAQ])
async def list_faqs() -> List[FAQ]:
    """Return frequently asked questions.

    In production, these could be managed via a CMS and filtered by category.
    """
    return [
        FAQ(id=1, question="Why is my crawlspace damp?", answer="High humidity and poor ventilation can cause dampness and mold growth in crawlspaces."),
        FAQ(id=2, question="Do you offer financing?", answer="Yes, financing is available through Wisetack with terms up to 5 years."),
    ]


@app.get("/membership", response_model=Membership)
async def get_membership() -> Membership:
    """Return membership details for the current user."""
    return Membership(
        id=401,
        plan="Gold",
        status="active",
        renews_at=datetime(2026, 1, 1),
    )


@app.post("/sensors/{sensor_id}/readings")
async def post_sensor_reading(sensor_id: int, reading: dict) -> dict:
    """Stub endpoint to receive sensor readings.

    This would normally be called by a bridge device or IoT backend.  Here we
    simply return the reading and sensor ID.
    """
    return {"sensor_id": sensor_id, **reading}