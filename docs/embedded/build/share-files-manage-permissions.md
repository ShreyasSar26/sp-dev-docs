---
title: Share Files and Manage Permissions
description: Grant, revoke, and design SharePoint Embedded file sharing with tenant policy awareness.
ms.date: 06/25/2026
ms.localizationpriority: high
---
# Share Files and Manage Permissions
**Applies to**: Developer
<!-- agent:
task_type: how-to
audience: developer
outcome: Implement additive file permissions and explain inherited access.
next: respond-to-changes-webhooks.md
-->
SharePoint Embedded content inherits permissions from the container hierarchy.
You cannot break that inherited structure for arbitrary files and folders.
Instead, extend access to specific files or folders by applying additive permissions.
For source details, see [Sharing and permissions in SharePoint Embedded](../development/sharing-and-perm.md).
> [!IMPORTANT]
> Permissions are additive. Removing an additive permission does not remove inherited container access.
## Sharing capabilities
Use container roles for baseline membership and broad access.
Use additive permissions for targeted collaboration on a file or folder.
Do not use file sharing to replace container membership management.
Do not grant additive permissions to the root folder; add the user to a container role instead.
## Grant and revoke access
Grant additive access with Microsoft Graph drive item invite:
```http
POST /drives/{drive-id}/items/{item-id}/invite
```
Set `sendInvitation` to `false`.
Use delegated permissions; app-only permissions are not supported for this operation.
Retrieve permissions with:
```http
GET /drives/{drive-id}/items/{item-id}/permissions
GET /drives/{drive-id}/items/{item-id}/permissions/{perm-id}
```
Delete additive permissions with:
```http
DELETE /drives/{drive-id}/items/{item-id}/permissions/{perm-id}
```
You can delete the additive permission only on the drive item where it was originally added.
## Permission inheritance
Separate inherited container access from added item access in your UI.
Use labels such as **Container access**, **Added access**, and **Managed by policy**.
Avoid calling a file private unless you have verified inherited access.
If a user still has access after revoke, inspect container roles and group membership.
## App UX considerations
- Disable share actions when the current user cannot share.
- Validate recipients before submitting an invite.
- Show tenant policy errors in plain language.
- Refresh permissions after grant and revoke operations.
- Provide a path to workspace membership management.
- Use your own notification experience because `sendInvitation` must be false.
## Tenant policy effects
SharePoint Embedded application sharing follows the consuming tenant sharing configuration by default.
If guest sharing is disabled in the tenant, your app cannot add guests to container roles or grant guest additive permissions.
A consuming tenant SharePoint Embedded admin can configure application-level sharing with `Set-SPOApplication`.
Application owner developers configure role-based sharing on the container type with `Set-SPOcontainerTypeConfiguration`.
The restrictive model allows only Owner and Manager roles to add new file permissions.
The open model allows members and guests with edit permissions to add new permissions.
## Troubleshooting
| Symptom | Action |
| --- | --- |
| Invite fails | Use delegated invite and `sendInvitation: false`. |
| Guest is blocked | Check tenant or app sharing policy. |
| Revoke seems ineffective | Review inherited container access. |
| Share root fails | Manage container roles instead. |
## Next step
Continue with [Respond to file and container changes with webhooks](respond-to-changes-webhooks.md).
## Implementation checklist
- Validate tenant configuration before enabling this capability.
- Recheck permissions before write operations.
- Log Graph request IDs and operation outcomes for support.
- Document rollback steps for administrators.
- Keep user-facing messages specific to the current container.
- Validate tenant configuration before enabling this capability.
- Recheck permissions before write operations.
- Log Graph request IDs and operation outcomes for support.
- Document rollback steps for administrators.
## Operational checklist
Use this checklist before you enable the capability for customers:
- Confirm the consuming tenant configuration supports the scenario.
- Confirm the signed-in user and application have the required access.
- Test the workflow with an empty container and a populated container.
- Test the workflow with external sharing disabled if sharing is involved.
- Capture Microsoft Graph request IDs in logs.
- Show actionable errors instead of raw service responses.
- Keep long-running work outside request handlers.
- Reconcile app state with SharePoint Embedded state after retries.
- Document administrator steps in your customer installation guide.
- Review related next-step articles before publishing the app experience.

## Production readiness checklist

Before you release this capability, verify the following items for your app and tenant:

- Confirm the tenant has SharePoint Embedded enabled.
- Confirm the application registration matches the deployed environment.
- Confirm admin consent is granted for required Microsoft Graph permissions.
- Confirm the container type is registered in the consuming tenant.
- Confirm users have the expected container roles.
- Confirm guest access behavior with the tenant sharing policy.
- Confirm sensitivity labels and compliance settings are respected.
- Confirm the app handles Microsoft Graph throttling.
- Confirm retry logic uses exponential backoff.
- Confirm write operations are idempotent or guarded against duplicates.
- Confirm long-running work is resumable.
- Confirm logs include correlation IDs and timestamps.
- Confirm logs do not include access tokens or secrets.
- Confirm telemetry distinguishes user errors from service errors.
- Confirm the UI explains policy-blocked actions.
- Confirm disabled actions remain keyboard accessible with explanatory text.
- Confirm localization does not change technical identifiers.
- Confirm feature flags can disable the capability if needed.
- Confirm documentation links point to the installed app version.
- Confirm operational runbooks describe common recovery steps.
- Confirm support teams know which tenant role can resolve configuration issues.
- Confirm test data does not include real customer secrets.
- Confirm cleanup tasks remove temporary migration or processing artifacts.
- Confirm related articles in this build path remain linked together.
- Confirm this scenario is covered by automated or manual regression tests.
