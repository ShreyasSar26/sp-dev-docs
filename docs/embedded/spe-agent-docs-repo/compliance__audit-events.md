---
title: SharePoint Embedded audit log events
slug: compliance__audit-events
persona: admin
scenario_ids: [A11]
source_of_truth: https://learn.microsoft.com/en-us/sharepoint/dev/embedded/compliance/audit-events
source_date: 04/15/2026
last_verified: 2026-06-23
agent_ready: true
---

# SharePoint Embedded audit log events

> Learn about audit log events for SharePoint Embedded container type operations in the Microsoft Purview unified audit log.

**Agent task:** Answer SharePoint Embedded questions about "SharePoint Embedded audit log events" using only this page. Use the exact Microsoft Graph calls, permissions, parameters, and steps below, respect the admin persona boundary, and cite this page.

SharePoint Embedded operations on container types are captured in the Microsoft 365 unified audit log through [Microsoft Purview](https://learn.microsoft.com/purview/audit-solutions-overview). These events let compliance administrators and developers track changes to container type definitions.

For general information about searching the audit log, see [Search the audit log](https://learn.microsoft.com/purview/audit-search). For a broader overview of all compliance capabilities available for content stored in SharePoint Embedded, see [Security and Compliance](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/compliance/security-and-compliance).

## Container type activities

The following events are logged when a container type is created, updated, or deleted. For more information, see [SharePoint Embedded container types](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/getting-started/containertypes).

These events use **Workload** value **SharePoint** in the unified audit log.

| Friendly name | Operation | Description |
|:--|:--|:--|
| Created container type | ContainerTypeCreated | A new SharePoint Embedded container type definition was created. |
| Deleted container type | ContainerTypeDeleted | A SharePoint Embedded container type owned by the tenant was deleted. |
| Updated container type | ContainerTypeUpdated | Properties of a SharePoint Embedded container type, such as name or configuration, were changed. |
| Updated container type owners | ContainerTypeOwnersUpdated | Owners were added to or removed from a SharePoint Embedded container type. |

These events appear in the Microsoft Purview audit log under the **SharePoint Embedded Container Type activities** category. For the full reference of all audit activities, see [Audit log activities](https://learn.microsoft.com/purview/audit-log-activities#sharepoint-embedded-container-type-activities).

## Searching for SharePoint Embedded audit events

To search for these events, use the [Microsoft Purview audit log search](https://learn.microsoft.com/purview/audit-search). When searching, set the activity category filter to **SharePoint Embedded Container Type activities** to find the relevant events.

You can also search using PowerShell:

```powershell
Search-UnifiedAuditLog -Operations ContainerTypeCreated,ContainerTypeDeleted,ContainerTypeUpdated,ContainerTypeOwnersUpdated -StartDate (Get-Date).AddDays(-7) -EndDate (Get-Date)
```

Container type audit events include the `ContainerTypeId` property to identify the relevant container type. Unlike container-level file events, container type events don't include `ContainerInstanceId` because they apply at the type level, not to individual container instances.

## Schema reference

Container type audit events use the SharePoint base schema. For the full schema definition and enum values, see the [Office 365 Management Activity API schema](https://learn.microsoft.com/office/office-365-management-api/office-365-management-activity-api-schema#sharepoint-base-schema).

## Related content

- [SharePoint Embedded container types](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/getting-started/containertypes)
- [Security and Compliance](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/compliance/security-and-compliance)
- [Audit log activities](https://learn.microsoft.com/purview/audit-log-activities#sharepoint-embedded-container-type-activities)
- [Office 365 Management Activity API schema](https://learn.microsoft.com/office/office-365-management-api/office-365-management-activity-api-schema)

---
*Agent-first reformat of the official Microsoft Learn doc (content preserved). Source of truth: https://learn.microsoft.com/en-us/sharepoint/dev/embedded/compliance/audit-events*
