---
title: Create fileStorageContainer
slug: graph-api/filestoragecontainer-post
persona: developer
scenario_ids: [D2]
source_of_truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-post?view=graph-rest-beta
api_surface: Microsoft Graph (beta)
last_verified: 2026-06-23
agent_ready: true
---

# Create fileStorageContainer

> Create a new fileStorageContainer object.

**Agent task:** Perform this Microsoft Graph operation for SharePoint Embedded. Use the exact HTTP method, URL, required permissions, request body, and response shown below; prefer least-privilege permissions and handle throttling (429/Retry-After).

Namespace: microsoft.graph

> *(Permissions/details table is in the source page — see source_of_truth.)*

Create a new [fileStorageContainer](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainer?view=graph-rest-beta) object. 

The respective container type identified by **containerTypeId** must be enabled in the tenant. 

For delegated calls, the calling user is set as the owner of the **fileStorageContainer**. 

> *(Permissions/details table is in the source page — see source_of_truth.)*

## Permissions

Choose the permission or permissions marked as least privileged for this API. Use a higher privileged permission or permissions [only if your app requires it](https://learn.microsoft.com/graph/permissions-overview#best-practices-for-using-microsoft-graph-permissions). For details about delegated and application permissions, see [Permission types](https://learn.microsoft.com/graph/permissions-overview#permission-types). To learn more about these permissions, see the [permissions reference](https://learn.microsoft.com/graph/permissions-reference).

> *(Permissions/details table is in the source page — see source_of_truth.)*

> *(Permissions/details table is in the source page — see source_of_truth.)*

## HTTP request

  "blockType": "ignored"
}
```http
POST /storage/fileStorage/containers
```
## Optional query parameters

This method supports the following OData query parameters to help customize the response. For general information, see [OData query parameters](https://learn.microsoft.com/graph/query-parameters).

| Name      |Description|
|:----------|:----------|
| dataLocation |Specifies the desired data location for container creation in Multi-Geo tenants. Omitting the `dataLocation` parameter in the request creates the container at the tenant's default location. For more information, see [Microsoft 365 Multi-Geo](https://learn.microsoft.com/microsoft-365/enterprise/microsoft-365-multi-geo?view=o365-worldwide&preserve-view=true#microsoft-365-multi-geo-availability).|

## Request headers
|Name|Description|
|:---|:---|
|Authorization|Bearer {token}. Required. Learn more about [authentication and authorization](https://learn.microsoft.com/graph/auth/auth-concepts).|
|Content-Type|application/json. Required.|

## Request body
In the request body, supply a JSON representation of the [fileStorageContainer](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainer?view=graph-rest-beta) object.

You can specify the following properties when you create a **fileStorageContainer**.

|Property|Type|Description|
|:---|:---|:---|
|displayName|String|The display name of the container. Required.|
|description|String|Provides a user-visible description of the item. Optional.|
|containerTypeId|GUID|The container type of the container instance. Required.|
|settings|[fileStorageContainerSettings](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainersettings?view=graph-rest-beta)|Settings associated with the container. Optional.|

## Response

If successful, this method returns a `201 Created` response code and a [fileStorageContainer](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainer?view=graph-rest-beta) object in the response body.

## Examples

### Request
The following example shows how to create a **fileStorageContainer**.

# [HTTP](#tab/http)
  "blockType": "request",
  "name": "create_filestoragecontainer"
}
```http
POST https://graph.microsoft.com/beta/storage/fileStorage/containers
Content-Type: application/json

{
  "displayName": "My Application Storage Container",
  "description": "Description of My Application Storage Container",
  "containerTypeId": "91710488-5756-407f-9046-fbe5f0b4de73",
  "settings": {
    "isOcrEnabled": true,
    "itemMajorVersionLimit": 50,
    "isItemVersioningEnabled": true,
    "itemDefaultSensitivityLabelId": "3d8789ae-7375-4ded-8eeb-d6bc226e42fb"
  }
}
```

# [C#](#tab/csharp)
> *(Permissions/details table is in the source page — see source_of_truth.)*
> *(Permissions/details table is in the source page — see source_of_truth.)*

# [Go](#tab/go)
> *(Permissions/details table is in the source page — see source_of_truth.)*
> *(Permissions/details table is in the source page — see source_of_truth.)*

# [Java](#tab/java)
> *(Permissions/details table is in the source page — see source_of_truth.)*
> *(Permissions/details table is in the source page — see source_of_truth.)*

# [JavaScript](#tab/javascript)
> *(Permissions/details table is in the source page — see source_of_truth.)*
> *(Permissions/details table is in the source page — see source_of_truth.)*

# [PHP](#tab/php)
> *(Permissions/details table is in the source page — see source_of_truth.)*
> *(Permissions/details table is in the source page — see source_of_truth.)*

# [Python](#tab/python)
> *(Permissions/details table is in the source page — see source_of_truth.)*
> *(Permissions/details table is in the source page — see source_of_truth.)*

---

### Response
The following example shows the response.
>**Note:** The response object shown here might be shortened for readability.
  "blockType": "response",
  "truncated": true,
  "@odata.type": "microsoft.graph.fileStorageContainer"
}
```http
HTTP/1.1 201 Created
Content-type: application/json

{
  "@odata.type": "#microsoft.graph.fileStorageContainer",
  "id": "b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z",
  "displayName": "My Application Storage Container",
  "description": "Description of My Application Storage Container",
  "containerTypeId": "91710488-5756-407f-9046-fbe5f0b4de73",
  "status": "inactive",
  "createdDateTime": "2021-11-24T15:41:52.347Z",
  "settings": {
    "isOcrEnabled": true,
    "itemMajorVersionLimit": 50,
    "isItemVersioningEnabled": true,
    "itemDefaultSensitivityLabelId": "3d8789ae-7375-4ded-8eeb-d6bc226e42fb"
  }
}
```

---
*Agent-first reformat of the Microsoft Graph API reference (beta). Source of truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-post?view=graph-rest-beta*
