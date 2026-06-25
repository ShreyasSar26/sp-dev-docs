---
title: Set Up Billing in Microsoft 365 Admin Center
description: Configure SharePoint Embedded pass-through billing in the Microsoft 365 admin center for a consuming tenant.
ms.date: 06/25/2026
ms.localizationpriority: high
---

# Set Up Billing in Microsoft 365 Admin Center

**Applies to:** Administrator — tenant admin / SharePoint admin

<!-- agent:
task_type: how-to
audience: administrator
outcome: Set up billing for SharePoint Embedded apps that are billed to the consuming tenant.
next: manage-containers-sharepoint-admin-center.md
-->

Set up SharePoint Embedded (SPE) billing in the Microsoft 365 admin center when your tenant uses an app with pass-through or user organization billing.
No user can access a pass-through SPE app before valid billing is configured for the SPE platform in the consuming tenant.

SPE billing is pay-as-you-go through Azure.
Charges are based on supported meters such as storage, API transactions, and egress.

> [!IMPORTANT]
> If SharePoint Embedded is turned off or the linked Azure subscription is disconnected, users immediately lose access to apps built on the service.

## Before you begin

Confirm these prerequisites.

- You can sign in to the [Microsoft 365 admin center](https://admin.microsoft.com/).
- You have the SharePoint Embedded Administrator role or Global Administrator role.
- You have owner or contributor permissions on the Azure subscription used for billing.
- You have an Azure subscription in the tenant.
- You have a resource group attached to the subscription.
- The SPE app is installed or ready to use in the consuming tenant.
- You understand whether the app uses pass-through billing.

For tenant role context, see [Admin overview](admin-overview.md).
For billing models, see [SharePoint Embedded billing](../administration/billing/billing.md).

## Understand billing models

SPE supports two billing models in the source billing guidance.

| Billing model | Who pays |
| --- | --- |
| Standard | The tenant that owns or develops the app is billed for consumption. |
| Pass-through | The tenant registered to use the app is billed for consumption. |

For standard billing, the developer tenant admin sets up billing for the container type.
For pass-through billing, the consuming tenant admin sets up billing in the Microsoft 365 admin center.

This article focuses on the consuming tenant pass-through path.

## Understand cost meters

SPE uses a consumption-based model.
The source meter documentation identifies three primary meters.

| Meter | What it measures |
| --- | --- |
| Storage | Data stored in files, documents, metadata, versions, recycle bin, and deleted container collection. |
| API transactions | Microsoft Graph calls made explicitly by the SPE application. |
| Egress | Data downloaded from SPE to client devices, subject to documented exemptions. |

For cost monitoring, see [Monitor usage, billing, and cost](monitor-usage-billing-cost.md).

## Open the billing setup experience

1. Sign in to the [Microsoft 365 admin center](https://admin.microsoft.com/).
1. Select **Setup**.
1. In **Files and Content**, select **Automate Content with Microsoft Syntex**.
1. Select **Go to Syntex settings**.
1. Under **Syntex services for**, select **Apps**.
1. Select **SharePoint Embedded**.
1. Follow the instructions on the **SharePoint Embedded** panel to turn on SharePoint Embedded apps.

The source consuming tenant admin and billing guidance both describe this Microsoft 365 admin center path.

> [!NOTE]
> The admin center user interface can change.
> If labels differ, search the Microsoft 365 admin center for Syntex or SharePoint Embedded billing settings.

## Select the billing profile

During setup, connect SPE billing to the appropriate Azure billing resources.

1. Select the Azure subscription approved for SPE usage.
1. Select or confirm the resource group.
1. Review the billing scope.
1. Confirm that the subscription is active.
1. Confirm that you have the required permissions.
1. Save the configuration.

Use the same internal controls you use for other pay-as-you-go Microsoft 365 connected services.

## Validate billing setup

After setup, validate that billing is active.

1. Return to the Microsoft 365 admin center SPE settings.
1. Confirm that SharePoint Embedded apps are turned on.
1. Confirm that the billing subscription remains connected.
1. Open the SharePoint admin center.
1. Go to **SharePoint Embedded** > **Apps**.
1. Confirm that the installed app does not show a billing issue.
1. Ask the app owner or a pilot user to validate app access.

If the app remains inactive, review the app billing model and the selected billing resources.

## Validate in Azure Cost Management

Use Azure Cost Management to confirm usage and prepare monitoring.

1. Open the [Azure portal](https://portal.azure.com/).
1. Go to **Cost Management + Billing**.
1. Select the subscription linked to SPE billing.
1. Open **Cost analysis**.
1. Filter or group costs using available dimensions such as meter, resource, app ID, tenant ID, or container type ID when available.
1. Save views or exports according to your operations process.

For detailed monitoring steps, see [Monitor usage, billing, and cost](monitor-usage-billing-cost.md).

## Common issues

Use these checks when setup fails.

- The admin does not have the SharePoint Embedded Administrator or Global Administrator role.
- The admin lacks owner or contributor permissions on the Azure subscription.
- The subscription is disabled or unavailable.
- No resource group is available for billing setup.
- The app uses pass-through billing but the consuming tenant has not turned on SPE apps.
- The app uses owner organization billing, so the app owner must resolve billing instead.
- Tenant policies restrict access to the Microsoft 365 admin center billing experience.

## Common access symptoms

Users may report access failures when billing is not valid.
Look for these symptoms.

- The SPE app is installed but inactive.
- Users cannot open content stored by the app.
- The SharePoint admin center shows billing warnings for the app.
- Azure Cost Management shows no linked usage because setup has not completed.
- Access stops immediately after SPE is turned off or the subscription is disconnected.

> [!WARNING]
> Do not disconnect the linked Azure subscription during business hours unless you are intentionally stopping access to SPE apps.

## Operational guidance

After setup, establish a billing operations process.

- Assign subscription owners who understand SPE usage.
- Create budgets and alerts in Azure Cost Management.
- Review storage growth for large containers.
- Review API transaction patterns after app releases.
- Review egress for download-heavy scenarios.
- Keep app owners informed when billing anomalies appear.
- Include SPE in tenant cost reviews.

## Related content

- [Grant admin consent and permissions](grant-admin-consent-permissions.md)
- [Manage containers in SharePoint admin center](manage-containers-sharepoint-admin-center.md)
- [Monitor usage, billing, and cost](monitor-usage-billing-cost.md)
- [SharePoint Embedded billing](../administration/billing/billing.md)
- [SharePoint Embedded Billing Meters](../administration/billing/meters.md)
- [Consuming Tenant Admin](../administration/consuming-tenant-admin/cta.md)

## Next step

Manage containers in [Manage containers in SharePoint admin center](manage-containers-sharepoint-admin-center.md).
