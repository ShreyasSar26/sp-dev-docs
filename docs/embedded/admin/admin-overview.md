---
title: Admin Overview
description: Learn how administrators manage SharePoint Embedded apps, containers, billing, and compliance in Microsoft 365.
ms.date: 06/25/2026
ms.localizationpriority: high
---

# Admin Overview

**Applies to:** Administrator — SharePoint admin / tenant admin

<!-- agent:
task_type: concept
audience: administrator
outcome: Understand the admin roles, tools, and common management tasks for SharePoint Embedded.
next: create-apps-sharepoint-admin-center.md
-->

SharePoint Embedded (SPE) is an API-only document platform built on Microsoft 365.
Organizations use SPE apps to store files and documents in containers that inherit Microsoft 365 security, compliance, and administration controls.
Administrators manage those apps and containers through the SharePoint admin center and SharePoint Online Management Shell.

Use this overview to decide which administrator role and management surface to use.
Then follow the linked how-to articles for app creation, installation, billing, container lifecycle, and compliance operations.

> [!IMPORTANT]
> Assign the **SharePoint Embedded Administrator** role before delegating SPE administration.
> Global Administrators already have the permissions of this role, but should use least-privileged delegation for daily operations.

## Admin roles

SharePoint Embedded administration commonly involves the following roles.

| Role | Use it for |
| --- | --- |
| Global Administrator | Assign the SharePoint Embedded Administrator role and perform any SPE admin task when needed. |
| SharePoint Embedded Administrator | Manage SPE apps and containers through SharePoint admin center and supported SharePoint PowerShell cmdlets. |
| SharePoint administrator | Manage SharePoint service configuration and SPE experiences in the SharePoint admin center when applicable. |
| Tenant administrator | Manage apps and settings in the consuming Microsoft 365 tenant. |
| Compliance administrator | Configure Microsoft Purview audit, retention, DLP, eDiscovery, and related policies. |

The SharePoint Embedded Administrator role is available in Microsoft Entra and the Microsoft 365 admin center.
It is dedicated to SPE administration.
It does not grant regular SharePoint site management access.
For example, a SharePoint Embedded Administrator does not see the **Active sites** or **Deleted sites** pages in the SharePoint admin center and cannot run site-specific SharePoint PowerShell cmdlets.

For role assignment details, see [SharePoint Embedded administrator](../administration/adminrole.md).

## Developer tenant and consuming tenant responsibilities

SPE administration differs depending on whether the tenant owns the app or consumes the app.

A developer tenant owns or builds the SPE application.
Developer tenant admins can create container types, configure billing for standard billing scenarios, and manage container type properties.

A consuming tenant uses an SPE application in its Microsoft 365 tenant.
Consuming tenant admins manage installed applications, containers, sharing settings, sensitivity labels, deleted containers, billing for pass-through apps, and compliance controls.

For the consuming tenant admin model, see [Consuming Tenant Admin](../administration/consuming-tenant-admin/cta.md).

## What admins can do

Administrators can perform these SPE management tasks.

### App administration

- View SPE applications registered in the tenant.
- View details for a specific SPE application.
- Review owning and guest application permissions.
- Install or register an SPE app in a consuming tenant.
- Configure application-level external sharing settings when supported.
- Create apps from the SharePoint admin center when the tenant owns the app.

Start with [Create apps in SharePoint admin center](create-apps-sharepoint-admin-center.md) for owned apps.
Use [Install a SharePoint Embedded app](install-sharepoint-embedded-app.md) for consuming tenant installation.

### Permission and consent administration

Admin consent installs the application service principal in the consuming tenant and grants the requested permissions.
For container type registration, the owning application must have admin consent and the required SharePoint application permission before it can register permissions in the consuming tenant.

Review consent guidance in [Grant admin consent and permissions](grant-admin-consent-permissions.md).

### Billing administration

SPE uses pay-as-you-go billing through Azure.
Cost is driven by storage, API transactions, and egress.
Developer tenants configure billing for standard billing container types.
Consuming tenants configure billing for pass-through apps before users can access those apps.

Set up pass-through billing with [Set up billing in Microsoft 365 admin center](setup-billing-m365-admin-center.md).
Monitor usage with [Monitor usage, billing, and cost](monitor-usage-billing-cost.md).

### Container administration

Containers hold the content used by SPE apps.
Admins can view active containers, inspect metadata, set sensitivity labels, manage membership in the admin center, delete containers, restore deleted containers, and permanently delete deleted containers.

Use the graphical experience in [Manage containers in SharePoint admin center](manage-containers-sharepoint-admin-center.md).
Use cmdlets and scripting in [Manage containers with PowerShell](manage-containers-powershell.md).

### Compliance administration

SPE content participates in Microsoft Purview capabilities.
Compliance admins can use audit, retention, DLP, eDiscovery, and sensitivity labels in ways that are similar to SharePoint.
Some scenarios that need end-user interaction depend on the owning app to provide the user experience.

Review [Review audit events](review-audit-events.md) and [Apply security and compliance controls](apply-security-compliance-controls.md).

## SharePoint admin center versus PowerShell

Use both management surfaces.
They are complementary.

| Surface | Best for |
| --- | --- |
| SharePoint admin center | Interactive app inventory, container views, container details, deleted container operations, sensitivity labels, and membership management. |
| SharePoint Online Management Shell | Repeatable administration, inventory exports, sorting containers by storage, application permission review, and lifecycle scripts. |

The SharePoint admin center exposes SPE-specific pages such as **Apps**, **Active containers**, and **Deleted containers**.
A SharePoint Embedded Administrator sees the SPE administration pages but not general SharePoint site management pages.

SharePoint Online Management Shell provides SPE cmdlets for application and container administration.
Use the latest version before running container administration cmdlets.
For command details, see [Manage containers with PowerShell](manage-containers-powershell.md) and the linked cmdlet reference.

> [!TIP]
> Use the admin center for one-time review and confirmation.
> Use PowerShell when you need repeatable inventory, reporting, or bulk operations.

## Common administration paths

Use this path when you own an SPE app:

1. Confirm the admin role in [SharePoint Embedded administrator](../administration/adminrole.md).
1. Create the app in [Create apps in SharePoint admin center](create-apps-sharepoint-admin-center.md).
1. Choose and configure billing.
1. Install the app if it must be available in a consuming tenant.
1. Grant admin consent and register required permissions.
1. Monitor usage and cost.

Use this path when your tenant consumes an SPE app:

1. Assign or confirm the SharePoint Embedded Administrator role.
1. Install or approve the app in [Install a SharePoint Embedded app](install-sharepoint-embedded-app.md).
1. Grant admin consent when required.
1. Set up pass-through billing in [Set up billing in Microsoft 365 admin center](setup-billing-m365-admin-center.md).
1. Manage containers in the SharePoint admin center or with PowerShell.
1. Apply compliance controls in Microsoft Purview.

## Operational guardrails

Before making changes, identify the owning application and affected containers.
Container deletion can break links, remove content, and interrupt the app that depends on the container.
Deleted containers can be restored from the deleted container collection within the supported retention period unless they are permanently deleted or retention policies change the behavior.

> [!WARNING]
> Permanently deleting a container removes it from the deleted container collection and it cannot be restored.
> Notify app owners before deleting containers.

## Related content

- [SharePoint Embedded administrator](../administration/adminrole.md)
- [Consuming Tenant Admin](../administration/consuming-tenant-admin/cta.md)
- [Create apps in SharePoint admin center](create-apps-sharepoint-admin-center.md)
- [Install a SharePoint Embedded app](install-sharepoint-embedded-app.md)
- [Grant admin consent and permissions](grant-admin-consent-permissions.md)
- [Set up billing in Microsoft 365 admin center](setup-billing-m365-admin-center.md)
- [Manage containers in SharePoint admin center](manage-containers-sharepoint-admin-center.md)
- [Manage containers with PowerShell](manage-containers-powershell.md)
- [Monitor usage, billing, and cost](monitor-usage-billing-cost.md)
- [Apply security and compliance controls](apply-security-compliance-controls.md)

## Next step

Create an owned app in [Create apps in SharePoint admin center](create-apps-sharepoint-admin-center.md).
