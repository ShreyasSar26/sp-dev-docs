---
title: Validate Customer App Installation
description: Validate SharePoint Embedded tenant registration, permissions, containers, and billing after a customer installs an ISV app.
ms.date: 06/25/2026
ms.reviewer: dilucesr
ms.localizationpriority: high
---
# Validate Customer App Installation

**Applies to:** ISV / developer admin

<!-- agent:
task_type: how-to
audience: isv
outcome: Confirm that a customer tenant can administer and use an installed SharePoint Embedded app.
next: ../admin/admin-overview.md
-->

Use this article after a customer administrator completes SharePoint Embedded app setup.
Validation confirms that the tenant registration, consent, billing, administration visibility, and basic container operations are working.
Run these checks with the customer admin before you announce the app to users.

> [!IMPORTANT]
> Validate in the customer tenant that will run the production workload.
> A successful test in your developer tenant doesn't prove that the customer tenant is registered, consented, or billed correctly.

## Validation goals

Complete these goals before closing customer onboarding:

1. Confirm that the app and container type are registered in the customer tenant.
1. Confirm that the expected permissions are granted.
1. Confirm that billing is valid for pass-through apps.
1. Confirm that the app can create or access a container.
1. Confirm that the customer admin can view the app and container.
1. Confirm that content operations work for a test user.
1. Confirm that common failure modes have been ruled out.

For customer setup steps, see [Guide customers through tenant setup](customer-tenant-setup-guide.md).

## People involved

Validation usually needs both ISV and customer roles.

| Role | Responsibility |
| --- | --- |
| ISV administrator | Supplies expected app IDs, container type ID, app behavior, and support troubleshooting. |
| Customer Global Administrator or SharePoint Embedded Administrator | Confirms tenant setup, billing, and administration visibility. |
| Customer Azure billing owner or contributor | Helps resolve pass-through billing setup issues. |
| Test user | Signs in and performs app-level document actions. |

## Before you start

Collect these values:

- Customer tenant name or ID.
- Owning application ID.
- Guest application ID, if your app uses one.
- Container type ID.
- Container type name.
- Billing model.
- Test user account.
- Test container name or identifier.
- Expected sharing behavior.
- Support ticket or onboarding record.

> [!TIP]
> Keep the validation record with the customer's installation package.
> It helps future support teams distinguish setup issues from product regressions.

## Step 1: Confirm tenant registration

Confirm that the container type is registered in the consuming tenant.
The container type documentation states that registration is required before an app can create and interact with containers.
Use your product's setup portal or registration flow to show the registration state.

Ask the customer admin to verify:

- The app ID matches the ISV handoff.
- The container type ID matches the ISV handoff.
- The registration completed in the expected tenant.
- No pending setup task remains in your app's admin experience.

If registration isn't complete, return to [Guide customers through tenant setup](customer-tenant-setup-guide.md).

## Step 2: Verify application visibility

The consuming tenant admin PowerShell source describes application administration cmdlets for viewing SPE applications registered in a tenant.
Customer admins can use the latest SharePoint Online Management Shell to inspect applications.
Link customers to the source article for current syntax and permissions:

- [SharePoint Embedded container management in PowerShell](../administration/consuming-tenant-admin/ctapowershell.md)

The source lists these application administration capabilities:

- Get details of all SPE applications registered in the tenant.
- Get details of applications sorted by storage.
- Get details of a specific SPE application.
- Get permissions of owning applications in the tenant.
- Configure external sharing settings for containers of an application.

> [!NOTE]
> Ask the customer to install the latest SharePoint Online Management Shell before running administration cmdlets.

## Step 3: Verify permissions

Confirm that the customer granted the expected permissions and no unexpected app ID was used.
If your app uses a guest application, the consuming tenant admin PowerShell article describes viewing guest application permissions for an owning application.

Validate the following items:

- Admin consent was granted by an authorized customer admin.
- The consented app ID matches the ISV installation package.
- The permission set matches the expected app behavior.
- Guest application permissions are present when required.
- Delegated and app-only behavior matches your design.
- Test users are present in Microsoft Entra ID as members or guests.

> [!CAUTION]
> Do not continue validation if the app ID or publisher doesn't match the installation package.
> Stop and resolve the consent mismatch first.

## Step 4: Verify billing status

Billing validation depends on the selected billing model.

### Standard billing

For standard billing, confirm internally that your developer tenant billing relationship is active.
The customer doesn't need to configure an SPE billing profile for your app.
Still tell the customer how SPE consumption is handled commercially.

Check:

- The app is documented as standard billed.
- Your operations team can monitor consumption.
- The customer handoff doesn't ask the customer to configure pass-through billing.

### Pass-through billing

For pass-through billing, the consuming tenant admin source states that no user can access pass-through SPE apps before valid billing is set up.
Ask the customer admin to confirm billing in the Microsoft 365 admin center.

Check:

- A valid Azure subscription is connected.
- A valid resource group is selected.
- The setup was completed for SharePoint Embedded apps.
- The customer billing admin has owner or contributor permissions where required.
- The customer understands that disabling billing interrupts user access.

For billing model guidance, see [Choose a billing model for your app](choose-app-billing-model.md).

## Step 5: Create or open a test container

Use your app's normal product flow to create or open a test container in the customer tenant.
Do not use a hidden validation path that bypasses the same permissions and tenant registration used by production users.

Validate:

- The app can create a container of the expected container type.
- The app can open an existing test container.
- The app can upload a small test document.
- The app can read the test document.
- The app can update or delete the test document if those actions are part of the product.
- The app reports errors in a way the customer and ISV support can troubleshoot.

> [!WARNING]
> Avoid destructive validation in an existing production container.
> Use a clearly named test container and remove test content when validation is complete.

## Step 6: Verify container administration

The consuming tenant admin PowerShell source lists container administration capabilities that customer admins can use after setup.
Depending on the customer's policy and your validation plan, ask the admin to confirm that they can:

- Get details of containers for the SPE application.
- View details of a specific container.
- View containers sorted by storage.
- Set a sensitivity label where applicable.
- Manage deleted containers where applicable.
- Restore or permanently delete test containers only when intended.

The source article documents cmdlets such as `Get-SPOContainer`, `Set-SPOContainer`, `Remove-SPOContainer`, `Get-SPODeletedContainer`, `Restore-SPODeletedContainer`, and `Remove-SPODeletedContainer`.
Link to the source for current syntax instead of embedding a full cmdlet reference in your app guide.

## Step 7: Verify sharing and compliance expectations

SharePoint Embedded uses Microsoft 365 security and compliance capabilities.
Ask the customer admin to validate the settings that matter for the app:

- External sharing behavior.
- Guest user access.
- Sensitivity label expectations.
- Retention or deletion expectations.
- Audit or compliance review requirements.
- Customer policy exceptions, if any.

If the app requires external collaboration, confirm that customer tenant sharing policies allow the intended behavior.
If sharing is restricted, document the product impact before users start using the app.

## Common failure modes

Use this table during onboarding.

| Failure mode | What to check | Where to link |
| --- | --- | --- |
| App doesn't appear for admin | Tenant registration and app ID | [Consuming Tenant Admin](../administration/consuming-tenant-admin/cta.md) |
| Consent error | Admin role and expected permissions | Customer's Microsoft Entra admin experience |
| Pass-through app inaccessible | Billing setup and Azure subscription | [Guide customers through tenant setup](customer-tenant-setup-guide.md) |
| Container create fails | Registration, permissions, and billing | [SharePoint Embedded container management in PowerShell](../administration/consuming-tenant-admin/ctapowershell.md) |
| Guest user can't access content | Guest identity and sharing policy | [Consuming Tenant Admin](../administration/consuming-tenant-admin/cta.md) |
| Admin cmdlets fail | Role assignment and latest PowerShell | [SharePoint Embedded container management in PowerShell](../administration/consuming-tenant-admin/ctapowershell.md) |
| Billing was disconnected | SPE platform access is interrupted | [Consuming Tenant Admin](../administration/consuming-tenant-admin/cta.md#invalid-billingturn-off-sharepoint-embedded) |

## Validation checklist

Use this checklist as the final customer signoff.

- [ ] Customer admin role is confirmed.
- [ ] App ID and container type ID match the ISV handoff.
- [ ] Admin consent is complete.
- [ ] Container type registration is complete.
- [ ] Billing is valid or not required for the customer tenant.
- [ ] Test user can sign in.
- [ ] Test container can be created or opened.
- [ ] Test file operations work.
- [ ] Customer admin can view the app or container in administration tools.
- [ ] Sharing and compliance expectations are documented.
- [ ] Test content is removed or retained by agreement.
- [ ] Support handoff is complete.

## After validation

After validation succeeds:

1. Record the date, tenant, app ID, and container type ID.
1. Save the billing model and customer setup result.
1. Share the validation checklist with the customer admin.
1. Move the customer to production rollout.
1. Keep links to the current administration docs in your support playbook.

If validation fails, keep the customer in onboarding and resolve the failing area before you enable broad user access.

## Next steps
After customer validation, continue to the SharePoint Embedded admin overview.

> [!div class="nextstepaction"]
> [Admin overview](../admin/admin-overview.md)
