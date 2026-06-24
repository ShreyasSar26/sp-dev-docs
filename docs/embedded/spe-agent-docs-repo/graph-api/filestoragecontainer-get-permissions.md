---
title: Get fileStorageContainer permission
slug: graph-api/filestoragecontainer-get-permissions
persona: developer
scenario_ids: [D7]
source_of_truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-get-permissions?view=graph-rest-beta
api_surface: Microsoft Graph (beta)
last_verified: 2026-06-23
agent_ready: true
---

# Get fileStorageContainer permission

> Get a specific permission from a fileStorageContainer object.

**Agent task:** Perform this Microsoft Graph operation for SharePoint Embedded. Use the exact HTTP method, URL, required permissions, request body, and response shown below; prefer least-privilege permissions and handle throttling (429/Retry-After).

Namespace: microsoft.graph

> *(Permissions/details table is in the source page — see source_of_truth.)*

Get a specific [permission](https://learn.microsoft.com/en-us/graph/api/resources/permission?view=graph-rest-beta) from a [fileStorageContainer](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainer?view=graph-rest-beta) object.

> *(Permissions/details table is in the source page — see source_of_truth.)*

## Permissions

Choose the permission or permissions marked as least privileged for this API. Use a higher privileged permission or permissions [only if your app requires it](https://learn.microsoft.com/graph/permissions-overview#best-practices-for-using-microsoft-graph-permissions). For details about delegated and application permissions, see [Permission types](https://learn.microsoft.com/graph/permissions-overview#permission-types). To learn more about these permissions, see the [permissions reference](https://learn.microsoft.com/graph/permissions-reference).

> *(Permissions/details table is in the source page — see source_of_truth.)*

> *(Permissions/details table is in the source page — see source_of_truth.)*

## HTTP request

  "blockType": "ignored"
}
```http
GET /storage/fileStorage/containers/{containerId}/permissions/{permissionId}
GET /storage/fileStorage/containers/{containerId}/permissions(email='{email}')
GET /storage/fileStorage/containers/{containerId}/permissions(userPrincipalName='{userPrincipalName}')
```

Use the `{email}` or `{userPrincipalName}` alternate key only for permissions granted to a user. Use `{permissionId}` for other permission types. Alternate key values are strings and must be URL-encoded if they contain characters that aren't valid in a URL.

## Optional query parameters

This method supports the `$select` OData query parameter to help customize the response. For general information, see [OData query parameters](https://learn.microsoft.com/graph/query-parameters).

## Request headers

|Name|Description|
|:---|:---|
|Authorization|Bearer {token}. Required. Learn more about [authentication and authorization](https://learn.microsoft.com/graph/auth/auth-concepts).|

## Request body

Don't supply a request body for this method.

## Response

If successful, this method returns a `200 OK` response code and a [permission](https://learn.microsoft.com/en-us/graph/api/resources/permission?view=graph-rest-beta) object in the response body.

## Examples

### Example 1: Get a permission by ID

The following example shows how to get a permission by ID.

#### Request

The following example shows a request.

# [HTTP](#tab/http)
  "blockType": "request",
  "name": "get_filestoragecontainer_permission"
}
```msgraph-interactive
GET https://graph.microsoft.com/beta/storage/fileStorage/containers/b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z/permissions/cmVhZGVyX2k6MCMuZnxtZW1iZXJzaGlwfGFkZWxldkBjb250b3NvLmNvbQ
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

#### Response

The following example shows the response.

>**Note:** The response object shown here might be shortened for readability.

  "blockType": "response",
  "truncated": true,
  "@odata.type": "microsoft.graph.permission"
}
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "@odata.type": "#microsoft.graph.permission",
  "id": "cmVhZGVyX2k6MCMuZnxtZW1iZXJzaGlwfGFkZWxldkBjb250b3NvLmNvbQ",
  "roles": [
    "reader"
  ],
  "grantedToV2": {
    "user": {
      "id": "71392b2f-1765-406e-86af-5907d9bdb2ab",
      "displayName": "Adele Vance",
      "userPrincipalName": "adelev@contoso.com",
      "email": "adelev@contoso.com"
    }
  }
}
```

### Example 2: Get a permission by userPrincipalName

The following example shows how to use the **userPrincipalName** alternate key to get a permission.

#### Request

The following example shows a request.

  "blockType": "request",
  "name": "get_filestoragecontainer_permission_by_userprincipalname"
}
```http
GET https://graph.microsoft.com/beta/storage/fileStorage/containers/b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z/permissions(userPrincipalName='adelev@contoso.com')
```

#### Response

The following example shows the response.

>**Note:** The response object shown here might be shortened for readability.

  "blockType": "response",
  "truncated": true,
  "@odata.type": "microsoft.graph.permission"
}
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "@odata.type": "#microsoft.graph.permission",
  "id": "cmVhZGVyX2k6MCMuZnxtZW1iZXJzaGlwfGFkZWxldkBjb250b3NvLmNvbQ",
  "roles": [
    "reader"
  ],
  "grantedToV2": {
    "user": {
      "id": "71392b2f-1765-406e-86af-5907d9bdb2ab",
      "displayName": "Adele Vance",
      "userPrincipalName": "adelev@contoso.com",
      "email": "adelev@contoso.com"
    }
  }
}
```

---
*Agent-first reformat of the Microsoft Graph API reference (beta). Source of truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-get-permissions?view=graph-rest-beta*
