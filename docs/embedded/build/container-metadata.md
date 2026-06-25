---
title: Store and Query Container Metadata
description: Define, update, and query SharePoint Embedded metadata with Graph columns and fields.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Store and Query Container Metadata
**Applies to**: Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Create metadata columns and query files by field values.
next: share-files-manage-permissions.md
-->
Use metadata when your app needs structured values for files in a SharePoint Embedded container.
Metadata is represented by columns on the container and field values on drive items.
Your app creates and manages the columns for each container instance.
For full examples, see [SharePoint Embedded Container Metadata](../development/tutorials/metadata.md).
> [!NOTE]
> Container owners can create, update, and delete columns. Container members can read and list columns.
## Define metadata
Start with the business questions your app needs to answer.
Map each question to a supported column type such as boolean, choice, currency, dateTime, hyperlinkOrPicture, number, personOrGroup, or text.
Use text for simple values, choice for controlled statuses, and dateTime or number for ranges.
Create the same schema during each container provisioning workflow.
## Name columns
Column names must follow SharePoint naming rules.
Avoid names that contain `!`, begin with digits or punctuation, contain spaces, resemble spreadsheet references, represent localized true or false values, or use reserved names such as `Author`, `Created`, or `Description`.
> [!TIP]
> Use stable internal names with friendly display names.
## Set metadata
Create columns under the container resource.
```http
POST https://graph.microsoft.com/beta/storage/fileStorage/containers/{container-id}/columns
Content-Type: application/json
```
```json
{
  "description": "Document title used by the app",
  "displayName": "Title",
  "hidden": false,
  "indexed": false,
  "name": "Title",
  "text": { "allowMultipleLines": false, "maxLength": 255 }
}
```
Set file values on the drive item's list item fields.
```http
PATCH https://graph.microsoft.com/beta/drives/{drive-id}/items/{item-id}/listitem/fields
Content-Type: application/json
```
```json
{ "Color": "Fuchsia", "Quantity": 934 }
```
Use `null` to clear a value when the column allows empty values.
## Update
Patch a column when supported properties such as description, hidden state, or required state change.
You cannot update the column `id`.
Treat schema changes as application migrations.
> [!CAUTION]
> Validate existing files before making a column required.
## Query and filter by metadata
Get all field values with `GET /drives/{drive-id}/items/{item-id}/listitem/fields`.
Use `$select` to return only the fields the UI needs.
Use drive item enumeration for exact metadata filters:
```http
GET https://graph.microsoft.com/beta/drives/{drive-id}/items?$orderby=listitem/fields/TestField asc&$filter=startswith(listitem/fields/TestField, '3')&$expand=listitem($expand=fields)
```
Use [Search containers and files](search-containers-files.md) for ranked free-text search.
## Design guidance
- Keep internal column names stable.
- Version your schema in app configuration.
- Create columns during provisioning.
- Avoid secrets in metadata.
- Index fields only when needed.
- Test containers with more than 5,000 items.
- Decide whether a value belongs on the container, folder, or file.
## Next step
Continue with [Share files and manage permissions](share-files-manage-permissions.md).
## Implementation checklist
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
