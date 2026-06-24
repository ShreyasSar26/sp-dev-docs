---
title: List fileStorageContainer custom properties
slug: graph-api/filestoragecontainer-list-customproperty
persona: developer
scenario_ids: [D4]
source_of_truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-list-customproperty?view=graph-rest-beta
api_surface: Microsoft Graph (beta)
last_verified: 2026-06-23
agent_ready: true
---

# List fileStorageContainer custom properties

> List the custom properties of a fileStorageContainer.

**Agent task:** Perform this Microsoft Graph operation for SharePoint Embedded. Use the exact HTTP method, URL, required permissions, request body, and response shown below; prefer least-privilege permissions and handle throttling (429/Retry-After).

Namespace: microsoft.graph

> *(Permissions/details table is in the source page — see source_of_truth.)*

List the custom properties of a [fileStorageContainer](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainer?view=graph-rest-beta) object. The caller can retrieve all custom properties or get a specific property by name.

## Permissions
Choose the permission or permissions marked as least privileged for this API. Use a higher privileged permission or permissions [only if your app requires it](https://learn.microsoft.com/graph/permissions-overview#best-practices-for-using-microsoft-graph-permissions). For details about delegated and application permissions, see [Permission types](https://learn.microsoft.com/graph/permissions-overview#permission-types). To learn more about these permissions, see the [permissions reference](https://learn.microsoft.com/graph/permissions-reference).

> *(Permissions/details table is in the source page — see source_of_truth.)*

> *(Permissions/details table is in the source page — see source_of_truth.)*

## HTTP request

  "blockType": "ignored"
}
```http
GET /storage/fileStorage/containers/{containerId}/customProperties
GET /storage/fileStorage/containers/{containerId}/customProperties/{propertyName}
```

## Request headers
|Name|Description|
|:---|:---|
|Authorization|Bearer {token}. Required. Learn more about [authentication and authorization](https://learn.microsoft.com/graph/auth/auth-concepts).|

## Response

If successful, this method returns a `200 OK` response code.

## Examples

### Example 1

#### Request
The following example shows how to get a custom property named `clientUniquieId`.

# [HTTP](#tab/http)
  "blockType": "request",
  "name": "list_filestoragecontainer_customproperty_1"
}
```msgraph-interactive
GET https://graph.microsoft.com/beta/storage/fileStorage/containers/b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z/customProperties/clientUniqueId
```

# [JavaScript](#tab/javascript)
> *(Permissions/details table is in the source page — see source_of_truth.)*
> *(Permissions/details table is in the source page — see source_of_truth.)*

---

---

#### Response
The following example shows the response.
  "blockType": "response",
  "truncated": true,
  "@odata.type": "Collection(microsoft.graph.fileStorageContainerCustomPropertyValue)"
}
```http
HTTP/1.1 200 Ok
Content-type: application/json

{
  "value": "c5d88310-1fc7-49be-80ca-e7d7a11e638b",
  "isSearchable": true
}

```
### Example 2
#### Request
The following example shows how to get all the custom properties of a **fileStorageContainer**.
# [HTTP](#tab/http)
  "blockType": "request",
  "name": "list_filestoragecontainer_customproperty_2"
}
```msgraph-interactive
GET https://graph.microsoft.com/beta/storage/fileStorage/containers/b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z/customProperties
```

# [JavaScript](#tab/javascript)
> *(Permissions/details table is in the source page — see source_of_truth.)*
> *(Permissions/details table is in the source page — see source_of_truth.)*

---

---

### Response
The following example shows the response.
  "blockType": "response",
  "truncated": true,
  "@odata.type": "microsoft.graph.fileStorageContainerCustomPropertyDictionary"
}
```http
HTTP/1.1 200 Ok
Content-type: application/json

{
  "clientUniqueId": {
    "value": "c5d88310-1fc7-49be-80ca-e7d7a11e638b",
    "isSearchable": true
  },
  "color": {
    "value": "purple"
  }
}
```

---
*Agent-first reformat of the Microsoft Graph API reference (beta). Source of truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-list-customproperty?view=graph-rest-beta*
