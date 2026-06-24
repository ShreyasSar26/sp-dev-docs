---
title: Add custom properties to a fileStorageContainer
slug: graph-api/filestoragecontainer-post-customproperty
persona: developer
scenario_ids: [D4]
source_of_truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-post-customproperty?view=graph-rest-beta
api_surface: Microsoft Graph (beta)
last_verified: 2026-06-23
agent_ready: true
---

# Add custom properties to a fileStorageContainer

> Add custom properties to a fileStorageContainer.

**Agent task:** Perform this Microsoft Graph operation for SharePoint Embedded. Use the exact HTTP method, URL, required permissions, request body, and response shown below; prefer least-privilege permissions and handle throttling (429/Retry-After).

Namespace: microsoft.graph

> *(Permissions/details table is in the source page — see source_of_truth.)*


Add custom properties to a [fileStorageContainer](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainer?view=graph-rest-beta) object. 

## Permissions
Choose the permission or permissions marked as least privileged for this API. Use a higher privileged permission or permissions [only if your app requires it](https://learn.microsoft.com/graph/permissions-overview#best-practices-for-using-microsoft-graph-permissions). For details about delegated and application permissions, see [Permission types](https://learn.microsoft.com/graph/permissions-overview#permission-types). To learn more about these permissions, see the [permissions reference](https://learn.microsoft.com/graph/permissions-reference).

> *(Permissions/details table is in the source page — see source_of_truth.)*

> *(Permissions/details table is in the source page — see source_of_truth.)*

## HTTP request

  "blockType": "ignored"
}
```http
PATCH /storage/fileStorage/containers/{containerId}/customProperties
```

## Request headers
|Name|Description|
|:---|:---|
|Authorization|Bearer {token}. Required. Learn more about [authentication and authorization](https://learn.microsoft.com/graph/auth/auth-concepts).|
|Content-Type|application/json. Required.|

## Request body
In the request body, supply a JSON representation of a [fileStorageContainerCustomPropertyDictionary](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainercustompropertydictionary?view=graph-rest-beta), which is a map with string keys and [fileStorageContainerCustomPropertyValue](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainercustompropertyvalue?view=graph-rest-beta) values.

You can specify the following properties when you create a custom property.

|Property|Type|Description|
|:---|:---|:---|
|value|String|The value of the custom property. Required.|
|isSearchable|Boolean|A flag to indicate whether the property is searchable. Optional. The default value is `false`.|

## Response

If successful, this method returns a `201 Created` response code.

## Examples

### Example 1: Create a custom property

#### Request
The following example shows how to create a custom property called `clientUniqueId` for a container.
# [HTTP](#tab/http)
  "blockType": "request",
  "name": "post_filestoragecontainer_customproperty_1"
}
```http
PATCH https://graph.microsoft.com/beta/storage/fileStorage/containers/b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z/customProperties
Content-Type: application/json

{
  "clientUniqueId": {
    "value": "c5d88310-1fc7-49be-80ca-e7d7a11e638b"
  }
}
```

# [JavaScript](#tab/javascript)
> *(Permissions/details table is in the source page — see source_of_truth.)*
> *(Permissions/details table is in the source page — see source_of_truth.)*

---

#### Response
The following example shows the response. By default, the property isn't searchable.
  "blockType": "response",
  "truncated": true
}
```http
HTTP/1.1 201 Created
```
### Example 2: Create a custom searchable property

#### Request
The following example shows how to create a searchable custom property called `clientUniqueId` for a container.
# [HTTP](#tab/http)
  "blockType": "request",
  "name": "post_filestoragecontainer_customproperty_2"
}
```http
PATCH https://graph.microsoft.com/beta/storage/fileStorage/containers/b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z/customProperties
Content-Type: application/json

{
  "clientUniqueId": {
    "value": "c5d88310-1fc7-49be-80ca-e7d7a11e638b",
    "isSearchable": true
  }
}
```

# [JavaScript](#tab/javascript)
> *(Permissions/details table is in the source page — see source_of_truth.)*
> *(Permissions/details table is in the source page — see source_of_truth.)*

---

#### Response
The following example shows the response.
  "blockType": "response",
  "truncated": true
}
```http
HTTP/1.1 201 Created
```

---
*Agent-first reformat of the Microsoft Graph API reference (beta). Source of truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-post-customproperty?view=graph-rest-beta*
