---
title: Audit Events
description: Reference for SharePoint Embedded container type audit events in the Microsoft Purview unified audit log.
ms.date: 06/25/2026
ms.reviewer: pemtaira
ms.localizationpriority: high
---

# Audit Events

**Applies to**: Compliance admin

<!-- agent:
task_type: reference
audience: compliance
outcome: Look up SharePoint Embedded container type audit event names and properties in Microsoft Purview.
next: ../admin/review-audit-events.md
-->

SharePoint Embedded (SPE) operations on container types are captured in the Microsoft 365 unified audit log through [Microsoft Purview](/purview/audit-solutions-overview). These events let compliance administrators and developers track changes to container type definitions. File and folder activity inside containers is captured by standard SharePoint file audit events.

For step-by-step investigation guidance, see [Review audit events](../admin/review-audit-events.md).

## Container type activities

These events are logged when a container type is created, updated, or deleted. They use the **Workload** value **SharePoint** and appear under the **SharePoint Embedded Container Type activities** category in Microsoft Purview audit.

| Friendly name | Operation | Description |
| --- | --- | --- |
| Created container type | `ContainerTypeCreated` | A new SharePoint Embedded container type definition was created. |
| Deleted container type | `ContainerTypeDeleted` | A SharePoint Embedded container type owned by the tenant was deleted. |
| Updated container type | `ContainerTypeUpdated` | Properties of a container type, such as name or configuration, were changed. |
| Updated container type owners | `ContainerTypeOwnersUpdated` | Owners were added to or removed from a container type. |

For the full list of audit activities, see [Audit log activities](/purview/audit-log-activities#sharepoint-embedded-container-type-activities).

## Properties

Container type audit events include the `ContainerTypeId` property to identify the relevant container type. Unlike container-level file events, they don't include `ContainerInstanceId` because they apply at the type level, not to an individual container instance.

Container type audit events use the SharePoint base schema. For the full schema definition and enum values, see the [Office 365 Management Activity API schema](/office/office-365-management-api/office-365-management-activity-api-schema#sharepoint-base-schema).

## Search for events

Use the [Microsoft Purview audit log search](/purview/audit-search) and set the activity category filter to **SharePoint Embedded Container Type activities**. You can also search with PowerShell:

```powershell
Search-UnifiedAuditLog -Operations ContainerTypeCreated,ContainerTypeDeleted,ContainerTypeUpdated,ContainerTypeOwnersUpdated -StartDate (Get-Date).AddDays(-7) -EndDate (Get-Date)
```

## Related content

- [Review audit events](../admin/review-audit-events.md)
- [Apply security and compliance controls](../admin/apply-security-compliance-controls.md)
- [Search the audit log](/purview/audit-search)
