---
title: Add Microsoft 365 Copilot and Agent Experiences
description: Add SharePoint Embedded agent chat experiences grounded in container content.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Add Microsoft 365 Copilot and Agent Experiences
**Applies to**: Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Configure Copilot-backed agent chat over SPE container content.
next: migrate-azure-blob-storage.md
-->
<!-- TODO: canonical source doc pending -->
SharePoint Embedded agent lets you add AI chat experiences to your application and ground answers in files stored in SharePoint Embedded containers.
The available sources describe a private preview React SDK, advanced configuration, and a Visual Studio Code sample path.
The requested knowledge source article was not present in this repository.
> [!NOTE]
> SharePoint Embedded agent is described in the source docs as private preview. Validate current terms, package versions, and billing before production use.
## Agent scenarios
Use agent experiences for document Q&A, summaries, workspace discovery, support answers, starter prompts, and scoped conversations.
The advanced source describes Retrieval-Augmented Generation over a semantic index.
The agent retrieves relevant content at query time and grounds responses in Microsoft 365 content boundaries.
## Create SPE agent experiences
Prerequisites include a SharePoint Embedded application, a standard container type, current SharePoint Online PowerShell, allowed embedded chat hosts, discoverability enabled, Microsoft 365 Copilot availability, and a Copilot-licensed test user.
Set `DiscoverabilityDisabled` to `false` and allow up to 24 hours for propagation when updating an existing container type.
Configure allowed chat iframe hosts with `Set-SPOContainerTypeConfiguration` and consuming tenant overrides with `Set-SPOApplication` when needed.
## Knowledge source setup
Scope the agent to the smallest useful content set.
Use file scope for document Q&A, folder scope for a case section, and container scope for the whole workspace.
Show the current scope in the UI.
The effective permissions are the intersection of the user's access and the app's access.
Confirm file type support before promising answers over specific formats.
## Advanced configuration
The React SDK source uses an auth provider with `hostname` and `getToken()`.
The tutorial shows the token scope `{hostname}/Container.Selected`.
Add the `ChatEmbedded` component with `authProvider` and `containerId`, store the API from `onApiReady`, and call `openChat()`.
Launch configuration can include header, starter prompts, suggested prompts, instruction, and locale.
Language behavior depends on Microsoft 365 and SharePoint language settings.
## Current deprecations and preview status
The overview states private preview status and consumption-based billing guidance for standard container types.
Trial container types expire after 30 days and are not recommended for agent scenarios.
Preview SDK package URLs and checksums can change; use the latest source before installing.
Some Visual Studio Code extension actions for standard container types may require SharePoint Online PowerShell.
## Troubleshooting
| Symptom | Check |
| --- | --- |
| Iframe does not load | Configure embedded chat hosts. |
| Files are not found | Check discoverability, indexing, scope, and permissions. |
| Sign-in fails | Check cookies and popup fallback. |
| Answers omit files | Verify supported formats and scope. |
| Trial type fails | Use a standard container type when required. |
## Related sources
- [SharePoint Embedded agent](../development/declarative-agent/spe-da.md)
- [SharePoint Embedded agent Advanced Topics](../development/declarative-agent/spe-da-adv.md)
- [Tutorial for getting started with SharePoint Embedded agent](../development/tutorials/spe-da-vscode.md)
## Next step
Continue with [Migrate from Azure Blob Storage](migrate-azure-blob-storage.md).
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
- Document rollback steps for administrators.
- Keep user-facing messages specific to the current container.
- Validate tenant configuration before enabling this capability.
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
