---
title: Guide Customers Through Tenant Setup
description: Give customer admins the SharePoint Embedded setup, consent, billing, and validation steps needed to install an ISV app.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Guide Customers Through Tenant Setup

**Applies to:** ISV / developer admin

<!-- agent:
task_type: how-to
audience: isv
outcome: Provide a customer administrator with a complete SharePoint Embedded tenant setup guide for an ISV app.
next: validate-customer-installation.md
-->

Use this article to create the customer-facing setup guide for a multitenant SharePoint Embedded app.
The customer administrator is the consuming tenant admin.
This admin manages SPE applications registered in the Microsoft 365 tenant and the containers that hold customer content.

> [!IMPORTANT]
> Do not send customers only an app link.
> SharePoint Embedded onboarding can require admin consent, tenant registration, role assignment, and billing setup.

## Customer admin role

Tell customers who should perform the setup.
A consuming tenant admin can be a Global Administrator or a user assigned the SharePoint Embedded Administrator role.
The role is available in Microsoft Entra and the Microsoft 365 admin center.
Global Administrators already have the permissions of the SharePoint Embedded Administrator role.

For the source role description, see [Consuming Tenant Admin](../administration/consuming-tenant-admin/cta.md).

## Customer prerequisites

Ask the customer to confirm these prerequisites before the setup meeting or installation window.

| Area | Customer requirement |
| --- | --- |
| Microsoft 365 | An active SharePoint tenant is available. |
| Admin role | A Global Administrator or SharePoint Embedded Administrator can complete setup. |
| Users | Users who authenticate to SPE containers are present in Microsoft Entra ID as members or guests. |
| Consent | The customer can review and grant the Microsoft Entra permissions requested by the app. |
| Billing | An Azure subscription and resource group are available if the app uses pass-through billing. |
| Support | The customer has your app ID, support contact, and validation checklist. |

> [!NOTE]
> The billing source states that an Office license isn't required to collaborate on Microsoft Office documents stored in a container.

## Information to give the customer

Provide these values in your setup guide:

- Product name.
- Publisher name.
- Owning application ID.
- Container type ID.
- Container type name.
- Billing model.
- Microsoft Entra permissions requested by the app.
- Consent URL or admin consent instructions for your app.
- Redirect or sign-in URL used by the app.
- Support contact.
- Expected setup duration.
- Validation steps.

For ISV preparation guidance, see [Prepare your app for customer installation](prepare-customer-installation.md).

## Setup overview for customers

Use the following high-level sequence in your customer guide:

1. Assign the right admin role.
1. Review the app publisher, app IDs, and requested permissions.
1. Grant admin consent when required.
1. Register the SPE container type in the consuming tenant through your app's setup flow.
1. Configure pass-through billing when required.
1. Validate that the app appears to the customer admin.
1. Create or access a test container.
1. Confirm the app can perform the expected file operations.
1. Remove test content or keep it according to the customer's validation policy.

## Step 1: Assign the administrator

Ask the customer to choose an administrator who can complete the full setup.
If the customer doesn't want to use a Global Administrator, they can assign the SharePoint Embedded Administrator role.
The consuming tenant admin source states that this role can run the SPE container cmdlets and manage SPE applications in the tenant.

Tell the customer to complete role assignment before the installation window.
This avoids delays when billing or validation requires elevated access.

## Step 2: Review the application

Ask the customer administrator to review:

- Publisher identity.
- Application ID.
- Container type ID.
- Requested permissions.
- Data stored in SPE containers.
- Whether the app permits guest access.
- Support and incident response commitments.
- Billing model.

> [!TIP]
> Include screenshots or tenant-specific values in your handoff if your installation flow is hosted in your SaaS admin portal.
> Keep links stable so customer admins can reuse the guide for production and disaster recovery.

## Step 3: Grant admin consent

The customer administrator grants consent for the permissions your app requires.
Document the exact consent experience for your app, but do not duplicate a generated consent URL without explaining what it does.

Include the following guidance:

1. Sign in with the customer administrator account.
1. Open the app setup or consent experience that you provide.
1. Review the publisher and requested permissions.
1. Grant consent only if the publisher and permissions match the customer handoff.
1. Record the time and administrator who completed consent.

> [!CAUTION]
> Customer admins should not grant consent to an app ID that differs from the ID in your signed installation package.

## Step 4: Register the container type

To create and interact with containers, the container type must be registered in the consuming tenant.
The container type documentation describes registration as a requirement before containers can be created and used.
Because this flow is app-specific, link your customer to your product's setup experience and to the current registration documentation when it is available.

Ask the customer to confirm that:

- The setup flow uses the expected owning application ID.
- The registration targets the expected container type ID.
- The registration completes in the customer's tenant.
- Any error message is captured with time, tenant, and correlation information when available.

## Step 5: Set up billing when required

Skip this step only when your app uses standard billing.
If your app uses pass-through billing, tell the customer that SPE billing must be configured before users can access the app.

The consuming tenant admin source provides this setup path:

1. Open the [Microsoft 365 admin center](https://admin.microsoft.com/).
1. Go to **Setup**.
1. In **Files and Content**, select **Automate Content with Microsoft Syntex**.
1. Select **Go to Syntex settings**.
1. Under **Syntex services for**, select **Apps**.
1. Select **SharePoint Embedded**.
1. Follow the instructions on the SharePoint Embedded page to turn on SharePoint Embedded apps.

The customer needs a valid Azure subscription and resource group.
The admin who creates the billing relationship needs owner or contributor permissions on the Azure subscription.

> [!WARNING]
> If pass-through billing is turned off or the linked Azure subscription is disconnected, users immediately lose access to apps built on the service.

## Step 6: Validate administration visibility

After consent, registration, and billing are complete, ask the customer admin to verify that the app can be managed.
The consuming tenant admin source states that admins can use SharePoint Online Management Shell and SharePoint Administrator Center experiences to manage SPE applications and containers.

Customer admins can:

- Enumerate applications in the tenant.
- Enumerate containers of an application.
- View container details.
- View active and deleted containers in admin experiences.
- Manage sensitivity labels and sharing settings where supported.
- Review security and compliance behavior.

For deeper validation steps, see [Validate customer app installation](validate-customer-installation.md).

## Customer setup checklist

Give customers a checklist they can sign off.

- [ ] The assigned admin has the Global Administrator or SharePoint Embedded Administrator role.
- [ ] The app ID and publisher match the ISV handoff.
- [ ] Admin consent is granted for the expected app.
- [ ] The container type is registered in the consuming tenant.
- [ ] Pass-through billing is configured, if required.
- [ ] A test user can sign in to the app.
- [ ] A test container can be created or opened.
- [ ] A test document can be uploaded, read, and deleted.
- [ ] The customer admin can view the app or containers in administration tools.
- [ ] Validation notes and support contacts are recorded.

## Troubleshooting during setup

Use this table to route early setup problems.

| Symptom | Likely area | Action |
| --- | --- | --- |
| Customer can't grant consent | Microsoft Entra permissions | Confirm the admin role and app ID. |
| App can't create containers | Registration or permissions | Confirm container type registration and consent. |
| Users can't access a pass-through app | Billing | Confirm SPE billing is turned on in the consuming tenant. |
| Admin can't run management cmdlets | Role or tooling | Confirm SharePoint Embedded Administrator role and latest SharePoint PowerShell. |
| App works for members but not guests | Identity or sharing | Confirm guest identities and customer sharing policies. |

## Next steps
After setup, validate the installation with the customer administrator.

> [!div class="nextstepaction"]
> [Validate customer app installation](validate-customer-installation.md)
