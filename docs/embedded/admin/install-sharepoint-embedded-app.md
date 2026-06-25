---
title: Install a SharePoint Embedded App
description: Install or register a SharePoint Embedded app in a consuming tenant and validate the tenant setup.
ms.date: 06/25/2026
ms.localizationpriority: high
---

# Install a SharePoint Embedded App

**Applies to:** Administrator — SharePoint admin / tenant admin

<!-- agent:
task_type: how-to
audience: administrator
outcome: Install a SharePoint Embedded app in a tenant and identify the required follow-up tasks.
next: grant-admin-consent-permissions.md
-->

Install a SharePoint Embedded (SPE) app when a consuming Microsoft 365 tenant needs to use the app.
Installation makes the app visible for tenant administration, but the tenant may still need admin consent, container type permission registration, and billing setup before users can access content.

This article focuses on the consuming-tenant administrator path in the SharePoint admin center.

> [!IMPORTANT]
> A consuming tenant admin is typically a user assigned the **SharePoint Embedded Administrator** role.
> Global Administrators can also perform SPE administration tasks.

Use this article with [Choose an App Model: Single-Tenant or Multitenant](../plan/choose-app-model.md), [Consuming Tenant Admin](../administration/consuming-tenant-admin/cta.md), and the app creation guidance.
The app model determines who owns the app, who installs or onboards it, where containers are created, who pays, and which admins must consent or configure billing.

## Before you begin

Confirm these prerequisites.

- You can sign in to the consuming tenant.
- Your account has the SharePoint Embedded Administrator role or Global Administrator role.
- The SPE app exists in the owning tenant.
- You have the app identity or installation link provided by the app owner.
- You know whether billing is handled by the app owner or by the user organization.
- You know which permissions the app requests.
- You can complete admin consent if the installation flow requires it.
- You know whether the app is a single-tenant line-of-business app or a multitenant ISV app.

For role information, see [Admin overview](admin-overview.md) and [SharePoint Embedded administrator](../administration/adminrole.md).

## Understand the consuming tenant path

A consuming tenant is the Microsoft 365 tenant where users run the SPE app and where the app stores content in containers.
The consuming tenant admin manages the app and containers in that tenant.
For a single-tenant line-of-business app, the owning tenant and consuming tenant are usually the same.
For a multitenant ISV app, each customer tenant is a consuming tenant and customer files remain in the customer Microsoft 365 tenant boundary.

The source consuming-tenant admin guidance describes two administration surfaces.

| Surface | Use it for |
| --- | --- |
| SharePoint admin center | View installed apps, active containers, deleted containers, and container details. |
| SharePoint Online Management Shell | Enumerate applications, enumerate containers, update labels, configure sharing, and manage lifecycle operations. |

Use the SharePoint admin center when you need guided installation and validation.
Use PowerShell for repeatable inventory and operations after installation.

## Install from the SharePoint admin center

Use the SPE **Apps** experience in the SharePoint admin center when the app is available to install.

1. Sign in to the [SharePoint admin center](https://admin.microsoft.com/sharepoint).
1. In the left navigation, expand **SharePoint Embedded**.
1. Select **Apps**.
1. Review **All installed apps** to confirm whether the app is already installed.
1. If you own the app, review **Owned apps** and locate the app.
1. Select the available install action for the app.
1. Review the app name, publisher, and billing information.
1. Continue through the installation prompts.
1. Complete admin consent if the flow directs you to consent.
1. Finish the installation.

The exact installation prompts can vary by app ownership and billing model.
Do not continue if the app identity or publisher is unexpected.

> [!CAUTION]
> Install only apps that your organization trusts.
> An SPE app can create and access containers according to the permissions granted to it.

## Validate installation

After installation, validate the app inventory.

1. Return to **SharePoint Embedded** > **Apps**.
1. Open **All installed apps**.
1. Confirm that the app is listed.
1. Confirm the app name and publisher.
1. Confirm the billing type and billing status.
1. If the app is owned by your organization, open **Owned apps** and confirm ownership metadata.
1. Record the owning application ID for future PowerShell and permission review.

If the app is not visible, refresh the page and confirm that installation completed successfully.
If the app remains missing, contact the app owner and verify the app identity.

## Complete admin consent

Installation and consent are related but not always the same task.
The registration API source states that the owning app must have a service principal installed in the consuming tenant and must be granted admin consent before it can register container type application permissions.

Use [Grant admin consent and permissions](grant-admin-consent-permissions.md) to review the requested permissions and complete consent.

Admin consent may be requested through the Microsoft identity platform admin consent endpoint, for example:

```http
https://login.microsoftonline.com/<ConsumingTenantID>/adminconsent?client_id=<OwningTenantClientID>
```

Use the exact client ID provided by the app owner.
Do not substitute a different application ID.

## Confirm billing requirements

SPE supports standard and pass-through billing models.
For pass-through billing, the consuming tenant admin must set up billing in the Microsoft 365 admin center before users can access the app.

If billing is invalid or SharePoint Embedded is turned off, users immediately lose access to apps built on the service.

Use [Set up billing in Microsoft 365 admin center](setup-billing-m365-admin-center.md) to configure billing for consuming-tenant scenarios.
Use [Monitor usage, billing, and cost](monitor-usage-billing-cost.md) to review ongoing cost.

## Verify containers after app use

The app may not create containers until users or app processes start using it.
After containers exist, validate them.

1. In the SharePoint admin center, go to **SharePoint Embedded** > **Active containers**.
1. Search or filter by application name.
1. Open a container details panel.
1. Review general metadata.
1. Review membership.
1. Confirm sensitivity label state if labels are required.
1. Review storage use.

For detailed steps, see [Manage containers in SharePoint admin center](manage-containers-sharepoint-admin-center.md).

## Validate with PowerShell

Use SharePoint Online Management Shell when you need a scripted check.
Install the latest SharePoint Online Management Shell and connect to SharePoint Online.
Then use the supported application inventory cmdlets described in the source documentation.

```powershell
Get-SPOApplication
```

To view details for a specific application, use the owning application ID.

```powershell
Get-SPOApplication -OwningApplicationId <OwningApplicationId>
```

For command details, see [Manage containers with PowerShell](manage-containers-powershell.md) and [Get-SPOApplication](/powershell/module/sharepoint-online/get-spoapplication).

## Troubleshoot installation

Use these checks when installation does not complete.

- Confirm the administrator has the SharePoint Embedded Administrator role.
- Confirm the app identity and publisher.
- Confirm the app is available for your tenant.
- Confirm admin consent is granted for the correct application.
- Confirm the app has a service principal in the consuming tenant after consent.
- Confirm billing is active for pass-through apps.
- Confirm the app owner registered container type application permissions when required.
- Confirm users are assigned the required app roles or memberships.

> [!NOTE]
> Access denied errors after installation often indicate missing consent, missing container type permission registration, or app-level permission configuration rather than a container problem.

## Related content

- [Admin overview](admin-overview.md)
- [Create apps in SharePoint admin center](create-apps-sharepoint-admin-center.md)
- [Grant admin consent and permissions](grant-admin-consent-permissions.md)
- [Set up billing in Microsoft 365 admin center](setup-billing-m365-admin-center.md)
- [Manage containers in SharePoint admin center](manage-containers-sharepoint-admin-center.md)
- [Consuming Tenant Admin](../administration/consuming-tenant-admin/cta.md)
- [Create a SharePoint Embedded app in the SharePoint admin center](../administration/consuming-tenant-admin/SPE_app_installation_on_SPAC.md)

## Next step

Grant consent and verify permissions in [Grant admin consent and permissions](grant-admin-consent-permissions.md).
