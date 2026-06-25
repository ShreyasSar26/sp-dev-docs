---
title: Create and Configure a Container Type
description: Create a trial or production SharePoint Embedded container type and configure its owning app and billing model.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Create and Configure a Container Type
**Applies to:** Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Create a container type, connect it to an owning app, and choose the right billing configuration.
next: register-application-permissions.md
-->
Create a SharePoint Embedded container type before your application creates containers or stores files. A container type defines access, billing accountability, and selected behaviors for containers created by your app.
If you're just starting, complete [Quickstart: Build your first app with VS Code](quickstart-vscode.md). Then use this article for trial, standard, and pass-through decisions.
To decide between single-tenant and multitenant models first, see [Choose an app model](../plan/choose-app-model.md).
## Understand the container type relationship
A container type is strongly coupled with one Microsoft Entra ID application, called the owning application.
SharePoint Embedded requires a one-to-one relationship between one owning application and one container type.
The container type ID is stored on each container as an immutable property.
The ID is used for access authorization, trial exploration, billing, and configurable behaviors.
For full details, see [Create New SharePoint Embedded Container Types](../getting-started/containertypes.md).
## Choose trial or production
Choose the container type purpose when you create it.
You can't convert a trial container type to production later.
You can't convert a standard billing type to pass-through billing later.
| Use case | Container type |
|---|---|
| Local proof of concept | Trial container type |
| App owner pays | Standard container type with billing profile |
| Customer tenant pays | Standard container type with pass-through billing |
> [!IMPORTANT]
> If you choose the wrong purpose or billing model, delete and recreate the container type after removing its containers.
## Prerequisites
Before you create a container type, make sure you have:
- A Microsoft 365 tenant with SharePoint available.
- A Microsoft Entra ID app registration for the owning app.
- The SharePoint Embedded Administrator or Global Administrator role.
- The latest SharePoint Online Management Shell.
- For standard billing, an Azure subscription and resource group.
- For billing setup, owner or contributor permissions on the Azure subscription.
> [!NOTE]
> Users who authenticate into containers must exist in Microsoft Entra ID as members or guests. An Office license isn't required to collaborate on Office documents stored in a container, except for documented exceptional experiences such as mentions.
## Create a trial container type
Use a trial container type for development and evaluation.
You can create one with the SharePoint Embedded Visual Studio Code extension or with SharePoint PowerShell.
The Visual Studio Code path is fastest for a first app. See [Quickstart: Build your first app with VS Code](quickstart-vscode.md).
PowerShell cmdlet pattern:
```powershell
New-SPOContainerType -TrialContainerType -ContainerTypeName <String> -OwningApplicationId <String> -ApplicationRedirectUrl <String>
```
Trial restrictions include:
- One trial container type per developer in a tenant.
- Up to five containers, including active and recycled containers.
- Up to 1 GB of storage per container.
- Expiration after 30 days.
- Use only in the developer tenant.
- No conversion to production.
## Create a standard container type with app-owner billing
Use standard billing when the developer or app owner tenant pays for consumption.
1. Create or identify the owning Microsoft Entra ID application.
1. Connect with `Connect-SPOService`.
1. Create the container type with `New-SPOContainerType`.
1. Attach the Azure billing profile with `Add-SPOContainerTypeBilling`.
1. Record the container type ID.
1. Continue to registration in the consuming tenant.
Cmdlet pattern:
```powershell
New-SPOContainerType -ContainerTypeName <String> -OwningApplicationId <String> -ApplicationRedirectUrl <String>
```
Attach billing:
```powershell
Add-SPOContainerTypeBilling -ContainerTypeId <ContainerTypeId> -AzureSubscriptionId <AzureSubscriptionId> -ResourceGroup <ResourceGroup> -Region <Region>
```
> [!NOTE]
> If billing setup fails with `SubscriptionNotRegistered`, wait several minutes and retry. The `Microsoft.Syntex` resource provider registration can take time.
## Create a pass-through billing container type
Use pass-through billing when the consuming tenant pays for consumption.
1. Create or identify the owning Microsoft Entra ID application.
1. Create the container type with the pass-through billing flag.
1. Register the container type in the consuming tenant.
1. Have the consuming tenant admin activate pay-as-you-go services.
Cmdlet pattern:
```powershell
New-SPOContainerType -ContainerTypeName <String> -OwningApplicationId <String> -ApplicationRedirectUrl <String> -IsPassThroughBilling
```
> [!IMPORTANT]
> The consuming tenant must complete billing setup before a pass-through application can be used successfully.
## Configure the owning Entra app
Configure the app so it can own exactly one container type.
Request Microsoft Graph permissions for SharePoint Embedded access.
Request SharePoint `Container.Selected` application permission for registration scenarios when required.
Use redirect URIs that match your development and production clients.
Use credentials appropriate for delegated or app-only flows.
For auth details, see [Configure authentication and authorization](configure-authentication-authorization.md).
## Set basic properties
| Property | Guidance |
|---|---|
| Container type name | Use a durable name that maps to your workload. |
| Owning application ID | Use the app registration that owns this type. |
| Application redirect URL | Use the URL where files from this app should redirect. |
| Billing model | Choose trial, standard, or pass-through at creation time. |
> [!CAUTION]
> The container type ID and owning application ID can't be updated later.
## Configure container type behavior
Developer admins can configure selected behaviors after creation.
Available settings include:
- `ApplicationRedirectUrl`
- `CopilotEmbeddedChatHosts`
- `DiscoverabilityDisabled`
- `SharingRestricted`
Use [Set-SPOContainerType](/powershell/module/sharepoint-online/Set-SPOContainerType) and [Set-SPOContainerTypeConfiguration](/powershell/module/sharepoint-online/Set-SPOContainerTypeConfiguration).
The source article includes examples for discoverability, sharing, and Copilot Embedded chat hosts.
## View and update container types
Use [Get-SPOContainerType](/powershell/module/sharepoint-online/Get-SPOContainerType) to list container types.
Use [Set-SPOContainerType](/powershell/module/sharepoint-online/Set-SPOContainerType) to update supported properties.
You need SharePoint Embedded Administrator permission for basic updates.
You need owner or contributor access to billing subscriptions for billing changes.
## Understand billing dependency
For app-owner billing, the developer tenant attaches an Azure subscription and resource group.
For pass-through billing, the consuming tenant activates pay-as-you-go services.
For details, see [SharePoint Embedded meters](../administration/billing/meters.md) and [SharePoint Embedded billing management](../administration/billing/billingmanagement.md).
## Link to multitenant onboarding
A multitenant app usually has an owning tenant and one or more consuming tenants.
Use this sequence for each consuming tenant:
1. Create the container type in the owning tenant.
1. Ask the consuming tenant admin to grant admin consent.
1. Register container type application permissions.
1. Configure pass-through billing when the consuming tenant pays.
1. Validate container creation and access.
## Next steps
Register permissions in [Register application permissions](register-application-permissions.md).
