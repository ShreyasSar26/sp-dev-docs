---
title: Microsoft Graph API Reference Links
description: Curated Microsoft Graph reference links for SharePoint Embedded containers and files.
ms.date: 06/25/2026
ms.localizationpriority: high
---

# Microsoft Graph API Reference Links

**Applies to:** Developer

<!-- agent:
task_type: reference
audience: developer
outcome: Locate Microsoft Graph reference pages for SharePoint Embedded container and file operations.
next: ../build/create-manage-containers.md
-->

SharePoint Embedded applications store and manage containers and container content through Microsoft Graph. For task guidance, see [create and manage containers](../build/create-manage-containers.md) and [manage files](../build/manage-files.md).

## Container APIs

| Area | Microsoft Graph reference |
| --- | --- |
| `fileStorageContainer` resource | [fileStorageContainer resource type](/graph/api/resources/filestoragecontainer) |
| List containers | [List containers](/graph/api/filestorage-list-containers) |
| Create container | [Create fileStorageContainer](/graph/api/filestoragecontainer-post) |
| Get container | [Get fileStorageContainer](/graph/api/filestoragecontainer-get) |
| Update container | [Update fileStorageContainer](/graph/api/filestoragecontainer-update) |
| Delete container | [Delete fileStorageContainer](/graph/api/filestoragecontainer-delete) |
| Container permissions | [Create permission](/graph/api/filestoragecontainer-post-permissions) |

## Container type APIs

| Area | Microsoft Graph reference |
| --- | --- |
| `fileStorageContainerType` resource | [fileStorageContainerType resource type](/graph/api/resources/filestoragecontainertype) |
| Container type registration | [fileStorageContainerTypeRegistration resource type](/graph/api/resources/filestoragecontainertyperegistration) |
| List container types | [List fileStorageContainerTypes](/graph/api/filestorage-list-containertypes) |

## Drive and DriveItem APIs

All file system objects in a `fileStorageContainer` are returned as `driveItem` resources.

| Area | Microsoft Graph reference |
| --- | --- |
| `drive` resource | [drive resource type](/graph/api/resources/drive) |
| `driveItem` resource | [driveItem resource type](/graph/api/resources/driveitem) |
| List children | [List children of a driveItem](/graph/api/driveitem-list-children) |
| Upload small file | [Upload or replace driveItem contents](/graph/api/driveitem-put-content) |
| Create upload session | [Create uploadSession](/graph/api/driveitem-createuploadsession) |
| Download file | [Download driveItem content](/graph/api/driveitem-get-content) |
| Delete item | [Delete driveItem](/graph/api/driveitem-delete) |
| Search with Microsoft Search | [Query the Microsoft Search API](/graph/api/search-query) |
| Create webhook subscription | [Create subscription](/graph/api/subscription-post-subscriptions) |

## Authentication

SharePoint Embedded uses Microsoft Graph permissions plus container type application permissions. Start with [SharePoint Embedded authentication and authorization](../development/auth.md) before implementing the API calls.
