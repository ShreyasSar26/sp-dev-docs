---
title: Add Real-Time Collaboration with Fluid Framework
description: Use Fluid Framework with SharePoint Embedded for synchronized collaborative data experiences.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Add Real-Time Collaboration with Fluid Framework
**Applies to**: Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Configure Fluid Framework with SPE and design collaborative patterns.
next: agent-experiences.md
-->
Use Fluid Framework when your SharePoint Embedded app needs low-latency shared state such as cursors, counters, canvases, or collaborative controls.
Fluid provides client libraries for distributing, synchronizing, and saving shared data.
For the source article, see [Fluid Framework in SharePoint Embedded Applications](../development/fluid.md).
## When to use Fluid
Use Fluid for multiple users editing structured app state, live presence, collaborative annotations, task boards, counters, or forms.
Do not use Fluid as a replacement for file storage.
Store documents in SharePoint Embedded containers and use Fluid for the synchronized interaction layer.
> [!TIP]
> A Fluid object can feel like a local TypeScript object, but it synchronizes across connected clients.
## Configure Fluid with SPE
Gather tenant admin credentials, a SharePoint Embedded application, client ID, container type ID, and at least one container.
Get IDs from the VS Code extension export, `Get-SPOContainerType`, or Microsoft Entra app registration.
Store IDs in environment configuration rather than source code.
## Run the sample
The source points to the Fluid Examples `item-counter-spe` sample.
```powershell
git clone https://github.com/microsoft/FluidExamples.git
cd .\FluidExamples\item-counter-spe\
```
Create `.env`:
```text
SPE_CLIENT_ID=YOUR_CLIENTID
SPE_CONTAINER_TYPE_ID=YOUR_CONTAINERTYPE_ID
```
Run:
```powershell
npm install
npm run dev
```
Open `https://localhost:8080`, sign in, grant consent, and open the URL in another tab to see live updates.
## Collaboration patterns
Use shared counters for votes, shared maps for key-value state, shared sequences for ordered content, presence for transient cursors, and sidecar state for collaboration around a file.
Persist final business outputs to durable storage when audit or reporting requires it.
## Limitations
Fluid does not replace SharePoint Embedded document storage.
Users need network connectivity for live collaboration.
Your app must handle reconnects, token refresh, and authorization failures.
Samples are starting points, not production security baselines.
> [!CAUTION]
> Do not store secrets or access tokens in shared Fluid data structures.
## Validate
Test one tab, two tabs, two users, read-only users, token expiration, network interruption, container switch, and inaccessible containers.
Verify state synchronization and permission-sensitive UI behavior.
## Next step
Continue with [Add Microsoft 365 Copilot and agent experiences](agent-experiences.md).
## Implementation checklist
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
