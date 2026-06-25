---
title: Configure Authentication and Authorization
description: Configure Microsoft Entra ID authentication and SharePoint Embedded authorization for your application.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Configure Authentication and Authorization
**Applies to:** Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Configure delegated and app-only access so your app can call SharePoint Embedded through Microsoft Graph.
next: create-manage-containers.md
-->
Configure authentication and authorization before your SharePoint Embedded application calls Microsoft Graph or SharePoint Embedded APIs.
Complete [Register application permissions](register-application-permissions.md) first so the container type is registered in the consuming tenant.
For the full model, see [SharePoint Embedded authentication and authorization](../development/auth.md).
## Understand the access model
SharePoint Embedded uses two permission layers.
Microsoft Graph permissions allow the app to call SharePoint Embedded endpoints.
Container type application permissions allow the app to access containers of a specific container type.
Both layers are required.
> [!IMPORTANT]
> Microsoft Graph consent alone doesn't grant access to containers. The app must also be granted permission to the container type.
## Configure the Microsoft Entra ID app
Start with a Microsoft Entra ID app registration.
Configure it for your application type:
1. Register or identify the owning application.
1. Add redirect URIs for development and production clients.
1. Add credentials for app-only flows when needed.
1. Add Microsoft Graph permissions for SharePoint Embedded access.
1. Add SharePoint permissions required for registration scenarios.
1. Ask an administrator to grant consent where required.
For general steps, see [Register an application with the Microsoft identity platform](/graph/auth-register-app-v2).
## Request Microsoft Graph permissions
SharePoint Embedded operations through Microsoft Graph require `FileStorageContainer.Selected`.
Use delegated `FileStorageContainer.Selected` for access on behalf of a user.
Use application `FileStorageContainer.Selected` for app-only access.
Both forms require admin consent in the consuming tenant.
> [!NOTE]
> The combination of Microsoft Graph permissions and container type application permissions determines what the application can actually do.
## Request SharePoint permission for registration
Container type registration currently uses a SharePoint API, not Microsoft Graph.
For registration, request SharePoint `Container.Selected` application permission on the `Office 365 SharePoint Online` resource.
| Scope name | Scope ID | Type | Use |
|---|---|---|---|
| `Container.Selected` | `19766c1b-905b-43af-8756-06526ab42875` | Application | Enables container type registration on a consuming tenant. |
Use this permission with [Register application permissions](register-application-permissions.md).
## Prefer delegated access when possible
Use access on behalf of a user whenever possible.
Delegated access improves security, accountability, auditability, and alignment with the user's container membership.
When using delegated access, effective permissions are the intersection of application permissions and user container permissions.
The user must be a member of the container.
## Configure delegated token acquisition
For delegated calls:
1. Sign in the user with Microsoft identity platform.
1. Request delegated `FileStorageContainer.Selected`.
1. Ensure admin consent is granted in the consuming tenant.
1. Acquire an access token for Microsoft Graph.
1. Call Microsoft Graph SharePoint Embedded endpoints.
1. Verify the user is a member of the target container.
If the user isn't a container member, the app can't access that container on the user's behalf.
## Configure app-only token acquisition
Use app-only access for service workloads that don't run as a user.
For app-only calls:
1. Configure an application credential, such as a certificate.
1. Request application `FileStorageContainer.Selected`.
1. Have a consuming tenant administrator grant admin consent.
1. Acquire a token using the client credentials flow.
1. Call Microsoft Graph SharePoint Embedded endpoints.
1. Limit container type permissions to the workload's needs.
> [!CAUTION]
> An app-only token can access all containers enabled by its container type application permissions. Use least privilege.
## Call Microsoft Graph APIs
After token acquisition, call SharePoint Embedded operations through Microsoft Graph.
Useful references include:
- [File storage container resource type](/graph/api/resources/filestoragecontainer)
- [Create fileStorageContainer](/graph/api/filestoragecontainer-post)
- [Microsoft Graph authentication and authorization basics](/graph/auth/auth-concepts)
Continue with [Create and manage containers](create-manage-containers.md) for lifecycle operations.
## Handle operations not exposed through Graph
Some operations have exceptional access patterns.
The source article identifies:
- Container type management in the owning tenant through PowerShell cmdlets.
- Container type registration in the consuming tenant through SharePoint REST API v2.
- SharePoint Embedded agent experiences through SharePoint REST API v2 permissions.
- Search scenarios with additional requirements.
- Operations that currently require a user license.
> [!IMPORTANT]
> Don't assume every operation uses the same token or permission resource. Check exceptional access patterns before implementing a flow.
## Understand container permissions
Container permissions apply to delegated access.
A user must be a member of the container with one of these roles:
| Role | Access summary |
|---|---|
| Reader | Read container properties and content. |
| Writer | Reader access plus create, update, and delete content and update applicable properties. |
| Manager | Writer access plus manage container membership. |
| Owner | Manager access plus delete containers. |
When a user creates a container through delegated calls, that user is automatically assigned the Owner role.
## Validate authentication
Validate the flow before feature code:
1. Confirm admin consent completed successfully.
1. Acquire a delegated token.
1. Acquire an app-only token.
1. Call a simple Graph endpoint that matches the token type.
1. Confirm registration includes the calling app.
1. Confirm user membership for delegated calls.
1. Confirm app-only access is limited by container type permissions.
## Troubleshoot authorization failures
| Symptom | Check |
|---|---|
| Graph call returns unauthorized | Token is missing, expired, or for the wrong resource. |
| Graph call returns forbidden | Consent, Graph permission, or container type permission is missing. |
| Delegated call fails for one user | User isn't a container member or lacks the needed role. |
| App-only call has too much access | Container type permission is broader than necessary. |
| Registration call fails | Use SharePoint `Container.Selected` and app-only flow. |
| Search call fails | Review search-specific exceptional access patterns. |
## Next step
Use your configured flow to [Create and manage containers](create-manage-containers.md).
