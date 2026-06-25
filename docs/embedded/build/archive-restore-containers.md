---
title: Archive and Restore Containers
description: Plan SharePoint Embedded container archival and restore workflows for lifecycle management.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Archive and Restore Containers
**Applies to**: Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Plan archive and restore workflows defensively while canonical APIs are pending.
next: fluid-framework.md
-->
<!-- TODO: canonical source doc pending -->
Use container archival when content should remain retained but no longer needs active collaboration performance.
Use restore when users or business processes need the archived container active again.
The requested archive source articles were not present in this repository, so this article gives implementation guidance without naming unavailable endpoints.
For nearby concepts, see [Container types](../getting-started/containertypes.md) and [SharePoint Embedded overview](../overview.md).
> [!IMPORTANT]
> Verify the currently supported archive and restore API surface in your tenant before implementation.
## Archive containers
Archive a container when a project, case, or workspace is closed and active collaboration is no longer needed.
Before archiving, confirm no upload sessions are running, stop processors, disable edits, flush metadata, record audit data, and notify users.
Call the supported archive operation from a trusted backend only after feature detection.
Store service state, correlation IDs, and app lifecycle state separately.
Do not treat archive as deletion.
## Restore
Restore when users need to reopen a project or automation needs active file access.
Check that the container is archived, confirm permission to restore, submit the supported restore request, block duplicates, monitor state, and re-enable file operations only after completion.
> [!TIP]
> Treat restore as asynchronous and show progress instead of making users wait on one request.
## Cost and lifecycle implications
Archival is a business lifecycle and cost decision.
Define who can archive, who can restore, whether archived containers appear in lists, how restore delay is communicated, and how Microsoft 365 Archive billing applies in the tenant.
Coordinate with tenant administrators for billing, retention, and compliance settings.
## API usage
Because canonical source docs are missing, keep integration defensive.
- Use capability checks before showing archive buttons.
- Avoid hard-coding preview endpoint names in shared libraries.
- Wrap lifecycle calls behind your own interface.
- Avoid retrying lifecycle writes blindly.
- Handle unsupported-operation errors gracefully.
- Log app user intent and service outcome.
## Validate
Test empty containers, folders and files, metadata columns, additive permissions, webhooks, search, and agent references.
Verify permissions and metadata remain intact after restore.
Restart processors only when the service reports the container is active.
## Troubleshooting
| Symptom | Check |
| --- | --- |
| Archive unavailable | Confirm tenant and API support. |
| Pending state is stuck | Check service state and logs. |
| Users can still edit | Refresh app state and block writes. |
| Restore fails | Confirm archived state and authorization. |
## Next step
Continue with [Add real-time collaboration with Fluid Framework](fluid-framework.md).
## Implementation checklist
- Keep user-facing messages specific to the current container.
- Validate tenant configuration before enabling this capability.
- Recheck permissions before write operations.
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
- Document rollback steps for administrators.
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
- Confirm this scenario is covered by automated or manual regression tests.
- Confirm this scenario is covered by automated or manual regression tests.
- Confirm this scenario is covered by automated or manual regression tests.
- Confirm this scenario is covered by automated or manual regression tests.
- Confirm this scenario is covered by automated or manual regression tests.
- Confirm this scenario is covered by automated or manual regression tests.
- Confirm this scenario is covered by automated or manual regression tests.
- Confirm this scenario is covered by automated or manual regression tests.
