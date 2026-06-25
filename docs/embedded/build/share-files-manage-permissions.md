---
title: Share Files and Manage Permissions
description: Grant targeted SharePoint Embedded file access with additive permissions and role-based sharing.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Share Files and Manage Permissions
**Applies to**: Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Apply additive file permissions without breaking container inheritance.
next: respond-to-changes-webhooks.md
-->
SharePoint Embedded content inherits permissions from its container hierarchy. You cannot break inheritance on arbitrary files or folders. Use additive permissions to extend access to a specific drive item without changing the baseline container membership. For source details, see [Sharing and permissions in SharePoint Embedded](../development/sharing-and-perm.md).

## Understand container roles
Container roles provide the inherited baseline access for a container. The authentication source defines these roles in [container permissions](../development/auth.md#container-permissions):

| Role | Access summary |
| --- | --- |
| `Reader` | Reads container properties and contents. |
| `Writer` | Has Reader access, plus permission to create, update, and delete content and update applicable container properties. |
| `Manager` | Has Writer access, plus permission to manage container membership. |
| `Owner` | Has Manager access, plus permission to delete containers. |

A user with inherited `Reader` access can receive additive edit access on one document. Removing that added permission does not remove the user's inherited container role.

## Grant additive access
Grant additive access with Microsoft Graph drive item invite. The source article requires `sendInvitation` to be `false` and states that app-only permissions are not supported for this operation.

```http
POST https://graph.microsoft.com/v1.0/drives/{drive-id}/items/{item-id}/invite
Content-Type: application/json
```

```json
{
  "recipients": [
    { "email": "user@contoso.com" }
  ],
  "message": "",
  "requireSignIn": true,
  "sendInvitation": false,
  "roles": ["write"]
}
```

Use `roles: ["read"]` for view access and `roles: ["write"]` for edit access. Do not grant additive permissions to the root folder of a container; add the user to an appropriate container role instead.

## Retrieve and delete permissions
List permissions when you need to show direct sharing state on a file or folder.

```http
GET https://graph.microsoft.com/v1.0/drives/{drive-id}/items/{item-id}/permissions
GET https://graph.microsoft.com/v1.0/drives/{drive-id}/items/{item-id}/permissions/{perm-id}
```

Delete only the additive permission on the drive item where it was originally added.

```http
DELETE https://graph.microsoft.com/v1.0/drives/{drive-id}/items/{item-id}/permissions/{perm-id}
```

If the user still has access after deletion, inspect inherited container roles, Microsoft Entra groups, and any other additive permission on parent folders.

## Configure who can share
SharePoint Embedded supports a role-based sharing model on the container type. The restrictive model allows only `Owner` and `Manager` members to add new permissions to files. The open model allows container members and guests with edit permissions to add new file permissions.

Configure the model with the SharePoint Online PowerShell container type cmdlet shown in the source article.

```powershell
Set-SPOcontainerTypeConfiguration
    -containerTypeID <containerTypeID>
    -sharingRestricted $false
```

Application owner developers control this container type setting. Design your UI so the share action is disabled or hidden when the current user's role cannot add permissions.

## Respect tenant sharing policy
By default, SharePoint Embedded application sharing follows the consuming tenant's sharing configuration. If the tenant disables guest sharing, your app cannot add guests to container roles or grant guest additive permissions.

A consuming tenant SharePoint Embedded admin can configure application-level sharing with `Set-SPOApplication`.

```powershell
Set-SPOApplication
    -OwningApplicationID <OwningApplicationId>
    -OverrideTenantSharingCapability $true
    -SharingCapability <SharingCapability>
```

Report policy failures in user-facing language. Distinguish inherited container access from direct item access in permission panels so users understand why a person can still open a file.
