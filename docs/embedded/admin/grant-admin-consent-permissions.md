---
title: Grant Admin Consent and Permissions
description: Review SharePoint Embedded permissions, grant admin consent, and verify the consent state in a consuming tenant.
ms.date: 06/25/2026
ms.reviewer: dilucesr
ms.localizationpriority: high
---

# Grant Admin Consent and Permissions

**Applies to:** Administrator — tenant admin / SharePoint admin

<!-- agent:
task_type: how-to
audience: administrator
outcome: Grant admin consent for a SharePoint Embedded app and validate permission readiness.
next: setup-billing-m365-admin-center.md
-->

Grant admin consent when a SharePoint Embedded (SPE) app needs tenant-wide permissions in a consuming Microsoft 365 tenant.
Consent installs the app service principal and authorizes the permissions required by the app.
For container type registration, consent must be in place before the owning app can register permissions for containers in the consuming tenant.

Use this article to review requested permissions, grant consent, and troubleshoot common consent failures.

> [!IMPORTANT]
> Grant consent only for apps and publishers your organization trusts.
> Review the app ID, publisher, and requested permissions before approving.

## Before you begin

Confirm these prerequisites.

- You can sign in as a tenant administrator who can grant admin consent.
- You know the consuming tenant ID.
- You know the owning application client ID.
- You understand why the app needs each requested permission.
- The app owner has provided installation and consent instructions.
- Billing requirements are known for the app model.

For the consuming tenant admin role, see [Admin overview](admin-overview.md).

## Understand consent in SPE

The source registration API documentation states that an owning application must meet two requirements before it can act on a consuming tenant.

1. The owning app must have a service principal installed in the consuming tenant.
1. The owning app must be granted admin consent to perform container type registration in the consuming tenant.

Both requirements can be satisfied when a tenant administrator grants admin consent to the owning application.

The container type registration API requires the `Container.Selected` app-only permission for SharePoint.
It is a SharePoint API and not a Microsoft Graph API in the source documentation.
The app uses the client credentials grant flow and certificate-based token request for that registration API.

For API details, see [Register file storage container type application permissions](../getting-started/register-api-documentation.md).

## Review requested permissions

Before granting consent, review the requested permissions with the app owner.

| Review item | Why it matters |
| --- | --- |
| Application client ID | Confirms you are consenting to the intended owning app. |
| Publisher | Helps validate trust and support ownership. |
| Permission list | Shows what the app can do after consent. |
| Container type ID | Identifies the container type the app owns. |
| Guest app access | Identifies other apps that may receive access through registration. |
| Billing model | Determines whether the tenant must configure billing before users can use the app. |

Ask the app owner to explain any permission that does not align with the expected scenario.

> [!CAUTION]
> Do not grant consent from a copied URL unless you have verified the `client_id` value.
> A consent URL grants permissions to the app identified by that client ID.

## Grant admin consent from the consent endpoint

The source guidance shows the Microsoft identity platform admin consent endpoint.
Use the tenant and client IDs for your environment.

```http
https://login.microsoftonline.com/<ConsumingTenantID>/adminconsent?client_id=<OwningTenantClientID>
```

1. Replace `<ConsumingTenantID>` with the consuming tenant ID.
1. Replace `<OwningTenantClientID>` with the owning application client ID.
1. Open the URL in a browser session signed in as an administrator who can grant consent.
1. Review the app name and publisher.
1. Review requested permissions.
1. Accept only if the request matches the approved app.
1. Follow the success or failure redirect configured by the app owner.

For Microsoft identity platform details, see [Admin consent URI](/entra/identity-platform/v2-admin-consent).
For national cloud endpoints, see [Microsoft Entra authentication endpoints on national clouds](/entra/identity-platform/authentication-national-cloud#microsoft-entra-authentication-endpoints).

## Grant consent from Microsoft Entra admin experiences

If your organization uses Microsoft Entra admin center workflows, grant consent through the enterprise application experience when available.

1. Open the Microsoft Entra admin center.
1. Locate the enterprise application for the SPE owning app.
1. Review the app properties and publisher.
1. Review permissions.
1. Grant tenant-wide admin consent if the request is approved.
1. Confirm the consent status after the operation completes.

Use your organization's privileged access process for approval.
Keep a record of who approved the request and why.

## Verify the service principal

After consent, confirm that the app is represented in the consuming tenant.

1. In Microsoft Entra, search for the enterprise application by application ID or name.
1. Confirm that the application exists.
1. Confirm the publisher and application ID.
1. Confirm that permissions show the expected consent state.
1. Confirm that no unexpected permissions were granted.

If the service principal is missing, consent did not complete or targeted a different tenant.

## Verify SPE application state

After consent, validate the SPE app from the SharePoint admin center or PowerShell.

In the SharePoint admin center:

1. Go to **SharePoint Embedded** > **Apps**.
1. Confirm the app appears in the appropriate app inventory.
1. Review app details and billing status.

With SharePoint Online Management Shell, use the application inventory command documented for consuming tenant admins.

```powershell
Get-SPOApplication
```

For a specific owning app, use:

```powershell
Get-SPOApplication -OwningApplicationId <OwningApplicationId>
```

For command details, see [Get-SPOApplication](/powershell/module/sharepoint-online/get-spoapplication).

## Understand container type permissions

The registration API determines what permissions SPE applications can perform against containers and content for a specified container type.
The source documentation lists permissions such as read, write, create, delete, read content, write content, and permissions management.

Do not manually invent or assume permission names.
Use the permission names and request format documented in [Register file storage container type application permissions](../getting-started/register-api-documentation.md).

The last successful registration API call determines the active permission settings in the consuming tenant.
Ask the app owner to confirm when registration has completed.

## Troubleshoot consent failures

Use these checks when consent fails.

- Confirm the admin account can grant tenant-wide admin consent.
- Confirm the consent URL uses the correct consuming tenant ID.
- Confirm the `client_id` is the owning application client ID.
- Confirm the app registration exists and is configured correctly by the app owner.
- Confirm the redirect URI or success handling is configured by the app owner.
- Confirm your tenant policies allow user or admin consent for the app.
- Confirm national cloud endpoints are correct when applicable.
- Confirm the app is not blocked by publisher or enterprise app policies.

## Troubleshoot access denied after consent

Use these checks when consent succeeds but API calls fail.

- Confirm the app owner registered container type permissions after consent.
- Confirm the app is the owning application for the container type when invoking the registration API.
- Confirm the app uses the required SharePoint permission.
- Confirm the app uses app-only authentication when required.
- Confirm the app uses certificate-based client credentials for the registration API.
- Confirm the consuming tenant SharePoint root site URL is correct.
- Confirm billing is active when the app uses pass-through billing.

> [!NOTE]
> The registration API source states that failure to register permissions can result in access denied errors when invoking other APIs against containers or content.

## Related content

- [Install a SharePoint Embedded app](install-sharepoint-embedded-app.md)
- [Set up billing in Microsoft 365 admin center](setup-billing-m365-admin-center.md)
- [Manage containers with PowerShell](manage-containers-powershell.md)
- [Register file storage container type application permissions](../getting-started/register-api-documentation.md)
- [Consuming Tenant Admin](../administration/consuming-tenant-admin/cta.md)

## Next steps
Configure billing in [Set up billing in Microsoft 365 admin center](setup-billing-m365-admin-center.md).
