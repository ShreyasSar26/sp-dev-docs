---
title: Sharing and Permissions
slug: development__sharing-and-perm
persona: developer
scenario_ids: [D7, D8]
source_of_truth: https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/sharing-and-perm
source_date: 03/03/2025
last_verified: 2026-06-23
agent_ready: true
---

# Sharing and Permissions

> Outlines Permission Model for SharePoint Embedded

**Agent task:** Answer SharePoint Embedded questions about "Sharing and Permissions" using only this page. Use the exact Microsoft Graph calls, permissions, parameters, and steps below, respect the developer persona boundary, and cite this page.

## Additive permissions

In SharePoint Embedded, content always inherits permissions from its parent hierarchy. While you can't alter this inherited permission structure, you can extend access within a container by applying "additive permissions" to specific files and folders. For instance, if _UserA_ belongs to the Reader role, you can grant the user edit permission to a particular document in that container using Microsoft Graph:

|           Scenario            |                                                                           Microsoft Graph API(s)                                                                            |                                                                                                          Notes                                                                                                          |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Grant an additive permission  | [POST /drives/{drive-id}/items/{item-id}/invite](https://learn.microsoft.com/graph/api/driveitem-invite)                                                                                               | The sendInvitation property must always be false. You can't grant additive permissions to the root folder in a container as this is essentially the same as adding a User to a role. You can't use AppOnly permissions. |
| Retrieve permissions          | [GET /drives/{drive-id}/items/{item-id}/permissions](https://learn.microsoft.com/graph/api/permission-get) & [GET /drives/{drive-id}/items/{item-id}/permissions/{perm-id}](https://learn.microsoft.com/graph/api/permission-get), |                                                                                                                                                                                                                         |
| Delete additive permissions | [DELETE /drives/{drive-id}/items/{item-id}/permissions/{perm-id}](https://learn.microsoft.com/graph/api/permission-delete)                                                                             | You can only delete the additive permission on the drive item where it was originally added.                                                                                                                            |

## Role-based sharing setting

SharePoint Embedded offers a role-based sharing model that allows developers to configure file-sharing permissions based on container permission roles, offering a choice between restrictive and open sharing models. By default, the sharing setting is configured to the open model, permitting unrestricted content sharing by all users. This sharing setting is part of [container type configuration](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/getting-started/containertypes#configuring-container-types). This configuration can only be set by the application owner's developers. To learn more about container permission roles, refer to [Authentication and Authorization with SharePoint Embedded](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/auth#container-permissions).

### Restrictive sharing model

Only container members who are either the Owner or Manager roles are permitted to add new permissions to files.

### Open sharing model

Any container members and guests with edit permissions can add new permissions to this file.

This can be configured using the PowerShell cmdlet [Set-SPOcontainerTypeConfiguration](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/developer-admin/dev-admin#container-type-configuration-properties) as per this example:

```powershell
Set-SPOcontainerTypeConfiguration
    -containerTypeID <containerTypeID>
    -sharingRestricted $false
```

## Sharing configuration setting

By default, SharePoint Embedded application sharing configuration is the same as the consuming tenant-sharing configuration. For example, if the consuming tenant is configured to disable sharing for guests, then the SharePoint Embedded application is unable to add guests to container roles or grant them additive permissions.

### Application external sharing override

For SharePoint Embedded applications, sharing configurations can be adjusted at the application level. Consuming tenant admin can configure permissions that are different than tenant-level sharing settings. For example, if a tenant's sharing setting prohibits sharing with guests, SharePoint Embedded applications can be configured to allow guest sharing. So, all containers within that SharePoint Embedded application would have the ability to include guests or extend another permission, while other SharePoint Embedded applications and SharePoint maintain restricted sharing permissions.

This setting can only be set by consuming tenant SharePoint Embedded admin, and can be configured using the latest PowerShell cmdlet [Set-SPOApplication](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/consuming-tenant-admin/ctapowershell#set-sharing-capability-of-applications) as shown in this example:

```powershell
Set-SPOApplication
    -OwningApplicationID <OwningApplicationId>
    -OverrideTenantSharingCapability $true
    -SharingCapability <SharingCapability>
```

---
*Agent-first reformat of the official Microsoft Learn doc (content preserved). Source of truth: https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/sharing-and-perm*
