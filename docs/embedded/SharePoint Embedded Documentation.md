# SharePoint Embedded Documentation

SharePoint Embedded is a cloud-based, API-only file and document management platform built on Microsoft 365 infrastructure. It lets developers embed Office collaboration, Purview compliance, and Copilot capabilities directly into their own applications — while keeping documents securely within each customer's Microsoft 365 tenant.

> **5-minute quickstart:** [Get started with the VS Code Extension](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/getting-started/spembedded-for-vscode)

---

## I'm new to SharePoint Embedded

| | |
|---|---|
| **Understand the platform** | Read the [Overview](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview) to learn what SharePoint Embedded is and how it fits into Microsoft 365. |
| **Explore use cases** | See [Scenarios and Use Cases](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/scenarios-and-use-cases) to understand what you can build. |
| **See what's new** | Check [What's New](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/whats-new) for the latest feature releases and updates. |
| **Take a learning path** | Follow the guided modules: [Overview & Configuration](https://learn.microsoft.com/en-us/training/modules/sharepoint-embedded-setup) · [Building Applications](https://learn.microsoft.com/en-us/training/modules/sharepoint-embedded-create-app) |

---

## I'm building an application (Developer)

### Set up your environment

| | |
|---|---|
| **VS Code Extension** | [SharePoint Embedded VS Code Extension](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/getting-started/spembedded-for-vscode) — create and manage container types directly from VS Code. |
| **Container Types** | [Container Types](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/getting-started/containertypes) — understand the foundational storage unit of SharePoint Embedded. |
| **Register via API** | [Register Container Type API](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/getting-started/register-api-documentation) — register your container type programmatically. |

### Design and develop

| | |
|---|---|
| **Architecture** | [Application Architecture](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/app-architecture) — understand the overall system design, components, and integration patterns. |
| **Authentication** | [Authentication and Authorization](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/auth) — configure delegated and app-only permissions via Microsoft Entra ID and Graph API. |
| **Permissions** | [Sharing and Permissions](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/sharing-and-perm) — manage the additive permissions model for containers, folders, and files. |
| **Scale limits** | [Limits and Calling Patterns](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/limits-calling) — plan for storage, container, and API throttling limits. |
| **Real-time collaboration** | [Fluid Framework](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/fluid) — integrate Fluid Framework for live collaborative experiences. |
| **AI Agent integration** | [SharePoint Embedded Knowledge Source in Microsoft Foundry (Preview)](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/declarative-agent/sharepoint-embedded-knowledge-source) — use SPE containers as a knowledge source for declarative agents. |

### Build content experiences

| | |
|---|---|
| **Office experiences** | [Office Experiences](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/content-experiences/office-experience) — open Word, Excel, and PowerPoint files for viewing and editing; enable co-authoring and AutoSave. |
| **User experiences** | [User Experiences Overview](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/content-experiences/user-experiences-overview) — build file browsing, upload, and management UX within your app. |
| **Search** | [Search Content](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/content-experiences/search-content) — index and search across container content using Microsoft Search. |

### Follow step-by-step tutorials

| Tutorial | What you'll learn |
|---|---|
| [Launch Experience](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/launch-experience) | Control Office client launch modes (view vs. edit) via the Graph `webUrl`. |
| [Using Metadata](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/metadata) | Add and query custom metadata on SharePoint Embedded containers. |
| [File Preview in iFrame](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/using-file-preview) | Embed a file preview (PDF, images, Office files) using the Graph preview endpoint. |
| [Document Processing with Azure AI](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/doc-processing-acs) | Enrich documents with Azure Cognitive Services (OCR, classification, extraction). |
| [Webhooks](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/using-webhooks) | React to container and file change events using webhooks. |
| [Migrate ABS to SPE](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/migrate-abs-to-spe) | Move content from Azure Blob Storage into SharePoint Embedded containers. |
| [Install App in a Customer Tenant](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/vendor-install-app-customer) | Walk through the ISV-to-customer app installation and billing setup flow. |

---

## I'm managing billing and tenants (Developer Admin / ISV)

| | |
|---|---|
| **Understand billing** | [Billing Overview](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/billing/billing) — learn about standard and pass-through billing models. |
| **Manage billing** | [Billing Management](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/billing/billingmanagement) — link Azure subscriptions, configure billing for your app. |
| **Monitor usage** | [Billing Meters](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/billing/meters) — understand storage and API transaction meters that drive costs. |
| **Developer admin role** | [Developer Admin](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/developer-admin/dev-admin) — use the SharePoint Embedded Administrator role in Entra ID to manage container types and billing via PowerShell. |
| **Admin role overview** | [SharePoint Embedded Admin](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/adminrole) — overview of admin roles and responsibilities across partner and consuming tenants. |

---

## I'm a tenant administrator (Consuming Tenant Admin)

| | |
|---|---|
| **Admin overview** | [Consuming Tenant Admin](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/consuming-tenant-admin/cta) — manage SharePoint Embedded apps installed in your Microsoft 365 tenant. |
| **PowerShell management** | [Container Management in PowerShell](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/consuming-tenant-admin/ctapowershell) — list, inspect, and manage containers in your tenant via PowerShell cmdlets. |
| **Admin UX** | [Consuming Tenant Admin UX](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/consuming-tenant-admin/ctaux) — manage containers through the SharePoint admin center UI. |

---

## I'm responsible for compliance and security (Compliance / Security Officer)

| | |
|---|---|
| **Security & Compliance** | [Security and Compliance](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/compliance/security-and-compliance) — apply Microsoft Purview compliance policies (retention, eDiscovery, sensitivity labels) to SharePoint Embedded containers. |

---

## Reference

| | |
|---|---|
| **GitHub source** | [sp-dev-docs/docs/embedded](https://github.com/SharePoint/sp-dev-docs/tree/live/docs/embedded) — file issues or contribute to documentation. |
| **Graph API** | [Microsoft Graph API reference](https://learn.microsoft.com/en-us/graph/api/overview) — all SharePoint Embedded APIs are Graph-based. |
| **What's New** | [Release notes and changelog](https://learn.microsoft.com/en-us/sharepoint/dev/embedded/whats-new) |
