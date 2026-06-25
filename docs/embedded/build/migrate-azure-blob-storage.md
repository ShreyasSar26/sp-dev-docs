---
title: Migrate from Azure Blob Storage
description: Plan and execute a migration from Azure Blob Storage to SharePoint Embedded containers.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Migrate from Azure Blob Storage
**Applies to**: Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Map blobs to SPE files and validate migration results.
next: ../publish/prepare-customer-installation.md
-->
Use this guide when you move files from Azure Blob Storage to SharePoint Embedded.
The source tutorial demonstrates a C# sample that reads blobs with Azure Storage SDK and uploads them with Microsoft Graph.
For full sample details, see [Tutorial to migrate from Azure Blob Storage container to SharePoint Embedded container](../development/tutorials/migrate-abs-to-spe.md).
## Migration considerations
Decide which blob containers map to SharePoint Embedded containers, whether virtual folders become folders, which metadata values are preserved, how duplicates are handled, how failures are retried, and when users cut over.
The source sample is useful for hundreds of documents; larger migrations need batching, checkpointing, monitoring, and resumability.
## Map blobs to containers and files
Azure Blob Storage is flat, while SharePoint Embedded stores files as drive items.
Blob names with `/` can be parsed into folders.
The source sample creates a top-level folder named after the source container, then creates nested folders as needed.
Decide whether your destination should use that top folder or migrate directly under root.
## Metadata migration
Inventory blob metadata keys before migration.
Normalize names to SharePoint column naming rules.
Create destination columns before file upload.
Convert values to target column types.
After upload, patch drive item list item fields.
See [Store and query container metadata](container-metadata.md).
Do not store SAS URLs, account keys, or migration secrets as metadata.
## Upload flow
Connect to Azure Blob Storage with a container-level SAS URL that has read and list permissions.
Authenticate to SharePoint Embedded with Graph scopes such as `User.Read` and `FileStorageContainer.Selected` as shown in the sample.
Enumerate blobs, create destination folders, download each blob to a stream, create a Graph upload session, and upload with `LargeFileUploadTask`.
Use conflict behavior `fail` unless your business rules require replace or rename.
## Validation
Compare source blob count with destination file count for each batch.
Check file sizes, folder paths, required metadata, failed blob output, and existing destination files.
Verify users can open migrated files through the app.
Allow time for search and metadata indexing before validating query experiences.
## Cleanup
After business signoff, disable writes to the old blob-backed experience, rotate migration credentials, archive logs, decide source blob retention, update monitoring, and remove temporary blob lists when no longer needed.
> [!CAUTION]
> Do not delete source blobs until retention requirements and validation approvals are complete.
## Run the sample
The source sample accepts SAS URL, tenant ID, client ID, container ID, and optional blob list and failure output files.
```console
dotnet run Program.cs -- --sasurl "<sas url>" --tenantid "<tenant id>" --clientid "<client id>" --containerid "<container id>" [ --blobfile "<file name>" --outputfile "<file name>" ]
```
## Next step
Continue with [Prepare a customer installation](../publish/prepare-customer-installation.md).
## Implementation checklist
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
- Confirm this scenario is covered by automated or manual regression tests.
- Confirm this scenario is covered by automated or manual regression tests.
- Confirm this scenario is covered by automated or manual regression tests.
