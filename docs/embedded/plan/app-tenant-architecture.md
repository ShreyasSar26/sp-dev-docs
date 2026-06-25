---
title: Understand App and Tenant Architecture
description: Plan how SharePoint Embedded apps, tenants, container types, and containers relate across owning and consuming tenants.
ms.date: 06/25/2026
ms.localizationpriority: high
---

# Understand App and Tenant Architecture

**Applies to:** Architect

<!-- agent:
task_type: concept
audience: architect
outcome: Understand where apps are owned, where containers are created, and how tenant roles affect architecture.
next: ../plan/choose-app-model.md
-->

Use this article to map the core SharePoint Embedded (SPE) architecture before you choose an app model or create a container type.

SharePoint Embedded is API-only storage built on Microsoft 365. Your application provides the user experience. Files and documents are stored in containers and accessed through Microsoft Graph.

For the source architecture description, see [App architecture](../development/app-architecture.md) and [SharePoint Embedded overview](../overview.md).

## Architecture at a glance

SharePoint Embedded separates three concepts:

- The application that calls Microsoft Graph.
- The container type that defines application access, behavior, and billing accountability.
- The containers and files that live inside a Microsoft 365 tenant boundary.

All files and documents in SharePoint Embedded are stored in containers.

All containers and container content are created and stored within a Microsoft 365 tenant.

Applications create, manage, and interact with containers and container content through Microsoft Graph.

## Developer tenant and consuming tenant

SharePoint Embedded uses two tenant roles.

| Tenant role | Meaning | Typical responsibility |
| --- | --- | --- |
| Owning tenant | The Microsoft Entra ID tenant where a container type is created. | Own the application registration and manage the container type. |
| Consuming tenant | The Microsoft Entra ID tenant where a container type is used. | Host containers and content for users of the application. |

The same Microsoft Entra ID tenant can be both the owning tenant and the consuming tenant for a given container type.

For example, an enterprise line-of-business (LOB) app can be owned by the enterprise tenant and used in that same tenant.

An independent software vendor (ISV) app can be owned by the ISV tenant and used in a customer tenant.

> [!IMPORTANT]
> Containers and content are stored in the consuming tenant. They don't move into the developer or ISV tenant just because the app is owned there.

## App ownership

A SharePoint Embedded application is a Microsoft Entra ID application registration.

As an owning or guest application to a container type, the app has access to containers of that container type.

Every container type is strongly coupled with one owning application.

SharePoint Embedded requires a 1:1 relationship between an owning application and a container type.

This means:

- One owning app owns one container type.
- The owning app developer is responsible for creating and managing that container type.
- The container type records the app relationship that controls access to containers of that type.

> [!NOTE]
> Other applications can be granted access to the same container type, but the container type still has one owning application.

## Container types

A container type is a SharePoint Embedded resource.

It defines the relationship, access privileges, and billing accountability between an application and a set of containers.

It also defines selected behaviors for all containers of that type.

The container type is represented on each container as an immutable property.

Use a container type to answer these architecture questions:

- Which app owns this family of containers?
- Which apps can access containers of this type?
- Which tenant is accountable for billing?
- Which tenant can create containers of this type?
- Which behavior settings apply to all containers of this type?

For more detail, see [Understand container types and containers](../plan/container-types-and-containers.md).

## Containers

A container is the basic storage unit in SharePoint Embedded.

A container also defines a security and compliance boundary.

Applications can create many containers for a container type inside each consuming tenant.

Each container provides a place to store files. You can think of it as similar to an API-only document library in SharePoint, with differences specific to SharePoint Embedded.

Containers can store many files and multiple terabytes of content, subject to SharePoint Embedded limits.

For current limits, see [Understand limits and calling patterns](../plan/limits-calling-patterns.md).

## Where files live

When a consumer uses a SharePoint Embedded app in their Microsoft 365 tenant, SharePoint Embedded creates a storage partition in that tenant.

The partition doesn't have a SharePoint user experience.

Documents in the partition are accessible through APIs and through app-provided content experiences.

Files remain inside the consumer's Microsoft 365 tenant boundary.

Consumer Microsoft 365 settings apply to app documents, including supported Microsoft Purview security and compliance policies.

For governance planning, see [Plan security, compliance, and governance](../plan/security-compliance-governance.md).

## Tenant registrations

An owning app can't interact with containers in a consuming tenant until the container type is registered in that consuming tenant.

Container type registration is performed by the owning application.

The registration specifies which permissions can be performed against the container type in the consuming tenant.

For full registration requirements, see [Register file storage container type application permissions](../getting-started/register-api-documentation.md).

## Access relationships

An application's access to containers and content is determined by permissions configured between the application and the container type.

The owning application receives permissions for its container type when the container type is created.

SharePoint Embedded also allows applications to access containers of container types they don't own when those permissions are granted.

Plan the access model with both application permissions and user container permissions.

For full details, see [Plan authentication and permissions](../plan/authentication-permissions.md).

## Common architecture patterns

### Enterprise LOB app

In an enterprise LOB app:

- The enterprise tenant usually owns the app registration.
- The enterprise tenant creates the container type.
- The same enterprise tenant consumes the app.
- Containers and files are stored in the enterprise tenant.
- Enterprise admins manage billing, compliance, and tenant settings.

Use this model when the app is built for internal use in one organization.

### ISV multitenant app

In an ISV app:

- The ISV tenant owns the app registration.
- The ISV tenant creates the container type.
- Customer tenants consume the app.
- Containers and files are stored in each customer tenant.
- Customer tenant settings apply to that customer's content.

Use this model when one app is used by multiple customer tenants.

For model selection, see [Choose an app model: single-tenant or multitenant](../plan/choose-app-model.md).

## Planning checklist

- Identify the owning tenant.
- Identify each consuming tenant.
- Confirm where the Microsoft Entra ID application registration lives.
- Confirm which app owns the container type.
- Decide whether other guest apps need access.
- Decide where containers are created.
- Confirm that content must remain in the consuming tenant.
- Plan container type registration for each consuming tenant.
- Plan billing for the container type.
- Plan authentication and admin consent.
- Plan security and compliance responsibilities.

## Next step

Choose the app model that matches your tenant and customer relationship: [Choose an app model: single-tenant or multitenant](../plan/choose-app-model.md).
