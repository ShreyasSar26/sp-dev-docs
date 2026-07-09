---
title: Add Microsoft 365 Copilot and agent experiences
description: Ground Copilot-style agents in SharePoint Embedded content and expose SPE to Microsoft Foundry.
ms.date: 07/08/2026
ms.reviewer: pemtaira
ms.localizationpriority: high
---
# Add Microsoft 365 Copilot and agent experiences
**Applies to**: Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Configure Foundry knowledge sources over SPE containers.
next: migrate-azure-blob-storage.md
-->
SharePoint Embedded agent experiences let your app answer questions over files stored in SharePoint Embedded containers. The recommended path is to use **Microsoft Foundry Agent Service** with a **SharePoint knowledge source** configured for SharePoint Embedded (see [Use SPE as a knowledge source in Microsoft Foundry](#use-spe-as-a-knowledge-source-in-microsoft-foundry) below).

> [!CAUTION]
> The earlier **SharePoint Embedded agent SDK** (the React `ChatEmbedded` control) was **deprecated in March 2026** and replaced by [Microsoft Foundry Agent Service](/azure/foundry/agents/overview) with a [SharePoint knowledge source (preview)](/azure/search/agentic-knowledge-source-how-to-sharepoint-remote) configured for SharePoint Embedded. Use the Foundry knowledge source for new work; see [Use SPE as a knowledge source in Microsoft Foundry](#use-spe-as-a-knowledge-source-in-microsoft-foundry) below. For existing integrations, see [SharePoint Embedded agent (deprecated)](../development/declarative-agent/spe-da.md).

## Use SPE as a knowledge source in Microsoft Foundry
Microsoft Foundry Agent Service can be configured with a SharePoint knowledge source that points at SharePoint Embedded content. This Foundry integration is in preview.

Prerequisites are an SPE app with at least one container and at least one Copilot license on the tenant. During preview, the Copilot license is required; after preview, the feature is expected to move to metered billing.

Configure the SharePoint knowledge source with `remoteSharePointParameters.containerTypeId` set to your SharePoint Embedded container type.

Grant the Foundry app permission to your container type by updating the container type registration in consuming tenants. The Foundry application ID is `880da380-985e-4198-81b9-e05b1cc53158`.

```http
PUT /storage/fileStorage/containerTypeRegistrations/{fileStorageContainerTypeId}/applicationPermissionGrants/880da380-985e-4198-81b9-e05b1cc53158
Content-Type: application/json
```

```json
{
  "delegatedPermissions": ["readContent"],
  "applicationPermissions": ["none"]
}
```

Alternatively, grant this permission during initial container type registration.

## Test user experience
Sign in with a user who has a Microsoft 365 Copilot license when required. Upload supported files to a container, wait for indexing, open the chat, and ask questions the file content can answer. If answers omit expected files, check discoverability, supported file formats, app access, user access, scope selection, and indexing delay.

## Next steps

- [Migrate from Azure Blob Storage](migrate-azure-blob-storage.md)
