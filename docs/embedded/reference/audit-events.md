---
title: Audit Events
description: Reference scaffold for SharePoint Embedded audit events in Microsoft Purview.
ms.date: 06/25/2026
ms.localizationpriority: high
---

# Audit Events

**Applies to:** Compliance

<!-- agent:
task_type: reference
audience: compliance
outcome: Locate SharePoint Embedded audit activity records and properties in Microsoft Purview.
next: ../admin/review-audit-events.md
-->

<!-- TODO: canonical source doc pending -->

SharePoint Embedded content is stored in the consuming tenant's Microsoft 365 boundary and is subject to Microsoft Purview auditing in the same manner as supported Microsoft 365 content. For investigation steps, see [review audit events](../admin/review-audit-events.md).

## Event names

The canonical SharePoint Embedded audit event source wasn't available when this reference was authored. Don't hard-code event display names until Microsoft publishes the canonical list. Use Microsoft Purview audit search to confirm the activity names emitted in your tenant.

| Area | Event names | How to validate |
| --- | --- | --- |
| Container lifecycle | Canonical names pending. | Filter Purview audit records by date, user or app, and affected SharePoint Embedded workload or item. |
| File activity | Canonical names pending. | Perform a controlled create, read, update, delete, or share action and review the resulting audit records. |
| Permission activity | Canonical names pending. | Add, update, or remove container membership, then confirm the emitted activity in Purview. |
| Administrative activity | Canonical names pending. | Run a supported SharePoint Admin Center or SPO PowerShell admin action and review the audit record. |

## Properties

Purview audit records generally include the activity, actor, timestamp, workload, result, target object, and extended properties. For SharePoint Embedded investigations, capture these values when available:

| Property | Use |
| --- | --- |
| Activity | Identifies the audited action. |
| User or app identity | Identifies the delegated user or application associated with the action. |
| Date and time | Establishes the event timeline. |
| Workload or service | Helps distinguish SharePoint Embedded activity from other Microsoft 365 activity. |
| Object or item identifiers | Correlates the record to a container, file, or other target. |
| Client IP and user agent | Supports access and anomaly investigations when present. |
| Extended properties | Contains service-specific details; schema can vary by event. |

## Related guidance

- [Review audit events](../admin/review-audit-events.md)
- [Microsoft Purview auditing solutions](/purview/audit-solutions-overview)
