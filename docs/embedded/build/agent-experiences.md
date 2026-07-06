---
title: Add Microsoft 365 Copilot and Agent Experiences
description: Ground Copilot-style agents in SharePoint Embedded content and expose SPE to Microsoft Foundry.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Add Microsoft 365 Copilot and Agent Experiences
**Applies to**: Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Configure embedded agent chat and Foundry knowledge over SPE containers.
next: migrate-azure-blob-storage.md
-->
SharePoint Embedded agent experiences let your app answer questions over files stored in SharePoint Embedded containers. The recommended path is to use **Microsoft Foundry Agent Service** with a **SharePoint knowledge source** configured for SharePoint Embedded (see [Use SPE as a knowledge source in Microsoft Foundry](#use-spe-as-a-knowledge-source-in-microsoft-foundry-preview) below).

> [!CAUTION]
> The earlier **SharePoint Embedded agent SDK** (the React `ChatEmbedded` control) was **deprecated in March 2026** and replaced by [Microsoft Foundry Agent Service](/azure/foundry/agents/overview) with a [SharePoint knowledge source (Preview)](/azure/search/agentic-knowledge-source-how-to-sharepoint-remote) configured for SharePoint Embedded. Use the Foundry knowledge source for new work. The React SDK material below remains only for historical reference for existing integrations. See [SharePoint Embedded agent (Deprecated)](../development/declarative-agent/spe-da.md) and [Set up SPE as a knowledge source in Microsoft Foundry](../development/declarative-agent/sharepoint-embedded-knowledge-source.md).

## Configure the container type
Use a standard container type for agent scenarios when required by current billing guidance. Trial container types expire after 30 days and cannot be converted to standard container types.

Set `DiscoverabilityDisabled` to `false` so the agent can find files in the container type. If you update an existing container type, allow up to 24 hours for propagation before you create containers, upload files, or test agent chat.

```powershell
Set-SPOContainerTypeConfiguration -ContainerTypeId 4f0af585-8dcc-0000-223d-661eb2c604e4 -DiscoverabilityDisabled $false
```

Configure the hosts that can embed the chat iframe. The advanced source states that the default `frame-ancestors` policy is `none` when this setting is not configured.

```powershell
Set-SPOContainerTypeConfiguration -ContainerTypeId XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX -CopilotEmbeddedChatHosts @("http://localhost:3000", "https://contoso.sharepoint.com", "https://fabrikam.com")
```

A consuming tenant SharePoint Embedded Administrator can override `CopilotEmbeddedChatHosts` with `Set-SPOApplication`, but the override must be a subset of the owning tenant configuration.

```powershell
Set-SPOApplication -OwningApplicationId XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX -CopilotEmbeddedChatHosts @("https://contoso.sharepoint.com", "https://fabrikam.com")
```

## Add the React chat SDK (Deprecated — historical reference)

> [!CAUTION]
> This React `ChatEmbedded` SDK was deprecated in March 2026 and is not suitable for production. Use the [Foundry knowledge source](#use-spe-as-a-knowledge-source-in-microsoft-foundry-preview) instead. The steps below are retained only for existing integrations.

Install the package shown in the tutorial or the current package published for your preview program.

```console
npm install "https://download.microsoft.com/download/970802a5-2a7e-44ed-b17d-ad7dc99be312/microsoft-sharepointembedded-copilotchat-react-1.0.9.tgz"
```

Create an auth provider that returns a SharePoint token for the tenant host. The tutorial's required scope is `${hostname}/Container.Selected`.

```typescript
const authProvider: IChatEmbeddedApiAuthProvider = {
  hostname: 'https://m365x10735106.sharepoint.com',
  getToken: requestSPOAccessToken,
};
```

Add the `ChatEmbedded` component, pass the target container ID, and store the API from `onApiReady`.

```typescript
<ChatEmbedded
  onApiReady={setChatApi}
  authProvider={authProvider}
  containerId={container.id}
  style={{ width: 'calc(100% - 4px)', height: 'calc(100vh - 8px)' }}
/>
```

Open the chat with the API. A launch configuration can set the header, starter prompts, suggested prompts, instruction, and locale.

```typescript
await chatApi.openChat({
  header: 'My Awesome Chat',
  suggestedPrompts: ['What are my files?'],
  instruction: 'Answer using only the selected container content.',
  locale: 'en'
});
```

## Scope the agent response
The effective permissions for an agent session are the intersection of the user's access and the SharePoint Embedded application's access. Scope the experience to the smallest useful content set. The advanced source lists these data source types: `File`, `Folder`, `DocumentLibrary`, `Site`, `WorkingSet`, and `Meeting`.

Use file or folder scope for focused Q&A. Use the container or document library scope when users expect answers across a whole workspace. Show the active scope in the UI so users understand what content grounds the answer.

## Use SPE as a knowledge source in Microsoft Foundry (Preview)
Microsoft Foundry Agent Service can be configured with a SharePoint knowledge source that points at SharePoint Embedded content. This Foundry integration is in Preview.

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

You can also grant this permission during initial container type registration.

## Test user experience
Sign in with a user who has a Microsoft 365 Copilot license when required. Upload supported files to a container, wait for indexing, open the chat, and ask questions that can be answered from known file content. If answers omit expected files, check discoverability, supported file formats, app access, user access, scope selection, and indexing delay.

## Next steps

- [Migrate from Azure Blob Storage](migrate-azure-blob-storage.md)
