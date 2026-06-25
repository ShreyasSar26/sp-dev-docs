---
title: Search Containers and Files
description: Search SharePoint Embedded containers and files with Microsoft Search and safe scoping.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Search Containers and Files
**Applies to**: Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Use Microsoft Search to find SPE containers and files safely.
next: container-metadata.md
-->
Use Microsoft Search in Microsoft Graph when your app needs keyword search across SharePoint Embedded containers or files.
Search complements direct enumeration APIs: search ranks content by relevance, while enumeration filters known drive items by metadata.
For complete query examples and advanced managed property syntax, see [Search SharePoint Embedded content](../development/content-experiences/search-content.md).
> [!NOTE]
> SharePoint Embedded search is in preview and supports delegated permissions only.
> If your app opted out of Microsoft 365 content discoverability, set `sharePointOneDriveOptions.includeHiddenContent` to `true`.
> [!IMPORTANT]
> Always scope queries by `ContainerTypeId` or `ContainerId` so results stay aligned with your app.
## Search container content
Send requests to Microsoft Graph search:
```http
POST https://graph.microsoft.com/beta/search/query
Content-Type: application/json
```
Use `entityTypes: ["drive"]` to return container instances.
Filter by the container type ID in the query string.
```json
{
  "requests": [
    {
      "entityTypes": ["drive"],
      "query": {
        "queryString": "ContainerTypeId:498c6855-8f0e-0de7-142e-4e9ff86af9ae"
      },
      "sharePointOneDriveOptions": { "includeHiddenContent": true }
    }
  ]
}
```
Use title or description terms with the same container type scope, for example `Title:'contoso' AND ContainerTypeId:{id}`.
## Query files
Use `entityTypes: ["driveItem"]` for files and folders.
Scope an in-container search with `ContainerId`.
```json
{
  "requests": [
    {
      "entityTypes": ["driveItem"],
      "query": {
        "queryString": "Title:'contoso' AND ContainerId:b!UBoDBcfpTEeInnz0Rlmlsp6EC-DsPN5Kj3uW0fD1mPp9ptYmB71GRpxbhbDlGdb0"
      },
      "sharePointOneDriveOptions": { "includeHiddenContent": true }
    }
  ]
}
```
For cross-container app search, use text terms with `ContainerTypeId`.
Return selected properties with `fields` and sort only on sortable managed properties.
## Permissions and security trimming
Search results are trimmed to the signed-in user.
Your app must also be authorized for the returned container type before it can open or modify a result.
Treat search as discovery, then validate access through Graph before file operations.
- Include `ContainerTypeId` when searching containers or all content for an app.
- Include `ContainerId` when searching a specific workspace.
- Do not cache search results as durable proof of access.
- Keep result cards minimal until the item is opened through an authorized path.
## Paging
When `moreResultsAvailable` is `true`, request the next page using Microsoft Search paging options.
Keep the original query, entity type, and scoping conditions unchanged.
Load more results only when the user scrolls or selects **Show more**.
Avoid preloading every page in large tenants.
## Troubleshooting results
| Symptom | Check |
| --- | --- |
| No results | Confirm user access, indexing, and delegated permissions. |
| Wrong app results | Add or verify `ContainerTypeId`. |
| Hidden content missing | Set `includeHiddenContent` when discoverability is disabled. |
| Open fails | Confirm app access to the container type and item. |
| Sort fails | Use only sortable properties. |
> [!TIP]
> For exact metadata filters, use [Store and query container metadata](container-metadata.md).
## Next step
Continue with [Store and query container metadata](container-metadata.md).
## Implementation checklist
- Recheck permissions before write operations.
- Log Graph request IDs and operation outcomes for support.
- Document rollback steps for administrators.

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
