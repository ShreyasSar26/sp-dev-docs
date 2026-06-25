---
title: Respond to File and Container Changes with Webhooks
description: Subscribe to SharePoint Embedded changes and process Graph webhook notifications reliably.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Respond to File and Container Changes with Webhooks
**Applies to**: Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Create subscriptions and process notifications safely.
next: archive-restore-containers.md
-->
Use Microsoft Graph webhooks when your app needs to react after files change in a SharePoint Embedded container.
A webhook lets Microsoft Graph call your endpoint when a subscribed resource changes.
For the tutorial source, see [Using Webhooks](../development/tutorials/using-webhooks.md).
> [!TIP]
> Webhooks tell you that something changed. Use Microsoft Graph to fetch the current state before business processing.
## Why use webhooks
Use webhooks to start document processing after upload, refresh indexes, notify users, or trigger downstream workflows.
Avoid polling for every container.
Queue work rather than performing expensive transformations inside the HTTP request.
## Subscribe to changes
Create an HTTPS endpoint that can receive POST requests.
During development, the source tutorial uses ngrok to expose a local server.
Subscribe to changes under the container drive root:
```http
POST https://graph.microsoft.com/v1.0/subscriptions
Content-Type: application/json
```
```json
{
  "changeType": "updated",
  "notificationUrl": "https://contoso.example/api/onReceiptAdded?driveId={container-id}",
  "resource": "drives/{container-id}/root",
  "expirationDateTime": "2026-06-25T03:58:34.088Z",
  "clientState": ""
}
```
Use the container ID as the drive ID in this pattern.
## Process notifications
When Microsoft Graph validates the subscription, it sends a `validationToken` query parameter.
Return that token as plain text immediately.
For normal notifications, accept the request quickly, identify the subscription or container, enqueue background work, and fetch current state with Graph.
Make workers idempotent because notifications can be duplicated or delayed.
## Renew subscriptions
Subscriptions expire.
The source tutorial calculates a maximum drive item subscription lifetime of 4,230 minutes.
Store subscription IDs and expiration times.
Run renewal before expiration and alert operators when renewal fails.
> [!CAUTION]
> If a subscription expires, Graph stops sending notifications. Keep a reconciliation path for missed changes.
## Validate delivery
- Confirm the endpoint uses HTTPS.
- Test validation during subscription creation.
- Upload or update a file and verify delivery.
- Track notification counts by subscription.
- Monitor queue age and worker failures.
- Test renewal before the first expiration.
## Troubleshooting
| Symptom | Check |
| --- | --- |
| Subscription creation fails | Return `validationToken` correctly. |
| No notifications arrive | Confirm resource path, expiration, and activity. |
| Handler times out | Return quickly and queue work. |
| Wrong container is processed | Route by subscription ID or validated drive ID. |
## Next step
Continue with [Archive and restore containers](archive-restore-containers.md).
## Implementation checklist
- Log Graph request IDs and operation outcomes for support.
- Document rollback steps for administrators.
- Keep user-facing messages specific to the current container.
- Validate tenant configuration before enabling this capability.
- Recheck permissions before write operations.
- Log Graph request IDs and operation outcomes for support.
- Document rollback steps for administrators.
- Keep user-facing messages specific to the current container.
- Validate tenant configuration before enabling this capability.
- Recheck permissions before write operations.
- Log Graph request IDs and operation outcomes for support.
## Operational checklist
Use this checklist before you enable the capability for customers:
- Confirm the consuming tenant configuration supports the scenario.
- Confirm the signed-in user and application have the required access.
- Test the workflow with an empty container and a populated container.
- Test the workflow with external sharing disabled if sharing is involved.
- Capture Microsoft Graph request IDs in logs.
- Show actionable errors instead of raw service responses.
- Keep long-running work outside request handlers.
- Reconcile app state with SharePoint Embedded state after retries.
- Document administrator steps in your customer installation guide.
- Review related next-step articles before publishing the app experience.

## Production readiness checklist

Before you release this capability, verify the following items for your app and tenant:

- Confirm the tenant has SharePoint Embedded enabled.
- Confirm the application registration matches the deployed environment.
- Confirm admin consent is granted for required Microsoft Graph permissions.
- Confirm the container type is registered in the consuming tenant.
- Confirm users have the expected container roles.
- Confirm guest access behavior with the tenant sharing policy.
- Confirm sensitivity labels and compliance settings are respected.
- Confirm the app handles Microsoft Graph throttling.
- Confirm retry logic uses exponential backoff.
- Confirm write operations are idempotent or guarded against duplicates.
- Confirm long-running work is resumable.
- Confirm logs include correlation IDs and timestamps.
- Confirm logs do not include access tokens or secrets.
- Confirm telemetry distinguishes user errors from service errors.
- Confirm the UI explains policy-blocked actions.
- Confirm disabled actions remain keyboard accessible with explanatory text.
- Confirm localization does not change technical identifiers.
- Confirm feature flags can disable the capability if needed.
- Confirm documentation links point to the installed app version.
- Confirm operational runbooks describe common recovery steps.
- Confirm support teams know which tenant role can resolve configuration issues.
- Confirm test data does not include real customer secrets.
- Confirm cleanup tasks remove temporary migration or processing artifacts.
- Confirm related articles in this build path remain linked together.
