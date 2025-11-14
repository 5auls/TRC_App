# Information Architecture

This document describes the high‑level structure of the Triangle Reconstruction customer portal mobile app.  It serves as a reference for designers, developers and stakeholders when implementing the user interface.

## Navigation

The app uses a bottom tab navigation pattern with six primary sections:

| Tab | Purpose |
|----|---------|
| **Home** | Dashboard summarizing the next scheduled visit, any open invoices, membership status, latest sensor alerts and a promotional tile. |
| **Jobs** | Lists open and past jobs by status (open, scheduled, past).  Job details include status timeline, scheduled visit, technician ETA, notes, photos, estimates and documents.  Users can approve estimates and change orders here. |
| **Requests** | Allows customers to create new service requests or view and reschedule existing ones.  A new request flow guides them through selecting a category (e.g. crawlspace encapsulation, foundation repair), describing the issue, attaching photos/video, selecting the property and choosing preferred time slots. |
| **Invoices** | Shows open and paid invoices with the ability to pay using saved cards or ACH.  Receipts are available as PDFs and emailed automatically. |
| **Messages** | Secure chat threads for each job.  Users can send text and attachments; staff replies trigger push notifications. |
| **Account** | Manage profile information, properties, payment methods, notification settings and membership plans. |

## Request Flow

1. **Category Selection** – The user selects the type of service needed.  Categories reflect the company’s core offerings: **Crawlspace Repairs**, **Structural/Foundation Repairs**, **Waterproofing**, **Mold Remediation** and **Attic Solutions**.  Additional sub‑services can be added later via the admin console.
2. **Describe & Attach** – The user enters a description and uploads photos or video.  Media upload includes basic markup tools to highlight problem areas.
3. **Property** – The user chooses one of their saved properties or enters a new address.  The address form should restrict service area to central North Carolina (Wake, Johnston, Harnett, Durham and surrounding counties) and provide autocomplete suggestions.
4. **Time Slots** – The user selects preferred appointment windows from an availability calendar.  The backend will synchronize these slots with Jobber once integrated.
5. **Confirmation** – A summary of the request is displayed before submission.  After submission, the user sees a status page and receives push/email confirmation.

## Data Entities

The following entities underpin the app’s data model:

| Entity | Description |
|------|-------------|
| **User** | Represents the authenticated customer.  Contains identifiers, contact details and notification preferences. |
| **Property** | A physical address associated with the user.  Stores access notes and supports multiple properties per user. |
| **Job** | A work order created from a service request.  Tracks CRM reference ID, status, scheduled visits, notes and attachments. |
| **Estimate** | A quote linked to a job.  Contains total amount, PDF URL and approval status. |
| **Invoice** | Billing information for a job.  Includes the amount due, payment status and Stripe PaymentIntent ID. |
| **Message** | A chat message associated with a job thread.  Stores sender, text and optional media attachments. |
| **Membership** | Represents a customer’s subscription tier, renewal date and benefits. |
| **Promo** | Marketing promotions targeted at specific customer segments. |
| **Sensor** | Optional IoT device associated with a property.  Stores sensor type and readings (temperature and relative humidity). |

This information architecture will be refined during the design phase to include detailed wireframes and user interface specifications.