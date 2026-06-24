---
title: Get drive for fileStorageContainer
slug: graph-api/filestoragecontainer-get-drive
persona: developer
scenario_ids: [D3]
source_of_truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-get-drive?view=graph-rest-beta
api_surface: Microsoft Graph (beta)
last_verified: 2026-06-23
agent_ready: true
---

# Get drive for fileStorageContainer

> Get the properties of a drive associated with a fileStorageContainer.

**Agent task:** Perform this Microsoft Graph operation for SharePoint Embedded. Use the exact HTTP method, URL, required permissions, request body, and response shown below; prefer least-privilege permissions and handle throttling (429/Retry-After).

Namespace: microsoft.graph

> *(Permissions/details table is in the source page — see source_of_truth.)*

Get the properties of a [drive](https://learn.microsoft.com/en-us/graph/api/resources/drive?view=graph-rest-beta) associated with a [fileStorageContainer](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainer?view=graph-rest-beta).

> *(Permissions/details table is in the source page — see source_of_truth.)*

## Permissions

Choose the permission or permissions marked as least privileged for this API. Use a higher privileged permission or permissions [only if your app requires it](https://learn.microsoft.com/graph/permissions-overview#best-practices-for-using-microsoft-graph-permissions). For details about delegated and application permissions, see [Permission types](https://learn.microsoft.com/graph/permissions-overview#permission-types). To learn more about these permissions, see the [permissions reference](https://learn.microsoft.com/graph/permissions-reference).


> *(Permissions/details table is in the source page — see source_of_truth.)*

> *(Permissions/details table is in the source page — see source_of_truth.)*

## HTTP request

  "blockType": "ignored"
}
```http
GET /storage/fileStorage/containers/{containerId}/drive
GET /drives/{driveId}
```


## Request headers
|Name|Description|
|:---|:---|
|Authorization|Bearer {token}. Required. Learn more about [authentication and authorization](https://learn.microsoft.com/graph/auth/auth-concepts).|


## Response

If successful, this method returns a `200 OK` response code and a [drive](https://learn.microsoft.com/en-us/graph/api/resources/drive?view=graph-rest-beta) object in the response body.

## Examples

### Request
The following example shows a request.
# [HTTP](#tab/http)
  "blockType": "request",
  "name": "list_drive"
}
```msgraph-interactive
GET https://graph.microsoft.com/beta/storage/fileStorage/containers/{containerId}/drive
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
  "@odata.type": "microsoft.graph.drive"
}
```http
HTTP/1.1 200 OK
Content-type: application/json

{
  "createdDateTime": "2022-04-25T20:11:51Z",
  "description": "My Application Storage Container",
  "driveType": "other",
  "id": "b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z",
  "lastModifiedDateTime": "2022-04-25T20:11:51Z",
  "name": "My Container",
  "createdBy": {
    "user": {
    "displayName": "System Account"
    }
  },
  "lastModifiedBy": {
    "user": {
    "displayName": "System Account"
    }
  },
  "owner": {
    "user": {
    "displayName": "System Account"
    }
  },
  "quota": {
    "deleted": 0,
    "fileCount": 0,
    "remaining": 0,
    "state": "normal",
    "total": 0,
    "used": 0
  }
}
```

---
*Agent-first reformat of the Microsoft Graph API reference (beta). Source of truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-get-drive?view=graph-rest-beta*
