// SharePoint Embedded Funnel - Journey Data
// All document URLs sourced from url list.xlsx

const SPE_JOURNEYS = {
  developer: {
    title: "Developer",
    subtitle: "Build file-storage apps on Microsoft 365 infrastructure",
    color: "#0078d4",
    accentLight: "#deecf9",
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 8l6 8-6 8M14 24h12" stroke="#0078d4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    tools: ["VS Code", "Graph API", "Microsoft Entra ID", "Azure"],
    phases: [
      {
        name: "Foundation",
        color: "#0078d4",
        steps: [
          {
            id: "dev-1",
            title: "SharePoint Embedded Overview",
            description: "Understand what SharePoint Embedded is and how it enables file and document management in custom apps using Microsoft 365 infrastructure. Learn the core concepts: Container Types, Containers, and the ISV ownership model.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview",
            estimatedTime: "15 min",
            tool: null,
            tags: ["Conceptual", "Required"]
          },
          {
            id: "dev-2",
            title: "Scenarios and Use Cases",
            description: "Explore real-world use cases: document management systems, content repositories, ISV file storage solutions, and vertical industry apps. Understand where SPE fits versus SharePoint Sites or OneDrive.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/scenarios-and-use-cases",
            estimatedTime: "10 min",
            tool: null,
            tags: ["Conceptual", "Required"]
          },
          {
            id: "dev-3",
            title: "App Architecture",
            description: "Learn the SPE application architecture: how Container Types define storage boundaries, how Containers map to file stores, and how your app interacts with Microsoft Graph APIs. This is the mental model for everything that follows.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/app-architecture",
            estimatedTime: "20 min",
            tool: null,
            tags: ["Architecture", "Required"]
          }
        ]
      },
      {
        name: "Getting Started",
        color: "#106ebe",
        steps: [
          {
            id: "dev-4",
            title: "Set Up VS Code Extension",
            description: "Install and configure the SharePoint Embedded extension for Visual Studio Code. Use it to create Container Types, manage Containers, and test Graph API calls — all without leaving your editor.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/getting-started/spembedded-for-vscode",
            estimatedTime: "20 min",
            tool: "VS Code",
            tags: ["Setup", "Required"]
          },
          {
            id: "dev-5",
            title: "Create a Container Type",
            description: "Create your first Container Type — the foundational resource that defines storage, permission scope, and billing boundaries for your application. Learn the difference between trial and standard Container Types.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/getting-started/containertypes",
            estimatedTime: "20 min",
            tool: "VS Code",
            tags: ["Setup", "Required"]
          },
          {
            id: "dev-6",
            title: "Register API Permissions",
            description: "Register your application in Microsoft Entra ID and configure the required Microsoft Graph and SharePoint permissions (FileStorageContainer.Selected, Sites.Read.All, etc.) for your Container Type.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/getting-started/register-api-documentation",
            estimatedTime: "25 min",
            tool: "Microsoft Entra ID",
            tags: ["Setup", "Required"]
          }
        ]
      },
      {
        name: "Core Development",
        color: "#004578",
        steps: [
          {
            id: "dev-7",
            title: "Authentication and Authorization",
            description: "Implement OAuth 2.0 flows for your SPE application. Understand delegated vs. application permissions, token acquisition patterns for both your app and end users, and secure access to containers.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/auth",
            estimatedTime: "30 min",
            tool: "Graph API",
            tags: ["Core", "Required"]
          },
          {
            id: "dev-8",
            title: "Sharing and Permissions",
            description: "Configure fine-grained permissions for containers and files. Understand SPE's permission model, role assignments, and how to share content securely within and across organizational boundaries.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/sharing-and-perm",
            estimatedTime: "25 min",
            tool: "Graph API",
            tags: ["Core", "Required"]
          },
          {
            id: "dev-9",
            title: "Content Experiences Overview",
            description: "Explore SPE's built-in content rendering pipeline. Learn how to embed file viewers, document editors, and collaborative experiences in your application without building them from scratch.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/content-experiences/user-experiences-overview",
            estimatedTime: "15 min",
            tool: null,
            tags: ["Content", "Required"]
          },
          {
            id: "dev-10",
            title: "Office Experiences",
            description: "Enable in-app Office document creation and editing via embedded Office Online experiences. Configure co-authoring, real-time collaboration, and Office web app integration in your custom app.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/content-experiences/office-experience",
            estimatedTime: "20 min",
            tool: null,
            tags: ["Content", "Required"]
          }
        ]
      },
      {
        name: "Advanced Features",
        color: "#243a5e",
        steps: [
          {
            id: "dev-11",
            title: "Search Integration",
            description: "Add full-text search across containers and file content using Microsoft Search. Configure search connectors, query APIs, and surface relevant results to your application users.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/content-experiences/search-content",
            estimatedTime: "25 min",
            tool: "Graph API",
            tags: ["Advanced"]
          },
          {
            id: "dev-12",
            title: "File Previews",
            description: "Render previews for 300+ file types without custom viewers using SPE's preview APIs. Implement thumbnail generation, document preview embeds, and file type detection in your app.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/using-file-preview",
            estimatedTime: "20 min",
            tool: null,
            tags: ["Advanced"]
          },
          {
            id: "dev-13",
            title: "Container Metadata",
            description: "Attach and query custom metadata on containers and files. Use metadata to drive business logic, filtering, classification, and integration with external systems.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/metadata",
            estimatedTime: "20 min",
            tool: "Graph API",
            tags: ["Advanced"]
          },
          {
            id: "dev-14",
            title: "Using Webhooks",
            description: "Subscribe to container and file events via webhooks to trigger real-time workflows. Handle event notifications, implement retry logic, and integrate SPE events with Azure Functions or Logic Apps.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/using-webhooks",
            estimatedTime: "25 min",
            tool: "Azure",
            tags: ["Advanced"]
          },
          {
            id: "dev-15",
            title: "Fluid Framework Integration",
            description: "Integrate Microsoft Fluid Framework for real-time, collaborative document experiences — shared canvases, live cursors, presence indicators — within your SPE-powered application.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/fluid",
            estimatedTime: "30 min",
            tool: null,
            tags: ["Advanced", "Optional"]
          },
          {
            id: "dev-16",
            title: "Document Processing with Azure AI",
            description: "Automate document processing using Azure Cognitive Services: OCR, form recognition, classification, and data extraction. Build document intelligence pipelines on top of your SPE storage.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/doc-processing-acs",
            estimatedTime: "35 min",
            tool: "Azure",
            tags: ["Advanced", "Optional"]
          },
          {
            id: "dev-17",
            title: "SPE Declarative Agent (Preview)",
            description: "Build AI-powered document agents using SharePoint Embedded's Declarative Agent capabilities. Enable natural language queries, document summarization, and intelligent automation over your content.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/declarative-agent/spe-da",
            estimatedTime: "30 min",
            tool: "VS Code",
            tags: ["AI", "Preview"]
          }
        ]
      },
      {
        name: "Deployment",
        color: "#005a9e",
        steps: [
          {
            id: "dev-18",
            title: "Limits and Calling Patterns",
            description: "Understand API throttling thresholds, rate limits, retry-after semantics, and best practices for calling SPE APIs at scale. Design your app to handle high concurrency and large file volumes.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/limits-calling",
            estimatedTime: "15 min",
            tool: null,
            tags: ["Production"]
          },
          {
            id: "dev-19",
            title: "Configure Default Launch Experience",
            description: "Configure which Office application opens by default for different file types in your SPE application. Customize the launch behavior to match your app's user experience and branding.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/launch-experience",
            estimatedTime: "15 min",
            tool: null,
            tags: ["Production"]
          },
          {
            id: "dev-20",
            title: "Install Your App for Customers",
            description: "Package and deploy your SPE application to customer tenants as an ISV. Learn the multi-tenant app installation flow, consent, and Container Type provisioning in customer environments.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/development/tutorials/vendor-install-app-customer",
            estimatedTime: "25 min",
            tool: null,
            tags: ["Production"]
          }
        ]
      }
    ]
  },

  admin: {
    title: "IT Administrator",
    subtitle: "Govern, manage, and secure SPE deployments in your tenant",
    color: "#107c10",
    accentLight: "#dff6dd",
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="6" width="24" height="20" rx="2" stroke="#107c10" stroke-width="2.5"/><path d="M4 12h24M10 18h2M10 22h2M16 18h6M16 22h6" stroke="#107c10" stroke-width="2" stroke-linecap="round"/></svg>`,
    tools: ["SharePoint Admin Center", "PowerShell", "Microsoft 365 Admin Center", "Azure Portal"],
    phases: [
      {
        name: "Understand SPE Administration",
        color: "#107c10",
        steps: [
          {
            id: "adm-1",
            title: "SharePoint Embedded Overview",
            description: "Get an administrative view of SharePoint Embedded: what it is, how ISV applications use your tenant's Microsoft 365 infrastructure, and what your responsibilities are as a tenant administrator.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview",
            estimatedTime: "15 min",
            tool: null,
            tags: ["Conceptual", "Required"]
          },
          {
            id: "adm-2",
            title: "Scenarios and Use Cases",
            description: "Learn how third-party ISV apps using SPE interact with your tenant, what data they store, and what governance implications to consider before approving application access.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/scenarios-and-use-cases",
            estimatedTime: "10 min",
            tool: null,
            tags: ["Conceptual", "Required"]
          },
          {
            id: "adm-3",
            title: "Administrator Roles Overview",
            description: "Understand the SharePoint Embedded Administrator role, its scope, and how it differs from the Global Admin, SharePoint Admin, and Developer Admin roles. Learn who is responsible for what.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/adminrole",
            estimatedTime: "15 min",
            tool: null,
            tags: ["Roles", "Required"]
          },
          {
            id: "adm-4",
            title: "Developer Admin Role",
            description: "Learn about the Developer Admin role: how developers register and manage Container Types in your tenant, what permissions they have, and how you can audit their actions.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/developer-admin/dev-admin",
            estimatedTime: "15 min",
            tool: null,
            tags: ["Roles", "Required"]
          }
        ]
      },
      {
        name: "Tenant Setup and Management",
        color: "#0e6b0e",
        steps: [
          {
            id: "adm-5",
            title: "Consuming Tenant Admin",
            description: "Understand your responsibilities as the Consuming Tenant Admin: approving SPE applications, managing access controls, setting tenant-wide policies, and monitoring usage across deployed apps.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/consuming-tenant-admin/cta",
            estimatedTime: "25 min",
            tool: "SharePoint Admin Center",
            tags: ["Administration", "Required"]
          },
          {
            id: "adm-6",
            title: "Manage Containers in SharePoint Admin Center",
            description: "Use the SharePoint Admin Center to view, manage, search, and audit containers deployed in your tenant by SPE applications. Control container lifecycle and review usage.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/consuming-tenant-admin/ctaux",
            estimatedTime: "20 min",
            tool: "SharePoint Admin Center",
            tags: ["Administration", "Required"]
          },
          {
            id: "adm-7",
            title: "PowerShell Administration",
            description: "Automate SPE administration using PowerShell: list containers, manage permissions, configure tenant settings, generate reports, and integrate with your existing admin automation pipelines.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/consuming-tenant-admin/ctapowershell",
            estimatedTime: "30 min",
            tool: "PowerShell",
            tags: ["Automation", "Required"]
          }
        ]
      },
      {
        name: "Billing and Cost Management",
        color: "#004b00",
        steps: [
          {
            id: "adm-8",
            title: "PAYG Billing for SPE",
            description: "Understand the Pay-As-You-Go billing model for SharePoint Embedded: how usage is metered, how it maps to Azure billing, and how to link your Azure subscription to enable SPE apps in your tenant.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/billing/billing",
            estimatedTime: "20 min",
            tool: "Azure Portal",
            tags: ["Billing", "Required"]
          },
          {
            id: "adm-9",
            title: "Billing Management",
            description: "Configure billing accounts, link Azure subscriptions, set up cost alerts, assign billing ownership, and monitor SPE costs across your organization's application portfolio.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/billing/billingmanagement",
            estimatedTime: "20 min",
            tool: "Azure Portal",
            tags: ["Billing", "Required"]
          },
          {
            id: "adm-10",
            title: "Billing Meters",
            description: "Detailed breakdown of what SPE meters track: storage consumed, Graph API calls, data egress, and more. Use this to forecast costs and identify billing optimization opportunities.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/billing/meters",
            estimatedTime: "15 min",
            tool: null,
            tags: ["Billing"]
          }
        ]
      },
      {
        name: "Governance and Compliance",
        color: "#003200",
        steps: [
          {
            id: "adm-11",
            title: "Security and Compliance",
            description: "Configure enterprise governance for SPE content: eDiscovery, DLP policies, audit logs, data residency, sensitivity labels, and Microsoft Purview integration to meet your compliance requirements.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/compliance/security-and-compliance",
            estimatedTime: "30 min",
            tool: "Microsoft Purview",
            tags: ["Compliance", "Required"]
          }
        ]
      }
    ]
  },

  "decision-maker": {
    title: "Decision Maker",
    subtitle: "Evaluate SharePoint Embedded for your organization's strategic needs",
    color: "#8764b8",
    accentLight: "#f4f0fa",
    icon: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 4l3.09 6.26L26 11.27l-5 4.87 1.18 6.87L16 20l-6.18 3.14L11 16.14 6 11.27l6.91-1.01L16 4z" stroke="#8764b8" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
    tools: ["Microsoft 365 Admin Center", "Azure Cost Management"],
    phases: [
      {
        name: "Value Proposition",
        color: "#8764b8",
        steps: [
          {
            id: "dm-1",
            title: "SharePoint Embedded Overview",
            description: "Get a concise executive overview of SharePoint Embedded: what it is, how it works, and why it matters. Understand how SPE lets ISV partners and internal developers build file-management apps on Microsoft 365 without maintaining infrastructure.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/overview",
            estimatedTime: "15 min",
            tool: null,
            tags: ["Required"]
          },
          {
            id: "dm-2",
            title: "Scenarios and Use Cases",
            description: "Discover the business use cases and industries where SPE delivers competitive advantage: legal document management, healthcare record systems, manufacturing compliance workflows, and more.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/scenarios-and-use-cases",
            estimatedTime: "10 min",
            tool: null,
            tags: ["Required"]
          },
          {
            id: "dm-3",
            title: "What's New in SharePoint Embedded",
            description: "Review the latest capabilities added to SharePoint Embedded and stay current on the product roadmap. Understand how Microsoft continues to invest in the platform.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/whats-new",
            estimatedTime: "10 min",
            tool: null,
            tags: ["Optional"]
          }
        ]
      },
      {
        name: "Risk and Compliance",
        color: "#744da9",
        steps: [
          {
            id: "dm-4",
            title: "Security and Compliance",
            description: "Understand SPE's enterprise-grade security posture: compliance certifications, data residency controls, eDiscovery, DLP, Microsoft Purview integration, and audit capabilities that protect your organization.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/compliance/security-and-compliance",
            estimatedTime: "20 min",
            tool: null,
            tags: ["Required"]
          },
          {
            id: "dm-5",
            title: "Governance: Administrator Roles",
            description: "Understand how your IT organization controls which ISV applications can access tenant content, what data they can store, and how admin roles provide accountability and control.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/adminrole",
            estimatedTime: "15 min",
            tool: null,
            tags: ["Required"]
          }
        ]
      },
      {
        name: "Cost Model",
        color: "#5c2d91",
        steps: [
          {
            id: "dm-6",
            title: "PAYG Billing Model",
            description: "Understand the Pay-As-You-Go cost model: SPE charges are consumption-based through Azure, with no per-seat licensing fees. Evaluate total cost of ownership versus building and maintaining proprietary file storage.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/billing/billing",
            estimatedTime: "15 min",
            tool: null,
            tags: ["Required"]
          },
          {
            id: "dm-7",
            title: "Billing Meters",
            description: "Review what drives cost: storage consumed, API calls, and data egress. Use this to build a financial model and benchmark SPE against alternative file storage platforms.",
            url: "https://learn.microsoft.com/en-us/sharepoint/dev/embedded/administration/billing/meters",
            estimatedTime: "15 min",
            tool: null,
            tags: ["Required"]
          }
        ]
      },
      {
        name: "Next Steps",
        color: "#3b1d8f",
        steps: [
          {
            id: "dm-8",
            title: "Learning Module: SPE Overview and Configuration",
            description: "A structured Microsoft Learn training module that gives your technical stakeholders a hands-on introduction to SPE architecture, setup, and configuration. Share with your architecture review board.",
            url: "https://learn.microsoft.com/en-us/training/modules/sharepoint-embedded-setup/",
            estimatedTime: "45 min",
            tool: null,
            tags: ["Training"]
          }
        ]
      }
    ]
  }
};

const SPE_PREREQS = [
  { icon: "M365", label: "Microsoft 365 Subscription", detail: "E3, E5, or Business Premium (for tenant-level features)" },
  { icon: "Azure", label: "Azure Subscription", detail: "Required for PAYG billing and Cognitive Services" },
  { icon: "Entra", label: "Microsoft Entra ID", detail: "App registration with appropriate admin consent" },
  { icon: "Admin", label: "SharePoint Admin or Global Admin", detail: "To enable SPE and manage Container Types" }
];

// Flatten all steps for a persona into an ordered list
function getAllSteps(persona) {
  const journey = SPE_JOURNEYS[persona];
  if (!journey) return [];
  return journey.phases.flatMap(phase =>
    phase.steps.map(step => ({ ...step, phaseName: phase.name, phaseColor: phase.color }))
  );
}
