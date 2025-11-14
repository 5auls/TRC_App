"""
Simple test suite for the FastAPI backend.

These tests use the TestClient provided by FastAPI to make requests
against the application without running a server.
"""

from fastapi.testclient import TestClient

from backend.main import app


client = TestClient(app)


def test_get_me():
    res = client.get("/me")
    assert res.status_code == 200
    data = res.json()
    assert data["name"] == "Jane Customer"
    assert data["email"] == "jane.customer@example.com"


def test_list_jobs():
    res = client.get("/jobs")
    assert res.status_code == 200
    jobs = res.json()
    assert isinstance(jobs, list)
    assert len(jobs) >= 2


def test_get_job_not_found():
    res = client.get("/jobs/999")
    assert res.status_code == 404
    assert res.json()["detail"] == "Job not found"


# Additional tests for extended API endpoints

def test_list_promos():
    res = client.get("/promos")
    assert res.status_code == 200
    promos = res.json()
    assert isinstance(promos, list)
    # Should return at least one promotion
    assert len(promos) >= 1
    assert all("title" in p for p in promos)


def test_list_faqs():
    res = client.get("/faqs")
    assert res.status_code == 200
    faqs = res.json()
    assert isinstance(faqs, list)
    # Each FAQ should have question and answer
    assert "question" in faqs[0] and "answer" in faqs[0]


def test_get_membership():
    res = client.get("/membership")
    assert res.status_code == 200
    membership = res.json()
    assert membership["plan"] == "Gold"
    assert membership["status"] == "active"


def test_create_request():
    payload = {"category": "crawlspace_repairs", "description": "Test request"}
    res = client.post("/requests", json=payload)
    assert res.status_code == 200
    data = res.json()
    # Stub returns id and status
    assert data["id"] >= 1000
    assert data["status"] == "submitted"


def test_pay_invoice():
    # Pay a known invoice
    res = client.post("/invoices/201/pay")
    assert res.status_code == 200
    data = res.json()
    assert "client_secret" in data


def test_list_requests_empty_then_create():
    # Initially no requests
    res = client.get("/requests")
    assert res.status_code == 200
    assert res.json() == []
    # Create a request
    payload = {"category": "waterproofing", "description": "Basement leak"}
    client.post("/requests", json=payload)
    # Now list should contain one entry
    res2 = client.get("/requests")
    assert len(res2.json()) >= 1


def test_messages_flow():
    # Initially no messages
    res = client.get("/messages?job_id=101")
    assert res.status_code == 200
    assert res.json() == []
    # Post a message
    msg = {"job_id": 101, "sender": "customer", "text": "Hello", "media": []}
    post_res = client.post("/messages", json=msg)
    assert post_res.status_code == 200
    # List messages again
    res2 = client.get("/messages?job_id=101")
    assert len(res2.json()) >= 1