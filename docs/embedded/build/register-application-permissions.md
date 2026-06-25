---
title: Register Application Permissions
description: Register SharePoint Embedded container type application permissions in a consuming tenant.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Register Application Permissions
**Applies to:** Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Register container type permissions, grant admin consent, and validate access in a consuming tenant.
next: configure-authentication-authorization.md
-->
Register container type application permissions before your SharePoint Embedded app creates containers or accesses content in a consuming tenant.
Complete [Create and configure a container type](create-container-type.md) first so you have a container type ID and owning application.
## Why registration is required
A SharePoint Embedded application can't interact with containers in a consuming tenant until the container type is registered in that tenant.
Registration controls:
- Which application IDs can access the container type.
- Which delegated permissions each application has.
- Which app-only permissions each application has.
- Whether guest applications can interact with the owning application's containers.
If registration is missing or incomplete, later calls can fail with access denied errors.
For the full reference, see [Register file storage container type application permissions](../getting-started/register-api-documentation.md).
## Understand who can register
Only the owning application of the container type can invoke the registration API in the consuming tenant.
The owning application must have:
- A service principal installed on the consuming tenant.
- Admin consent to perform registration in the consuming tenant.
- The SharePoint `Container.Selected` app-only permission.
- A valid app-only token for the SharePoint resource.
> [!NOTE]
> The registration API is a SharePoint API, not a Microsoft Graph API.
## Grant admin consent
Ask a consuming tenant administrator to grant admin consent to the owning application.
Use the Microsoft identity platform admin consent endpoint:
```http
https://login.microsoftonline.com/<ConsumingTenantID>/adminconsent?client_id=<OwningTenantClientID>
```
Configure success and error handling for your onboarding flow.
For national cloud endpoints, see [Microsoft identity platform endpoints on national clouds](/entra/identity-platform/authentication-national-cloud#microsoft-entra-authentication-endpoints).
> [!IMPORTANT]
> SharePoint `Container.Selected` is separate from Microsoft Graph `FileStorageContainer.Selected`.
## Acquire a token for registration
Use app-only authentication for registration.
The source guidance requires:
- The [client credentials grant flow](/entra/identity-platform/v2-oauth2-client-creds-grant-flow).
- A token requested with a certificate.
- The SharePoint `Container.Selected` app-only permission.
Don't use a delegated user token for the registration API.
## Register container type permissions
Call the registration endpoint in the consuming tenant.
```http
PUT {RootSiteUrl}/_api/v2.1/storageContainerTypes/{containerTypeId}/applicationPermissions
```
`{RootSiteUrl}` is the SharePoint URL of the consuming tenant, such as `https://contoso.sharepoint.com`.
`{containerTypeId}` is the container type ID created in the owning tenant.
In the request body, provide the application permissions for the container type.
## Grant permissions to the owning app
A common first registration grants the owning app full permissions for delegated and app-only calls.
```json
{
  "value": [
    {
      "appId": "71392b2f-1765-406e-86af-5907d9bdb2ab",
      "delegated": ["full"],
      "appOnly": ["full"]
    }
  ]
}
```
Replace the sample app ID with your owning application ID.
> [!CAUTION]
> Use least privilege for production. Grant `full` only when the application needs full container type access.
## Grant permissions to a guest app
The owning app can also register permissions for another application.
Use this pattern when a guest app needs a defined workload, such as backup or processing.
```json
{
  "value": [
    {
      "appId": "71392b2f-1765-406e-86af-5907d9bdb2ab",
      "delegated": ["full"],
      "appOnly": ["full"]
    },
    {
      "appId": "89ea5c94-7736-4e25-95ad-3fa95f62b6",
      "delegated": ["read", "write"],
      "appOnly": ["none"]
    }
  ]
}
```
Replace both app IDs with your applications.
## Permission values
| Permission | Use |
|---|---|
| `None` | Grant no permissions. |
| `ReadContent` | Read content in containers of this type. |
| `WriteContent` | Write content in containers of this type. |
| `Create` | Create containers of this type. |
| `Delete` | Delete containers of this type. |
| `Read` | Read container metadata. |
| `Write` | Update container metadata. |
| `EnumeratePermissions` | Enumerate container members and roles. |
| `AddPermissions` | Add container members. |
| `UpdatePermissions` | Update existing memberships. |
| `DeletePermissions` | Delete other members. |
| `DeleteOwnPermissions` | Remove the caller's own membership. |
| `ManagePermissions` | Manage container role assignments. |
| `ManageContent` | Manage the content of containers of this type. |
| `Full` | Grant all permissions. |
> [!NOTE]
> `WriteContent` can't be granted without `ReadContent`.
## Validate registration
A successful registration returns `200 OK` and configured permissions in the response body.
After registration succeeds:
1. Confirm the response includes expected app IDs.
1. Confirm delegated and app-only arrays match your intended grants.
1. Acquire a Microsoft Graph token with SharePoint Embedded permissions.
1. Try a low-risk operation that matches the registered permission.
1. Continue to [Configure authentication and authorization](configure-authentication-authorization.md).
## Troubleshoot consent issues
| Symptom | Likely cause | Action |
|---|---|---|
| `401 Unauthorized` | Missing or invalid token | Request a valid app-only token. |
| `403 Forbidden` | App lacks permission or isn't owning app | Confirm `Container.Selected`, consent, and app ID. |
| `404 Not Found` | Container type doesn't exist | Verify ID and tenant. |
| Access denied on Graph calls | Registration missing or insufficient | Re-register with needed permissions. |
| Admin can't find hidden permission | Portal doesn't expose it | Use an admin consent URL. |
## Re-register safely
There are no restrictions on how many times the registration API can be invoked.
The last successful registration call determines the settings used in the consuming tenant.
Use a safe update process:
1. Build a complete registration payload.
1. Include all apps that should retain access.
1. Submit the registration call.
1. Validate the response.
1. Run smoke tests for each app role.
> [!IMPORTANT]
> Don't send a partial payload unless you intend the resulting registration to contain only that set of applications and permissions.
## Next steps
Configure tokens and authorization flows in [Configure authentication and authorization](configure-authentication-authorization.md).
