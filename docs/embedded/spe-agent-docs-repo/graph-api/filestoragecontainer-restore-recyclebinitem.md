---
title: Restore recycleBinItem
slug: graph-api/filestoragecontainer-restore-recyclebinitem
persona: developer
scenario_ids: [D5]
source_of_truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-restore-recyclebinitem?view=graph-rest-beta
api_surface: Microsoft Graph (beta)
last_verified: 2026-06-23
agent_ready: true
---

# Restore recycleBinItem

> Restore recycleBinItem to a fileStorageContainer.

**Agent task:** Perform this Microsoft Graph operation for SharePoint Embedded. Use the exact HTTP method, URL, required permissions, request body, and response shown below; prefer least-privilege permissions and handle throttling (429/Retry-After).

Namespace: microsoft.graph

Restore [recycleBinItem](https://learn.microsoft.com/en-us/graph/api/resources/recyclebinitem?view=graph-rest-beta) objects from the [recycleBin](https://learn.microsoft.com/en-us/graph/api/resources/recyclebin?view=graph-rest-beta) of a [fileStorageContainer](https://learn.microsoft.com/en-us/graph/api/resources/filestoragecontainer?view=graph-rest-beta). A [recycleBinItem](https://learn.microsoft.com/en-us/graph/api/resources/recyclebinitem?view=graph-rest-beta) can be restored either by its `id` or using the original [driveItemId](https://learn.microsoft.com/en-us/graph/api/resources/driveitem?view=graph-rest-beta) as an alternate key.

> *(Permissions/details table is in the source page — see source_of_truth.)*

## Permissions

Choose the permission or permissions marked as least privileged for this API. Use a higher privileged permission or permissions [only if your app requires it](https://learn.microsoft.com/graph/permissions-overview#best-practices-for-using-microsoft-graph-permissions). For details about delegated and application permissions, see [Permission types](https://learn.microsoft.com/graph/permissions-overview#permission-types). To learn more about these permissions, see the [permissions reference](https://learn.microsoft.com/graph/permissions-reference).

> *(Permissions/details table is in the source page — see source_of_truth.)*

> *(Permissions/details table is in the source page — see source_of_truth.)*

## HTTP request

  "blockType": "ignored"
}

``` http
POST /storage/fileStorage/containers/{containerId}/recycleBin/items/restore
```

Restore a single [recycleBinItem](https://learn.microsoft.com/en-us/graph/api/resources/recyclebinitem?view=graph-rest-beta) by using the `driveItemId` as an alternate key. If there's no matching recycleBinItem for the driveItemId, the API returns a 404 (Not Found) response.

``` http
POST /storage/fileStorage/containers/{containerId}/recycleBin/items(driveItemId='{driveItemId}')/restore
```

## Request headers

|Name|Description|
|:---|:---|
|Authorization|Bearer {token}. Required. Learn more about [authentication and authorization](https://learn.microsoft.com/graph/auth/auth-concepts).|
|Content-Type|application/json. Required.|

## Request body

If restoring by `recycleBinItemId`, in the request body, supply a JSON representation of the [recycleBinItem](https://learn.microsoft.com/en-us/graph/api/resources/recyclebinitem?view=graph-rest-beta) objects to restore. If you are restoring by driveItemId as an alternate key, a request body is not required.

## Response

If successfully restored by `recycleBinItemId`, this method returns a `207 Multi-Status` response code and the set of restored [recycleBinItem](https://learn.microsoft.com/en-us/graph/api/resources/recyclebinitem?view=graph-rest-beta) objects in the response body.

If successfully restored with `driveItemId` as an alternate key, this method returns a 200 OK response code with the id of the singular [recycleBinItem](https://learn.microsoft.com/en-us/graph/api/resources/recyclebinitem?view=graph-rest-beta) that was restored in the response body.

## Examples

### Example 1: Restore a recycleBinItem 
#### Request

The following example shows a request.

# [HTTP](#tab/http)
  "blockType": "request",
  "name": "restore_filestoragecontainer_recyclebinitem1",
  "@odata.type": "Collection(microsoft.graph.recycleBinItem)"
}

``` http
POST  https://graph.microsoft.com/v1.0/storage/fileStorage/containers/b!ISJs1WRro0y0EWgkUYcktDa0mE8zSlFEqFzqRn70Zwp1CEtDEBZgQICPkRbil_5Z/recycleBin/items/restore
Content-Type: application/json

{
  "ids": ["5d625d33-338c-4a77-a98a-3e287116440c", "73133853-48f2-4956-bc4a-03f8d1675042"]
}
```

# [JavaScript](#tab/javascript)
> *(Permissions/details table is in the source page — see source_of_truth.)*
> *(Permissions/details table is in the source page — see source_of_truth.)*

---

---

#### Response

The following example shows the response.

>**Note:** The response object shown here might be shortened for readability.

  "blockType": "response",
  "truncated": true,
  "@odata.type": "Collection(microsoft.graph.recycleBinItem)"
}

``` http
HTTP/1.1 207 Multi-Status
Content-Type: application/json

{
  "value": [
    {
      "id": "5d625d33-338c-4a77-a98a-3e287116440c"
    },
    {
      "id": "73133853-48f2-4956-bc4a-03f8d1675042"
    }
  ]
}
```

### Example 2: Restore a recycleBinItem by driveItemId as alternate key

In this example, the `driveItemId` is passed as a function parameter in the request URL. The response returns the corresponding id of the `recycleBinItem` that was restored.

#### Request

``` http
POST https://graph.microsoft.com/beta/storage/fileStorage/containers/b!LRJHKCBZQU2fLtv8TzUomsz-OP7yGQRNlugra1iGHqRe5fORWrrHTbh8J8O8qPmx/recycleBin/items(driveItemId='01GC3BS4QFPBCZRLJHJVEYPITEHTDBYHBH')/restore
Content-Type: application/json
```

#### Response

``` http
HTTP/1.1 200 Ok
Content-Type: application/json
{
  "id": "bf7ea563-b848-4ec8-9155-b2054564cfe4"
}
```

### Example 3: Failure to restore recycleBinItem by driveItemId as alternate key

In this example, there is no matching recycleBinItem to correlate with the specified driveItemId. The API returns a 404 (Not Found) response.

#### Request

``` http
POST https://graph.microsoft.com/beta/storage/fileStorage/containers/e!JDJHKCBZTU2fLtv8TzUoksz-OP7yGQRNlugra1iGHqRe5fORWrrHTbh8J8O8qPmx/recycleBin/items(driveItemId='01jC3BS4QFPBCZRLGHJVEYPITEHTDBYHBP')/restore
Content-Type: application/json
```
#### Response

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": {
    "code": "NotFound",
    "message": "The requested resource could not be found."
  }
}
```

---
*Agent-first reformat of the Microsoft Graph API reference (beta). Source of truth: https://learn.microsoft.com/en-us/graph/api/filestoragecontainer-restore-recyclebinitem?view=graph-rest-beta*
