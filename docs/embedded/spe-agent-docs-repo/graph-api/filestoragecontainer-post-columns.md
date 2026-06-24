---
title: Create column
slug: graph-api/filestoragecontainer-post-columns
persona: developer
scenario_ids: [D4]
source_of_truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-post-columns?view=graph-rest-beta
api_surface: Microsoft Graph (beta)
last_verified: 2026-06-23
agent_ready: true
---

# Create column

> Create a column for a fileStorageContainer that specifies a columnDefinition.

**Agent task:** Perform this Microsoft Graph operation for SharePoint Embedded. Use the exact HTTP method, URL, required permissions, request body, and response shown below; prefer least-privilege permissions and handle throttling (429/Retry-After).

Namespace: microsoft.graph

> *(Permissions/details table is in the source page — see source_of_truth.)*

Create a column for a [fileStorageContainer](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainer?view=graph-rest-beta) that specifies a [columnDefinition](https://learn.microsoft.com/en-us/graph/api/resources/columndefinition?view=graph-rest-beta). 

> *(Permissions/details table is in the source page — see source_of_truth.)*

## Permissions

Choose the permission or permissions marked as least privileged for this API. Use a higher privileged permission or permissions [only if your app requires it](https://learn.microsoft.com/graph/permissions-overview#best-practices-for-using-microsoft-graph-permissions). For details about delegated and application permissions, see [Permission types](https://learn.microsoft.com/graph/permissions-overview#permission-types). To learn more about these permissions, see the [permissions reference](https://learn.microsoft.com/graph/permissions-reference).

> *(Permissions/details table is in the source page — see source_of_truth.)*

> *(Permissions/details table is in the source page — see source_of_truth.)*

## HTTP request

  "blockType": "ignored"
}
```http
POST /storage/fileStorage/containers/{containerId}/columns
```

## Request headers

|Name|Description|
|:---|:---|
|Authorization|Bearer {token}. Required. Learn more about [authentication and authorization](https://learn.microsoft.com/graph/auth/auth-concepts).|
|Content-Type|application/json. Required.|

## Request body

In the request body, supply a JSON representation of the [columnDefinition](https://learn.microsoft.com/en-us/graph/api/resources/columndefinition?view=graph-rest-beta) object.

Only the following type-related properties are supported and they're mutually exclusive; a column can only have one of them specified at a time.

|Property|Type|Description|
|:---|:---|:---|
|Boolean|[booleanColumn](https://learn.microsoft.com/en-us/graph/api/resources/booleancolumn?view=graph-rest-beta)|This column stores Boolean values.|
|choice|[choiceColumn](https://learn.microsoft.com/en-us/graph/api/resources/choicecolumn?view=graph-rest-beta)|This column stores data from a list of choices.|
|currency|[currencyColumn](https://learn.microsoft.com/en-us/graph/api/resources/currencycolumn?view=graph-rest-beta)|This column stores currency values.|
|dateTime|[dateTimeColumn](https://learn.microsoft.com/en-us/graph/api/resources/datetimecolumn?view=graph-rest-beta)|This column stores DateTime values.|
|hyperlinkOrPicture|[hyperlinkOrPictureColumn](https://learn.microsoft.com/en-us/graph/api/resources/hyperlinkorpicturecolumn?view=graph-rest-beta)|This column stores hyperlink or picture values.|
|number|[numberColumn](https://learn.microsoft.com/en-us/graph/api/resources/numbercolumn?view=graph-rest-beta)|This column stores number values.|
|personOrGroup|[personOrGroupColumn](https://learn.microsoft.com/en-us/graph/api/resources/personorgroupcolumn?view=graph-rest-beta)|This column stores Person or Group values.|
|text|[textColumn](https://learn.microsoft.com/en-us/graph/api/resources/textcolumn?view=graph-rest-beta)|This column stores text values.|

## Response

If successful, this method returns a `201 Created` response code and a [columnDefinition](https://learn.microsoft.com/en-us/graph/api/resources/columndefinition?view=graph-rest-beta) object in the response body.

## Examples

### Request

The following example shows a request.

# [HTTP](#tab/http)
  "blockType": "request",
  "name": "create_columndefinition_for_fileStorageContainer"
}

```http
POST https://graph.microsoft.com/beta/storage/fileStorage/containers/b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z/columns
Content-Type: application/json

{
  "description": "test",
  "enforceUniqueValues": false,
  "hidden": false,
  "indexed": false,
  "name": "Title",
  "text": {
    "allowMultipleLines": false,
    "appendChangesToExistingText": false,
    "linesForEditing": 0,
    "maxLength": 255
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
  "@odata.type": "microsoft.graph.columnDefinition"
}

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "description": "test",
  "displayName": "Title",
  "enforceUniqueValues": false,
  "hidden": false,
  "id": "99ddcf45-e2f7-4f17-82b0-6fba34445103",
  "indexed": false,
  "name": "Title",
  "text": {
    "allowMultipleLines": false,
    "appendChangesToExistingText": false,
    "linesForEditing": 0,
    "maxLength": 255
  }
}
```

---
*Agent-first reformat of the Microsoft Graph API reference (beta). Source of truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-post-columns?view=graph-rest-beta*
