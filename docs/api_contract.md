# API Contract

This document describes the RESTful API endpoints exposed by the Triangle Reconstruction customer portal backend.  All endpoints are prefixed with the base URL (e.g. `https://api.example.com`) and secured via authentication/authorization once integrated with Firebase Auth.  For brevity, response examples show only relevant fields.

## Authentication

In production, all requests must include an authenticated JWT in the `Authorization` header (e.g. `Bearer <token>`).  The stub implementation does not enforce auth.

## Endpoints

### `GET /me`

Returns the profile of the currently authenticated user.

**Response:**

```json
{
  "id": 1,
  "auth_uid": "firebase:abc123",
  "name": "Jane Customer",
  "email": "jane.customer@example.com",
  "phone": "555-0100"
}
```

### `GET /jobs`

Lists jobs for the current user.  Optional query parameter `status` filters jobs (`open` or `past`).

**Response:**

```json
[
  {
    "id": 101,
    "user_id": 1,
    "property_id": 1,
    "crm_ref": "JB-0001",
    "status": "open",
    "scheduled_at": "2025-11-15T10:00:00"
  },
  {
    "id": 102,
    "user_id": 1,
    "property_id": 1,
    "crm_ref": "JB-0002",
    "status": "past",
    "scheduled_at": "2025-10-01T09:00:00"
  }
]
```

### `GET /jobs/{job_id}`

Retrieves details for a single job.  Returns 404 if not found.

### `POST /requests`

Creates a new service request.  The request body includes:

- `category`: one of `crawlspace_repairs`, `structural_repairs`, `waterproofing`, `mold_remediation`, `attic_solutions`
- `description`: free‑form text
- `media`: array of file URLs (optional)
- `property_id`: integer (optional while address collection is implemented)
- `times`: preferred appointment windows (future enhancement)

**Request Example:**

```json
{
  "category": "crawlspace_repairs",
  "description": "Standing water under the house.",
  "media": [],
  "property_id": 1,
  "times": ["2025-12-01T09:00", "2025-12-01T13:00"]
}
```

**Response:**

```json
{
  "id": 1001,
  "status": "submitted",
  "submitted_at": "2025-11-10T14:00:00Z",
  "category": "crawlspace_repairs",
  "description": "Standing water under the house."
}
```

### `GET /invoices`

Lists invoices for the current user.  Optional query parameter `status` filters invoices (`open` or `paid`).

**Response:**

```json
[
  {
    "id": 201,
    "job_id": 101,
    "crm_ref": "INV-001",
    "amount_due": 500.0,
    "status": "open",
    "stripe_pi": null
  },
  {
    "id": 202,
    "job_id": 102,
    "crm_ref": "INV-002",
    "amount_due": 0.0,
    "status": "paid",
    "stripe_pi": null
  }
]
```

### `POST /invoices/{invoice_id}/pay`

Initiates payment for the specified invoice and returns a Stripe PaymentIntent client secret.

**Response:**

```json
{
  "client_secret": "pi_1234_secret_ABC"
}
```

### `POST /messages`

Posts a new chat message to a job thread.  The request body must include:

- `job_id`: integer
- `sender`: string (e.g. `customer` or `staff`)
- `text`: message content
- `media`: array of file URLs (optional)

**Response:** returns the posted message.

### `GET /promos`

Returns active promotions for the current user.  Promotions can be targeted based on segment.

**Response:**

```json
[
  {
    "id": 301,
    "title": "Winter Crawlspace Checkup",
    "body": "Get 15% off your next crawlspace inspection when scheduled before Dec 31.",
    "target_segment": "all",
    "active_from": null,
    "active_to": null
  },
  {
    "id": 302,
    "title": "Member Appreciation",
    "body": "Members receive a free dehumidifier check with any service call this month.",
    "target_segment": "members",
    "active_from": null,
    "active_to": null
  }
]
```

### `GET /faqs`

Returns a list of frequently asked questions and answers.

### `GET /membership`

Returns the current user's membership plan, status and renewal date.

### `POST /sensors/{sensor_id}/readings`

Accepts a sensor reading (temperature, humidity, timestamp) for a given sensor ID.  Used when bridging data from IoT devices.

## Error Handling

The API returns standard HTTP status codes.  A `404 Not Found` is returned if a resource does not exist.  Validation errors result in `422 Unprocessable Entity` responses with details in the response body.