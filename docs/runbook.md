# Operational Runbook

This runbook outlines procedures for deploying, monitoring and maintaining the Triangle Reconstruction customer portal application.  It assumes the production environment consists of a managed Kubernetes cluster or similar container orchestration system, a PostgreSQL database, Redis instance, and object storage (S3 or compatible).

## Environment Configuration

### Environments

The system should run in three distinct environments:

| Environment | Purpose | Resources |
|------------|--------|----------|
| **development** | Used by engineers for local testing and feature development. | Lightweight resources; local services or Docker Compose. |
| **staging** | Mirrors production as closely as possible.  Used for QA and UAT. | Separate Firebase project, Stripe test account, Jobber sandbox. |
| **production** | Live environment.  Serves end users. | Production Firebase project, live Stripe and Jobber credentials. |

Each environment should have its own set of Firebase configuration files, Stripe keys and Jobber credentials.  Never mix test and production credentials.

### Secrets Management

Use a secrets manager (e.g. AWS Secrets Manager, HashiCorp Vault or Kubernetes Secrets) to store API keys and credentials.  Do not hard‑code secrets in the codebase.  The backend will load secrets via environment variables at runtime.

## Deployment

1. **Build and push images** – Use GitHub Actions or another CI system to build Docker images for the backend and admin console.  Tag images with the Git commit SHA and environment.
2. **Run database migrations** – Apply Prisma or Alembic migrations to the PostgreSQL database before deploying new backend versions.
3. **Deploy to cluster** – Apply updated manifests or Helm charts.  Use rolling updates to avoid downtime.
4. **Verify health** – Check liveness and readiness probes.  Monitor error logs and performance metrics.

## Push Notification Certificates

Push notifications are sent via Firebase Cloud Messaging (FCM) and Apple Push Notification service (APNs).  APNs requires renewal of the push certificate every 12 months.

1. **Track expiration** – Add a calendar reminder 30 days before the certificate expiry date.
2. **Renew** – Log in to the Apple Developer portal, create a new APNs auth key or certificate and download it.
3. **Update Expo** – Upload the new key/certificate to the Expo notifications service or update your custom push gateway.
4. **Test** – Send a test notification to both iOS and Android devices to confirm delivery.

## Webhook Retry Strategy

Several actions (e.g. new requests, invoice payment) rely on webhooks to external systems (Jobber, Stripe).  Implement a retry mechanism with exponential back‑off and dead‑letter queue:

* On webhook failure, place the event into a Redis queue with a retry counter.
* Use a worker to process retries.  Increase the delay between attempts (e.g. 1 min, 5 min, 30 min, 2 hr).
* After a configurable number of attempts, move the event to a dead‑letter queue and alert the on‑call engineer.

## Backups and Disaster Recovery

* **Database backups** – Perform daily automated backups of the PostgreSQL database.  Store backups in secure object storage with a retention policy (e.g. 30 days).  Periodically test restore procedures.
* **File storage** – Use versioning on the S3 bucket that stores documents, photos and reports.  Enable lifecycle policies to transition old versions to cold storage.
* **Infrastructure as Code** – Maintain Terraform or CloudFormation scripts in source control.  This allows recreation of the entire stack in the event of catastrophic failure.

## Monitoring and Alerting

* **Application metrics** – Use Prometheus or a managed monitoring service to collect CPU, memory, request latency and error rates.  Set alert thresholds for high error rates and slow response times.
* **Logs** – Aggregate logs from the backend and mobile app using a centralized logging system (e.g. ELK, CloudWatch, Datadog).  Mask PII in logs.
* **Crash reporting** – Use Sentry to capture unhandled exceptions in both the backend and mobile app.  Integrate alerts with Slack or PagerDuty.

## Incident Response

1. **Triage** – Acknowledge alerts and assess impact.  Determine whether the issue affects all users or a subset.
2. **Mitigation** – Roll back recent deployments if a bug was introduced.  Use feature flags to disable problematic features without redeploying.
3. **Communication** – Provide status updates to stakeholders and, if necessary, post an incident notice on the company’s status page.
4. **Post‑mortem** – After resolution, document the root cause and action items to prevent recurrence.