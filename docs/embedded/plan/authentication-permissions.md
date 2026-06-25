---
title: Plan Authentication and Permissions
description: Plan SharePoint Embedded authentication, admin consent, delegated access, app-only access, and container permissions.
ms.date: 06/25/2026
ms.localizationpriority: high
---

# Plan Authentication and Permissions

**Applies to:** Developer

<!-- agent:
task_type: concept
audience: developer
outcome: Choose delegated or app-only access and plan Graph permissions, container type registration, and container roles.
next: ../plan/limits-calling-patterns.md
-->

Use this article to plan authentication and authorization for a SharePoint Embedded application.

SharePoint Embedded applications use Microsoft Graph to access containers and content.

For the full authentication reference, see [SharePoint Embedded authentication and authorization](../development/auth.md).

## Core principles

SharePoint Embedded authentication and authorization follow these principles:

- Applications interact with SharePoint Embedded through Microsoft Graph.
- Applications need container type application permissions to access containers of that container type.
- Applications can only access containers that the user is a member of when using access on behalf of a user.
- Applications can access all containers enabled by their container type application permissions when using access without a user.
- Applications should use access on behalf of users whenever possible to enhance security and accountability.

## Prerequisites

Plan for:

- A Microsoft Entra ID application registration.
- A Microsoft 365 subscription in the Microsoft Entra ID tenant.
- Microsoft Graph permissions for SharePoint Embedded operations.
- Container type application permissions granted through container type registration.
- Admin consent in the consuming tenant.

## Permission layers

SharePoint Embedded access has multiple layers.

| Layer | Purpose |
| --- | --- |
| Microsoft Graph permission | Allows the app to call SharePoint Embedded endpoints. |
| Container type application permission | Allows the app to access containers of a specific container type. |
| Container permission | Determines what a user can do in a specific container for delegated access. |

> [!IMPORTANT]
> Microsoft Graph permissions alone don't grant access to containers. The application must also be granted permission to a container type.

## Delegated access

Delegated access means the application acts on behalf of a user.

SharePoint Embedded operations on behalf of a user require Microsoft Graph `FileStorageContainer.Selected` delegated permission.

This permission requires admin consent on the consuming tenant before any user from that tenant can consent to it.

The user must also have container permissions.

The application's effective permissions are the intersection of:

- The application permissions granted for the container type.
- The user's permissions on the container.

Use delegated access whenever possible.

Delegated access improves auditability because actions can be associated with the user.

## App-only access

App-only access means the application acts without a user.

SharePoint Embedded operations without a user require Microsoft Graph `FileStorageContainer.Selected` application permission.

This permission requires admin consent on the consuming tenant.

With app-only access, the app can access all containers enabled by its container type application permissions.

Use app-only access for background operations that can't be performed on behalf of a user.

Apply least privilege when granting container type application permissions.

## Admin consent

An administrator on the consuming tenant must consent to the application's permission request.

Admin consent is required for the `FileStorageContainer.Selected` permission.

Container type registration also requires consent for the owning application to act in the consuming tenant.

For tenant registration, see [Register file storage container type application permissions](../getting-started/register-api-documentation.md).

## Container type registration permission

Container type registration isn't currently a Microsoft Graph API in the source documentation.

It is exposed through SharePoint REST API v2.

To register a container type, the app requests the `Container.Selected` application permission on the `Office 365 SharePoint Online` resource.

The source authentication article lists:

| Scope name | Scope ID | Type | Operation |
| --- | --- | --- | --- |
| `Container.Selected` | `19766c1b-905b-43af-8756-06526ab42875` | Application | Enables container type registration on a consuming tenant. |

> [!NOTE]
> The source documentation states that container type management and registration are expected to become Microsoft Graph operations in the future.

## Container type application permissions

Container type application permissions are granted by the owner application through container type registration.

These permissions define what an application can do against containers of the container type.

The source articles list permissions including:

- `None`
- `ReadContent`
- `WriteContent`
- `Create`
- `Delete`
- `Read`
- `Write`
- `EnumeratePermissions`
- `AddPermissions`
- `UpdatePermissions`
- `DeletePermissions`
- `DeleteOwnPermissions`
- `ManagePermissions`
- `ManageContent`
- `Full`

Grant only the permissions the application needs.

For example, don't grant `Full` to a background guest app if it only needs read access for backup or analysis.

## Container permissions

Container permissions apply to users.

They apply only to access on behalf of a user.

Any user accessing a container must be a member of the container.

Container membership grants user permissions for that container.

The source authentication article lists these roles:

| Role | Summary |
| --- | --- |
| Reader | Read properties and contents of the container. |
| Writer | Reader permissions plus create, update, and delete content and update applicable container properties. |
| Manager | Writer permissions plus manage membership of the container. |
| Owner | Manager permissions plus delete containers. |

When a user creates a new container through delegated calls, that user is automatically assigned the Owner role.

## Tenant registration implications

For the owning application to act on a consuming tenant:

- The owning app must have a service principal installed on the consuming tenant.
- The owning app must be granted admin consent to perform container type registration.
- Only the owning application of the container type can invoke the registration API in the consuming tenant.

The registration API specifies permissions for the owning app and any guest apps.

The last successful registration API call determines the settings used in the consuming tenant.

## Exceptional access patterns

Plan for operations that don't follow the normal Microsoft Graph authorization pattern.

The source authentication article identifies:

- Container type management on owning tenants through PowerShell cmdlets.
- Container type registration on consuming tenants through SharePoint REST API v2.
- SharePoint Embedded agent permissions through SharePoint REST API v2.
- Microsoft Search scenarios that require additional permissions during preview.
- Operations that currently require a user license.

Review these before designing privileged or search-heavy features.

## Security considerations

- Prefer delegated access for user-driven operations.
- Use app-only access only when needed for service operations.
- Grant least privilege at the container type level.
- Grant least privilege at the container membership level.
- Require admin consent in the correct tenant.
- Treat registration as part of customer onboarding.
- Avoid broad guest app access unless the scenario requires it.
- Review audit and compliance implications with your tenant admins.

## Planning checklist

- Register the Microsoft Entra ID application.
- Decide which operations use delegated access.
- Decide which operations use app-only access.
- Request Microsoft Graph `FileStorageContainer.Selected` permissions.
- Request SharePoint `Container.Selected` for container type registration when required.
- Plan admin consent in each consuming tenant.
- Define container type application permissions.
- Define user container roles.
- Identify any guest apps and their permissions.
- Review exceptional access patterns.

## Next step

Review scale and performance constraints: [Understand limits and calling patterns](../plan/limits-calling-patterns.md).
