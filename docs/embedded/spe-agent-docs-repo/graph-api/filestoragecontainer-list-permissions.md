---
title: List fileStorageContainer permissions
slug: graph-api/filestoragecontainer-list-permissions
persona: developer
scenario_ids: [D7]
source_of_truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-list-permissions?view=graph-rest-beta
api_surface: Microsoft Graph (beta)
last_verified: 2026-06-23
agent_ready: true
---

# List fileStorageContainer permissions

> Get the set of permissions for a fileStorageContainer.

**Agent task:** Perform this Microsoft Graph operation for SharePoint Embedded. Use the exact HTTP method, URL, required permissions, request body, and response shown below; prefer least-privilege permissions and handle throttling (429/Retry-After).

Namespace: microsoft.graph

> *(Permissions/details table is in the source page — see source_of_truth.)*

Get a list of the [permission](https://learn.microsoft.com/en-us/graph/api/resources/permission?view=graph-rest-beta) objects associated with a [fileStorageContainer](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainer?view=graph-rest-beta).

> *(Permissions/details table is in the source page — see source_of_truth.)*

## Permissions

Choose the permission or permissions marked as least privileged for this API. Use a higher privileged permission or permissions [only if your app requires it](https://learn.microsoft.com/graph/permissions-overview#best-practices-for-using-microsoft-graph-permissions). For details about delegated and application permissions, see [Permission types](https://learn.microsoft.com/graph/permissions-overview#permission-types). To learn more about these permissions, see the [permissions reference](https://learn.microsoft.com/graph/permissions-reference).

> *(Permissions/details table is in the source page — see source_of_truth.)*

> *(Permissions/details table is in the source page — see source_of_truth.)*

## HTTP request

  "blockType": "ignored"
}
```http
GET /storage/fileStorage/containers/{containerId}/permissions
```

## Optional query parameters
This method supports the `$skip`, `$top`, `$orderBy`, and `$filter` OData query parameters to help customize the response. For general information, see [OData query parameters](https://learn.microsoft.com/graph/query-parameters).

By default, this API lists only container-scoped permissions. You can use the `includeAllContainerUsers=true` query parameter to include entries for identities that may have at least one item-level permission in the container but don't have container-scoped permission.

## Request headers
|Name|Description|
|:---|:---|
|Authorization|Bearer {token}. Required. Learn more about [authentication and authorization](https://learn.microsoft.com/graph/auth/auth-concepts).|

## Response

If successful, this method returns a `200 OK` response code and a collection of [permission](https://learn.microsoft.com/en-us/graph/api/resources/permission?view=graph-rest-beta) objects in the response body.

## Examples

### Request
The following example shows a request.
# [HTTP](#tab/http)
  "blockType": "request",
  "name": "list_permission"
}
```msgraph-interactive
GET https://graph.microsoft.com/beta/storage/fileStorage/containers/b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z/permissions
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
  "@odata.type": "Collection(microsoft.graph.permission)"
}
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "@odata.context": "https://graph.microsoft.com/beta/$metadata#Collection(microsoft.graph.permission)",
  "value": [
    {
        "@odata.type": "#microsoft.graph.permission",
        "id": "cmVhZGVyX2k6MCMuZnxtZW1iZXJzaGlwfHJvcnlicjExMUBvdXRsb29rLmNvbQ",
        "roles": ["principalOwner"],
        "grantedToV2": {
          "user": {
            "id": "71392b2f-1765-406e-86af-5907d9bdb2ab",
            "userPrincipalName": "jhan@contoso.com",
            "displayName": "Jacob Hancock",
            "email": "jhan@contoso.com"
          }
        }
    },
    {
        "@odata.type": "#microsoft.graph.permission",
        "id": "cHJpbmNpcGFsT3duZXJfaTowIy5mfG1lbWJlcnNoaXB8ZGxpZGRlbGwyMDIyQG91dGxvb2suY29t",
        "roles": ["reader"],
        "grantedToV2": {
          "user": {
            "id": "86503198-b81b-43fe-81ee-ad45b8848ac9",
            "userPrincipalName": "mnick@contoso.com",
            "displayName": "Mark Nickhols",
            "email": "mnick@contoso.com"
          }
        }
    },
    {
        "@odata.type": "#microsoft.graph.permission",
        "id": "iZXJzaGlwfHJvcnlicjExMUBvdXRsb29rLmNvbQcJpbmNpcGFsT3duZAJfaLowIy5mfG1lbWJl",
        "roles": ["writer"],
        "grantedToV2": {
          "user": {
            "id": "0000000-b82c-23ee-51ef-ab47c8177bl0",
            "userPrincipalName": "hjac@contoso.com",
            "displayName": "Howard Jacobs",
            "email": "hjac@contoso.com"
          }
        }
    }
  ]
}
```

---
*Agent-first reformat of the Microsoft Graph API reference (beta). Source of truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-list-permissions?view=graph-rest-beta*
