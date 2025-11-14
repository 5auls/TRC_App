# Data Dictionary

The data dictionary defines the key entities used by the Triangle Reconstruction customer portal and their attributes.  It acts as a reference for developers, database administrators and analysts.

## User

| Field | Type | Description |
|------|------|-------------|
| `id` | integer | Primary key for the user record. |
| `auth_uid` | string | Identifier from the authentication provider (e.g. Firebase UID). |
| `name` | string | Full name of the customer. |
| `email` | string | Customer's email address. |
| `phone` | string (optional) | Customer's phone number. |

## Property

| Field | Type | Description |
|------|------|-------------|
| `id` | integer | Primary key for the property record. |
| `user_id` | integer | Foreign key to the user who owns this property. |
| `address` | string | Street address of the property. |
| `access_notes` | string (optional) | Instructions for accessing the property (e.g. gate codes). |

## Job

| Field | Type | Description |
|------|------|-------------|
| `id` | integer | Primary key for the job. |
| `user_id` | integer | Foreign key to the customer requesting the job. |
| `property_id` | integer | Foreign key to the property where the job takes place. |
| `crm_ref` | string | Identifier of the job in the CRM (e.g. Jobber). |
| `status` | string | Status of the job (`open`, `scheduled`, `past`). |
| `scheduled_at` | datetime (optional) | Date and time of the next scheduled visit. |

## Estimate

| Field | Type | Description |
|------|------|-------------|
| `id` | integer | Primary key for the estimate. |
| `job_id` | integer | Foreign key to the related job. |
| `crm_ref` | string | CRM reference for the estimate. |
| `total` | float | Total amount of the estimate. |
| `pdf_url` | string | URL to the PDF document containing the estimate. |
| `status` | string | Status of the estimate (`draft`, `pending`, `approved`). |

## Invoice

| Field | Type | Description |
|------|------|-------------|
| `id` | integer | Primary key for the invoice. |
| `job_id` | integer | Foreign key to the related job. |
| `crm_ref` | string | CRM reference for the invoice. |
| `amount_due` | float | Total amount due. |
| `status` | string | Invoice status (`open`, `paid`, `overdue`). |
| `stripe_pi` | string (optional) | Stripe PaymentIntent identifier used for payment. |

## Message

| Field | Type | Description |
|------|------|-------------|
| `id` | integer | Primary key for the message. |
| `job_id` | integer | Foreign key to the job thread. |
| `sender` | string | Who sent the message (`customer` or `staff`). |
| `text` | string | Body of the message. |
| `media` | array of strings (optional) | URLs to media attachments. |

## Membership

| Field | Type | Description |
|------|------|-------------|
| `id` | integer | Primary key for the membership record. |
| `plan` | string | Name of the membership plan (e.g. `Gold`). |
| `status` | string | Status of the membership (`active`, `expired`, `canceled`). |
| `renews_at` | datetime (optional) | Date when the membership will renew. |

## Promo

| Field | Type | Description |
|------|------|-------------|
| `id` | integer | Primary key for the promotion. |
| `title` | string | Short headline describing the promotion. |
| `body` | string | Detailed description of the promotion. |
| `target_segment` | string | Segment of customers to target (`all`, `members`, `past_customers`). |
| `active_from` | datetime (optional) | Start date of the promotion. |
| `active_to` | datetime (optional) | End date of the promotion. |

## FAQ

| Field | Type | Description |
|------|------|-------------|
| `id` | integer | Primary key for the FAQ. |
| `question` | string | The FAQ question. |
| `answer` | string | The answer to the question. |

## Sensor

| Field | Type | Description |
|------|------|-------------|
| `id` | integer | Primary key for the sensor. |
| `user_id` | integer | Owner of the sensor. |
| `property_id` | integer | Property associated with the sensor. |
| `type` | string | Sensor type (`HT1`). |
| `name` | string | User‑friendly name of the sensor. |

## SensorReading

| Field | Type | Description |
|------|------|-------------|
| `sensor_id` | integer | Foreign key to the sensor. |
| `ts` | datetime | Timestamp of the reading. |
| `temp` | float | Temperature reading (°F or °C depending on locale). |
| `rh` | float | Relative humidity percentage. |

This dictionary should be updated as new fields or entities are introduced.