---
title: Billing Meters
description: Reference for SharePoint Embedded pay-as-you-go billing meters and pricing resources.
ms.date: 06/25/2026
ms.localizationpriority: high
---

# Billing Meters

**Applies to:** Administrator

<!-- agent:
task_type: reference
audience: administrator
outcome: Identify SharePoint Embedded billing meters and where charges are reviewed.
next: ../admin/monitor-usage-billing-cost.md
-->

SharePoint Embedded uses pay-as-you-go (PAYG) billing through an Azure subscription. Both Standard Billing container types and Pass-through Billing container types use the same meters.

For setup guidance, see [choose a billing model](../plan/choose-billing-model.md). For monitoring, see [monitor usage, billing, and cost](../admin/monitor-usage-billing-cost.md).

## Billing meters

| Meter | Unit | What is metered | Notes |
| --- | --- | --- | --- |
| Storage | $/GB | Files, documents, metadata, versions, recycle bin content, and deleted container collection content. | Storage is based on data stored in SharePoint Embedded. |
| API Transactions | $/Transactions | Each Microsoft Graph call made explicitly by the SharePoint Embedded application. | Internal service calls, such as eDiscovery queries and admin actions in SharePoint Admin Center or SPO PowerShell, aren't charged as application transactions. |
| Egress | $/GB | Data downloaded from SharePoint Embedded to a customer's client device. | Downloads from the SharePoint Embedded application server to Office Desktop clients or Web Application Companion aren't charged as egress. |
| Pay as you go message (private preview) | Message | SharePoint Embedded agent interactions. | SharePoint Embedded agents use the Copilot Studio meter. The source article states each agent interaction uses 12 messages. |

## Storage

Storage consumption includes files and documents plus their metadata and versions. Content in the recycle bin and deleted container collection also contributes to storage consumption.

## Archived storage

The source billing meter article doesn't name a separate archived storage meter. Treat archived, recycled, or deleted-container content as storage unless Microsoft publishes a distinct meter.

## API transactions

Each explicit Microsoft Graph request from the SharePoint Embedded application counts as one transaction. For examples of container APIs, see the [fileStorageContainer resource](/graph/api/resources/filestoragecontainer).

## Egress

Egress is data downloaded from SharePoint Embedded to a customer client device. Some Microsoft-integrated transfers are exempt, including downloads to Office Desktop clients and Web Application Companion.

## Agent message meter

The private preview SharePoint Embedded agent meter uses the Copilot Studio message meter. The billing source states one SharePoint Embedded agent interaction uses 12 messages: two for generative answer and 10 for tenant graph grounding.

## Pricing links

- [SharePoint Embedded product page](https://adoption.microsoft.com/sharepoint/embedded/)
- [Azure Cost Management](https://ms.portal.azure.com/)
- [Monitor usage, billing, and cost](../admin/monitor-usage-billing-cost.md)
