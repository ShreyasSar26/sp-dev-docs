---
title: Delete permissions
slug: graph-api/filestoragecontainer-delete-permissions
persona: developer
scenario_ids: [D7]
source_of_truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-delete-permissions?view=graph-rest-beta
api_surface: Microsoft Graph (beta)
last_verified: 2026-06-23
agent_ready: true
---

# Delete permissions

> Delete permissions from a fileStorageContainer object.

**Agent task:** Perform this Microsoft Graph operation for SharePoint Embedded. Use the exact HTTP method, URL, required permissions, request body, and response shown below; prefer least-privilege permissions and handle throttling (429/Retry-After).

Namespace: microsoft.graph

> *(Permissions/details table is in the source page — see source_of_truth.)*

Delete permissions from a [fileStorageContainer](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainer?view=graph-rest-beta) object.

By default, this API removes access for an identity to the container and all items within the container, regardless of whether the identity has container-scoped or item-level permissions. You can add an optional `Prefer: onlyRemoveContainerScopedPermission` header when you call the API if only the identity's container-scoped permissions need to be removed. All item-level permissions explicitly granted to the identity (if any) are retained. 

> *(Permissions/details table is in the source page — see source_of_truth.)*

## Permissions

Choose the permission or permissions marked as least privileged for this API. Use a higher privileged permission or permissions [only if your app requires it](https://learn.microsoft.com/graph/permissions-overview#best-practices-for-using-microsoft-graph-permissions). For details about delegated and application permissions, see [Permission types](https://learn.microsoft.com/graph/permissions-overview#permission-types). To learn more about these permissions, see the [permissions reference](https://learn.microsoft.com/graph/permissions-reference).


> *(Permissions/details table is in the source page — see source_of_truth.)*

> *(Permissions/details table is in the source page — see source_of_truth.)*

## HTTP request

  "blockType": "ignored"
}
```http
DELETE /storage/fileStorage/containers/{containerId}/permissions/{permissionId}
DELETE /storage/fileStorage/containers/{containerId}/permissions(email='{email}')
DELETE /storage/fileStorage/containers/{containerId}/permissions(userPrincipalName='{userPrincipalName}')
```

Use the `{email}` or `{userPrincipalName}` alternate key only for permissions granted to a user. Use `{permissionId}` for other permission types. Alternate key values are strings and must be URL-encoded if they contain characters that aren't valid in a URL.

## Request headers
|Name|Description|
|:---|:---|
|Authorization|Bearer {token}. Required. Learn more about [authentication and authorization](https://learn.microsoft.com/graph/auth/auth-concepts).|


## Response

If successful, this method returns a `204 No Content` response code.

## Examples

### Example 1: Delete a permission by ID

The following example shows how to delete a permission by ID.

#### Request

The following example shows a request.

# [HTTP](#tab/http)
  "blockType": "request",
  "name": "delete_filestoragecontainer_permissions_by_id"
}
```http
DELETE https://graph.microsoft.com/beta/storage/fileStorage/containers/b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z/permissions/cmVhZGVyX2k6MCMuZnxtZW1iZXJzaGlwfGpobmFAY29udG9zby5jb20
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

  "blockType": "response",
  "truncated": true
}
```http
HTTP/1.1 204 No Content
```

### Example 2: Delete a permission by userPrincipalName

The following example shows how to use the **userPrincipalName** alternate key to delete a permission.

#### Request

The following example shows a request.

  "blockType": "request",
  "name": "delete_filestoragecontainer_permissions_by_userprincipalname"
}
```http
DELETE https://graph.microsoft.com/beta/storage/fileStorage/containers/b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z/permissions(userPrincipalName='jhan@contoso.com')
```

#### Response
The following example shows the response.
  "blockType": "response",
  "truncated": true
}
```http
HTTP/1.1 204 No Content
```

---
*Agent-first reformat of the Microsoft Graph API reference (beta). Source of truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-delete-permissions?view=graph-rest-beta*
