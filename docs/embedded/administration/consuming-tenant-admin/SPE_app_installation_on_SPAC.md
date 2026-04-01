# Create a SharePoint Embedded app in the SharePoint admin center

**Applies to:** SharePoint admin center | SharePoint Embedded

The SharePoint admin center provides a unified **Apps** experience under **SharePoint Embedded** that lets administrators create, install, and manage SharePoint Embedded applications from a single location. This article explains how to use the **Create app** experience to register a new Microsoft Entra app and configure billing for your organization.

---

## Overview

The **Apps** page in the SharePoint admin center is the central hub for managing SharePoint Embedded applications in your tenant. It is divided into two tabs:

- **All installed apps** — Lists every SharePoint Embedded application currently installed in your organization's tenant, including apps built by your organization, external organizations, or Microsoft. Note that Microsoft-created SharePoint Embedded apps are not listed in the current version.

- **Owned apps** — Lists all SharePoint Embedded applications created and managed by your tenant, including both installed and uninstalled apps. This view shows each app's billing type, assigned owners, and creation date.

> **Tip:** Use the **Owned apps** tab to get a full inventory of apps your organization has built, regardless of their current installation status.

---

## Prerequisites

Before you create a SharePoint Embedded app, make sure you have:

- SharePoint Embedded Administrator. 
- (Optional) An existing Microsoft Entra app registration if you want to use an existing Entra app instead of creating a new one.
- Owner/contributor access on a billing subscription in case of "Owner org" billing

---

## Open the Apps page

1. Sign in to the [SharePoint admin center](https://admin.microsoft.com/sharepoint).
2. In the left navigation, expand **SharePoint Embedded**, then select **Apps**.
3. The **Apps** page opens on the **All installed apps** tab by default.

---

## Create a new app

1. On the **Apps** page, select **+ Create app**.  
   The **Create app** panel opens on the right side of the screen.

2. Under **Entra app registration**, choose one of the following options:

   | Option | When to use |
   |---|---|
   | **New app** | You want to register a brand-new Microsoft Entra application as part of this workflow. Enter a name in the **New Entra app name** field. |
   | **Use an existing Entra app** | You already have a Microsoft Entra app registered and want to associate it with a new SharePoint Embedded app. Search for the app by application ID or application name. |

3. In the **Owners** field, add up to three owners for the app. Owners can manage app settings and billing configuration.

---

## Configure billing

Billing type is a permanent setting and **cannot be changed after the app is created**. Choose carefully based on how your organization intends to deploy and monetize the application.

### Billing type options

| Billing type | Description | Best for |
|---|---|---|
| **User org** | Pay-as-you-go billing is connected in the Microsoft 365 admin center for the organization with the app users. | Apps where billing is handled by the tenant that uses the app. |
| **Owner org** | App usage is billed to the developer's Microsoft 365 subscription. | Line-of-business apps where you or the app owners will manage billing directly. |

> **Note:** For a line-of-business app, select **Owner org** if you or the app owners will set up billing. Select **User org** to defer billing to the billing admin of the organization using the app.

### Billing subscription setup (Owner org only)

If you select **Owner org** as the billing type, you must also configure the billing subscription:

- **Setup now** — Immediately link the app to an active billing subscription.
- **Setup later** — Create the app first and configure billing at a later time. The app will remain **Inactive** until billing is set up.

---

## Configure advanced settings (optional)

Select **Advanced settings** to expand additional configuration options.

### Graph Explorer

The **Graph Explorer** toggle enables Microsoft Graph Explorer access for the app. Microsoft Graph Explorer is a tool that helps developers explore Microsoft Graph APIs and inspect request and response data. This is useful during development and testing.

- Toggle **On** to enable Graph Explorer for the app.
- Toggle **Off** to disable it.

For more information, see [Use Graph Explorer to try Microsoft Graph APIs](https://learn.microsoft.com/en-us/graph/graph-explorer/graph-explorer-overview).

---

## Submit the form

When you have configured all required settings, select **Create app** to register the app.

> **Note:** The **Create app** button is unavailable until all required fields are complete. If you are using an existing Entra app with the **Owner org** billing type, you must select either **Setup now** or **Setup later** before the button becomes active.

Select **Close** to cancel without saving.

---

## Verify the new app

After the app is created, you can verify it in two places:

- **All installed apps tab** — The app appears in the list with its billing type and billing status. If you chose **Setup later**, the billing status shows as **Inactive** with a warning indicator until billing is configured.

- **Owned apps tab** — The app appears with its assigned owners and creation date. If the app has not yet been installed in a tenant, an **Install** link appears in the **Actions** column.

---

## Understand billing status

| Status | Description |
|---|---|
| **Active** | The app is installed and billing is configured. |
| **Inactive** | The app is installed but billing has not been set up, or there is a billing issue that requires attention. |

Apps with an **Inactive** status display a warning indicator (⚠) in the **Billing status** column. Select the app to review and resolve the billing configuration.

---

## Related content

- [Overview of SharePoint Embedded](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview)  
- [SharePoint Embedded billing and licensing](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/concepts/admin-exp/billing/billing)  
- [Manage SharePoint Embedded apps in the admin center](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/concepts/admin-exp/app-management)  
- [Use Graph Explorer to try Microsoft Graph APIs](https://learn.microsoft.com/en-us/graph/graph-explorer/graph-explorer-overview)
