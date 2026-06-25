---
title: Create Apps in SharePoint Admin Center
description: Create a SharePoint Embedded app from the SharePoint admin center and validate the new app registration.
ms.date: 06/25/2026
ms.localizationpriority: high
---

# Create Apps in SharePoint Admin Center

**Applies to:** Administrator — SharePoint admin / tenant admin

<!-- agent:
task_type: how-to
audience: administrator
outcome: Create a SharePoint Embedded app from the SharePoint admin center and prepare it for installation and consent.
next: install-sharepoint-embedded-app.md
-->

Use the SharePoint admin center **Apps** experience to create a SharePoint Embedded (SPE) app that your organization owns.
The create flow can register a new Microsoft Entra app or associate an existing Entra app with a new SPE app.

This article summarizes the administrator flow and links to source documentation for command and API details.

> [!IMPORTANT]
> You need the **SharePoint Embedded Administrator** role or Global Administrator privileges to create and manage SPE apps in the SharePoint admin center.

## Before you begin

Confirm these prerequisites.

- Your tenant has SharePoint available.
- You can sign in to the [SharePoint admin center](https://admin.microsoft.com/sharepoint).
- You have the SharePoint Embedded Administrator role or Global Administrator role.
- You know whether to create a new Microsoft Entra app or use an existing app registration.
- You know which owners should manage the app.
- You know which billing type applies to the app.
- For owner organization billing, you have owner or contributor access to the Azure subscription used for billing.

For role details, see [SharePoint Embedded administrator](../administration/adminrole.md).

## Understand the Apps page

In the SharePoint admin center, SPE apps are managed from **SharePoint Embedded** > **Apps**.
The page includes app inventory views.

| Tab | Use it for |
| --- | --- |
| All installed apps | Review SPE applications installed in the tenant. |
| Owned apps | Review SPE applications created and managed by your organization, including apps that are not currently installed. |

The **Owned apps** tab shows app ownership and billing details.
Use it to verify app creation and to start installation when an app is ready.

> [!TIP]
> Use **Owned apps** as the tenant inventory for apps your organization builds.
> Use **All installed apps** as the tenant inventory for apps available in the tenant.

## Create an app

1. Sign in to the [SharePoint admin center](https://admin.microsoft.com/sharepoint).
1. In the left navigation, expand **SharePoint Embedded**.
1. Select **Apps**.
1. Select **+ Create app**.
1. Wait for the **Create app** panel to open.

## Choose the Entra app registration option

In **Entra app registration**, choose one option.

| Option | Use it when |
| --- | --- |
| New app | You want the admin center flow to create a new Microsoft Entra application registration. |
| Use an existing Entra app | You already have a Microsoft Entra app and want to associate it with the SPE app. |

If you choose **New app**, enter the new Entra app name.
If you choose **Use an existing Entra app**, search by application ID or application name.

Do not create duplicate app registrations unless your app architecture requires them.
Use one owning application for the SPE app that owns its container type.

## Add app owners

Add up to three owners in the **Owners** field.
Owners can manage app settings and billing configuration.
Choose durable administrative owners instead of individual temporary project members.

Record the owners in your internal operations documentation.
If an owner leaves the organization, update ownership before removing their account.

## Select billing type

Billing type determines who pays for SPE consumption.
Choose carefully because the source app creation guidance states that billing type cannot be changed after app creation.

| Billing type | Meaning |
| --- | --- |
| User org | The organization using the app sets up pay-as-you-go billing in the Microsoft 365 admin center. |
| Owner org | Usage is billed to the organization that owns the app. |

Use **User org** for scenarios where each consuming tenant is responsible for billing.
Use **Owner org** when your organization owns the app and manages billing directly.

For billing concepts, see [Set up billing in Microsoft 365 admin center](setup-billing-m365-admin-center.md) and [Monitor usage, billing, and cost](monitor-usage-billing-cost.md).

## Configure owner organization billing

If you select **Owner org**, configure the billing subscription.

1. Choose whether to set up billing now or later.
1. If setting up now, provide the subscription information requested by the admin center.
1. Confirm that the subscription and resource group are valid.
1. Complete the billing step before you create the app when the app must be active immediately.

If you select **Setup later**, the app can be created but remains inactive until billing is configured.

> [!NOTE]
> For pass-through billing, the consuming tenant admin sets up billing in the Microsoft 365 admin center before users can access the app.

## Configure advanced settings

Expand **Advanced settings** when you need optional settings.
The source create-app guidance describes a **Graph Explorer** toggle for development and testing.
Turn it on only when administrators or developers need to explore Microsoft Graph requests for the app.
Turn it off when it is not needed.

For Graph Explorer documentation, see [Use Graph Explorer to try Microsoft Graph APIs](/graph/graph-explorer/graph-explorer-overview).

## Submit the app

1. Review the Entra app registration selection.
1. Review the app owners.
1. Review billing type.
1. Review advanced settings.
1. Select **Create app**.

The **Create app** button is available only after required fields are complete.
If you cancel the panel, no app is created.

## Validate app creation

After the app is created, validate it in the SharePoint admin center.

1. Return to **SharePoint Embedded** > **Apps**.
1. Open **Owned apps**.
1. Confirm that the app appears in the owned app inventory.
1. Confirm the owner list.
1. Confirm the billing type.
1. Check billing status.
1. If the app is also installed, confirm that it appears in **All installed apps**.

Use the billing status to decide the next action.

| Status | Action |
| --- | --- |
| Active | Continue with installation, consent, and operational validation. |
| Inactive | Complete billing setup or resolve the billing issue before production use. |

## Prepare for installation

App creation does not complete the consuming tenant setup by itself.
Depending on the app model, the tenant still needs installation, consent, and permission registration.

Continue with these tasks.

1. Install or register the app in the tenant.
1. Grant admin consent for requested permissions.
1. Register container type application permissions when the owning app requires it.
1. Set up pass-through billing if the consuming tenant pays for usage.
1. Verify containers after the app creates content.

## Troubleshoot app creation

Use these checks if creation fails or the app is not usable.

- Confirm your account has the SharePoint Embedded Administrator role.
- Confirm the selected existing Entra app exists and is available in the tenant.
- Confirm owners resolve in the people picker.
- Confirm required billing fields are complete.
- Confirm owner organization billing uses a valid Azure subscription and resource group.
- If the app is inactive, complete or repair billing setup.
- If users cannot access the app after creation, verify installation, admin consent, and container type permissions.

> [!WARNING]
> Do not treat app creation as proof that the app is ready for users.
> Users may still be blocked by missing installation, missing consent, or invalid billing.

## Related content

- [Admin overview](admin-overview.md)
- [Install a SharePoint Embedded app](install-sharepoint-embedded-app.md)
- [Grant admin consent and permissions](grant-admin-consent-permissions.md)
- [Set up billing in Microsoft 365 admin center](setup-billing-m365-admin-center.md)
- [Manage containers in SharePoint admin center](manage-containers-sharepoint-admin-center.md)
- [SharePoint Embedded administrator](../administration/adminrole.md)
- [Manage containers in SharePoint Admin Center](../administration/consuming-tenant-admin/ctaUX.md)

## Next steps
Install the app by using [Install a SharePoint Embedded app](install-sharepoint-embedded-app.md).
