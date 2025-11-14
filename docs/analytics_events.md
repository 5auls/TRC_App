# Analytics Events

To understand how customers use the app and to identify opportunities for improvement, the Triangle Reconstruction customer portal should emit structured analytics events.  These events can be sent to Firebase Analytics, Amplitude or another analytics platform.  Each event includes a name and a set of parameters.  Personally identifiable information (PII) should never be sent in analytics payloads.

## Core Events

| Event Name | Trigger | Parameters |
|-----------|---------|------------|
| `app_open` | App foregrounds from a cold or warm start. | `timestamp`, `platform` |
| `sign_in_complete` | User completes sign‑in or sign‑up flow. | `method` (e.g. `google`, `apple`, `email`) |
| `request_created` | A service request is submitted. | `category`, `has_media` (boolean) |
| `estimate_viewed` | User opens an estimate document. | `estimate_id` |
| `estimate_approved` | User approves an estimate or change order. | `estimate_id`, `job_id` |
| `invoice_paid` | Payment for an invoice completes successfully. | `invoice_id`, `job_id`, `amount` |
| `chat_message_sent` | Customer sends a chat message. | `job_id`, `length` (characters) |
| `promo_clicked` | User taps a promotional banner or push notification. | `promo_id` |
| `membership_joined` | User enrolls in a membership plan. | `plan_name` |
| `sensor_alert_acknowledged` | User opens a sensor alert and taps “Create Service Request.” | `sensor_id`, `threshold` |

## Funnels

Tracking funnels helps measure conversion through key flows.  At minimum the following funnels should be instrumented:

1. **Request to Payment Funnel**
   1. `request_created`
   2. `estimate_viewed`
   3. `estimate_approved`
   4. `invoice_paid`

2. **Membership Funnel**
   1. `promo_clicked` (for membership offers)
   2. `membership_joined`

## Retention Metrics

Segment users by sign‑up date and measure retention at 7, 30 and 90 days.  Compare retention between members vs. non‑members and across service categories.  Additional cohort analyses can be built once data volume increases.

## Implementation Notes

* Use consistent naming conventions (lowercase, underscore‑separated) for event names.
* Define a TypeScript interface or constant list of allowed events to prevent typos.
* Ensure events are not logged in debug builds or automated tests to avoid polluting production analytics.
* Use separate analytics IDs/streams for development, staging and production environments.