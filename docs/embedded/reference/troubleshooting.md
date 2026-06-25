---
title: Troubleshooting
description: Common SharePoint Embedded setup, auth, billing, Office, search, webhook, and admin issues.
ms.date: 06/25/2026
ms.localizationpriority: high
---

# Troubleshooting

**Applies to:** Developer

<!-- agent:
task_type: reference
audience: developer
outcome: Diagnose common SharePoint Embedded implementation and administration issues.
next: ../build/create-manage-containers.md
-->

Use this reference to identify likely causes and fixes. For end-to-end setup, see [create and manage containers](../build/create-manage-containers.md), [manage files](../build/manage-files.md), and [monitor usage, billing, and cost](../admin/monitor-usage-billing-cost.md).

| Issue | Likely cause | Fix | Related task |
| --- | --- | --- | --- |
| Container type creation fails or cmdlets aren't available. | The latest SharePoint Online Management Shell isn't installed, or the user isn't a SharePoint Embedded Administrator or Global Administrator. | Install the latest SharePoint Online Management Shell, connect with `Connect-SPOService`, and assign the required role. | [Manage containers with PowerShell](../admin/manage-containers-powershell.md) |
| Standard container type billing setup fails with `SubscriptionNotRegistered`. | The source article notes `Microsoft.Syntex` might not be registered as a resource provider. | Wait 5-10 minutes after the cmdlet sends registration, then retry. Ensure the admin has owner or contributor permissions on the Azure subscription. | [Choose a billing model](../plan/choose-billing-model.md) |
| Access denied when calling container or file APIs. | The container type hasn't been registered in the consuming tenant, or the application lacks container type application permissions. | Grant admin consent, call the container type registration API, and verify delegated or app-only permissions include the required operations. | [Create and manage containers](../build/create-manage-containers.md) |
| Admin consent can't be completed in the portal. | The `Container.Selected` application permission on Office 365 SharePoint Online is hidden. | Construct the Microsoft identity platform admin consent URL for the consuming tenant and have an administrator complete consent. | [Configure authentication](../build/configure-authentication-authorization.md) |
| Delegated API calls return `403 Forbidden` when listing containers. | The signed-in user doesn't have a OneDrive; the source article notes this dependency for list containers on behalf of a user. | Use app-only mode for list containers, or ensure the user has the required OneDrive dependency until the dependency is removed. | [Create and manage containers](../build/create-manage-containers.md) |
| Pass-through app users lose access. | Pass-through billing hasn't been configured, SharePoint Embedded was turned off, or the linked Azure subscription was disconnected. | Configure pay-as-you-go services for SharePoint Embedded in the Microsoft 365 admin center and confirm the Azure subscription remains linked. | [Monitor usage, billing, and cost](../admin/monitor-usage-billing-cost.md) |
| Office documents open but mentions don't resolve expected users. | Mentions require target users to have a Microsoft 365 license and are restricted to people inside the consuming tenant organization. | Assign the required Microsoft 365 license to internal target users; don't expect guest or cross-tenant users in the mentions picker. | [Manage files](../build/manage-files.md) |
| Search returns unexpected containers or content. | Microsoft Search runs in the context of the signed-in user and can return content the user can access unless scoped. | Include `ContainerTypeId` or `ContainerId` in the query string. If discoverability is disabled, set `includeHiddenContent` as documented. | [Build search experiences](../build/search-containers-files.md) |
| Search API calls fail because of permissions. | Search scenarios require delegated Microsoft Graph permissions during preview, including `Files.Read.All` in addition to `FileStorageContainer.Selected`. | Request and consent to the required delegated permissions and retest with a signed-in user. | [Build search experiences](../build/search-containers-files.md) |
| Webhook subscription validation fails. | The notification endpoint doesn't echo the `validationToken` as plain text, or the endpoint isn't publicly reachable. | Return `200` with the `validationToken` and `Content-Type: text/plain`; expose the endpoint through a reachable public URL. | [Use webhooks](../build/respond-to-changes-webhooks.md) |
| Webhook notifications don't identify the intended container. | The subscription notification URL doesn't carry the container ID, or the handler doesn't read it. | Append `driveId={{ContainerId}}` to the notification URL and have the handler read the `driveId` query parameter. | [Use webhooks](../build/respond-to-changes-webhooks.md) |
| Container isn't visible in SharePoint Admin Center or PowerShell. | The admin is using the wrong owning application ID, identity, or role. | Use `Get-SPOApplication`, then query containers with `Get-SPOContainer -OwningApplicationId <OwningApplicationId>`. | [Manage containers with PowerShell](../admin/manage-containers-powershell.md) |

## Diagnostic links

- [Authentication and authorization](../development/auth.md)
- [Container types](../getting-started/containertypes.md)
- [Billing](../administration/billing/billing.md)
- [PowerShell reference](powershell.md)
- [Microsoft Graph API reference links](graph-api-links.md)

