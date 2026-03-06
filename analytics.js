/**
 * SharePoint Embedded Funnel — Multi-Provider Analytics
 *
 * Supported providers (enable any combination):
 *   • Google Analytics 4  (free, real-time reports, no credit card)
 *   • PostHog             (free tier, open-source, best funnel analysis)
 *   • Mixpanel            (free tier, best event explorer)
 *   • Adobe CJA           (enterprise, requires AEP contract)
 *   • localStorage        (always on — powers the local dashboard)
 *
 * To activate a provider:
 *   1. Set enabled: true
 *   2. Paste your real ID/token
 *   3. Uncomment the matching <script> tag in each HTML page
 */

const SPE_ANALYTICS = (function () {

  // ── Provider Configuration ───────────────────────────────────────────────
  // Edit the values below. Set enabled:true for any provider you want active.
  const PROVIDERS = {
    ga4: {
      enabled: false,
      measurementId: "G-XXXXXXXXXX"       // GA4 Measurement ID from Google Analytics
    },
    posthog: {
      enabled: false,
      apiKey:  "phc_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // PostHog project API key
      apiHost: "https://us.i.posthog.com"  // or your self-hosted URL
    },
    mixpanel: {
      enabled: false,
      token: "YOUR_MIXPANEL_TOKEN"         // Mixpanel project token
    },
    adobe: {
      enabled: false,
      datastreamId: "YOUR_ADOBE_DATASTREAM_ID",
      orgId:        "YOUR_IMS_ORG_ID@AdobeOrg"
    }
  };

  // ── Session ID ────────────────────────────────────────────────────────────
  function getSessionId() {
    let sid = sessionStorage.getItem("spe_session_id");
    if (!sid) {
      sid = "sess_" + Math.random().toString(36).slice(2, 11) + "_" + Date.now();
      sessionStorage.setItem("spe_session_id", sid);
    }
    return sid;
  }

  // ── Normalise event payload ───────────────────────────────────────────────
  function buildPayload(data) {
    return {
      persona:      data.persona      || null,
      journey_step: data.stepIndex != null ? data.stepIndex + 1 : null,
      step_id:      data.stepId       || null,
      step_title:   data.stepTitle    || null,
      phase_name:   data.phaseName    || null,
      document_url: data.documentUrl  || null,
      completed:    data.completed === true,
      session_id:   getSessionId(),
      page_url:     window.location.href,
      page_title:   document.title,
      funnel_version: "1.0"
    };
  }

  // ── localStorage (always on) ──────────────────────────────────────────────
  function persistLocally(eventName, payload) {
    try {
      const key = "spe_events";
      const list = JSON.parse(localStorage.getItem(key) || "[]");
      list.push({ eventName, timestamp: new Date().toISOString(), ...payload });
      if (list.length > 500) list.splice(0, list.length - 500);
      localStorage.setItem(key, JSON.stringify(list));
    } catch (_) {}
  }

  // ── Google Analytics 4 ────────────────────────────────────────────────────
  // Docs: https://developers.google.com/analytics/devguides/collection/ga4/events
  // GA4 event names must be snake_case, ≤ 40 chars, no dots allowed.
  const GA4_NAME_MAP = {
    "spe.page_view":         "spe_page_view",
    "spe.persona_selected":  "spe_persona_selected",
    "spe.journey_started":   "spe_journey_started",
    "spe.step_viewed":       "spe_step_viewed",
    "spe.doc_opened":        "spe_doc_opened",
    "spe.step_completed":    "spe_step_completed",
    "spe.journey_completed": "spe_journey_completed"
  };

  function sendGA4(eventName, payload) {
    if (!PROVIDERS.ga4.enabled) return;
    if (typeof window.gtag !== "function") {
      console.warn("[SPE Analytics] GA4: gtag not loaded. Add the GA4 script tag to your HTML.");
      return;
    }
    // GA4 parameter values must be strings or numbers (no nulls)
    const params = {};
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== null && v !== undefined) params[k] = v;
    });
    window.gtag("event", GA4_NAME_MAP[eventName] || eventName, params);
  }

  // ── PostHog ───────────────────────────────────────────────────────────────
  // Docs: https://posthog.com/docs/libraries/js
  // PostHog accepts any event name and any JSON-serialisable properties.
  function sendPostHog(eventName, payload) {
    if (!PROVIDERS.posthog.enabled) return;
    if (typeof window.posthog === "undefined") {
      console.warn("[SPE Analytics] PostHog: snippet not loaded. Add the PostHog script tag.");
      return;
    }
    window.posthog.capture(eventName, payload);
  }

  // ── Mixpanel ──────────────────────────────────────────────────────────────
  // Docs: https://developer.mixpanel.com/docs/javascript-full-api-reference
  function sendMixpanel(eventName, payload) {
    if (!PROVIDERS.mixpanel.enabled) return;
    if (typeof window.mixpanel === "undefined") {
      console.warn("[SPE Analytics] Mixpanel: snippet not loaded. Add the Mixpanel script tag.");
      return;
    }
    window.mixpanel.track(eventName, payload);
  }

  // ── Adobe CJA (alloy.js) ──────────────────────────────────────────────────
  function sendAdobe(eventName, payload) {
    if (!PROVIDERS.adobe.enabled) return;
    if (typeof window.alloy !== "function") {
      console.warn("[SPE Analytics] Adobe: alloy.js not loaded.");
      return;
    }
    window.alloy("sendEvent", {
      xdm: {
        eventType: eventName,
        timestamp: new Date().toISOString(),
        web: {
          webPageDetails: { name: document.title, URL: window.location.href },
          webReferrer: { URL: document.referrer || "" }
        },
        _microsoft: {
          sharePointEmbedded: payload
        }
      }
    }).catch(err => console.warn("[SPE Analytics] Adobe alloy error:", err));
  }

  // ── Master dispatch ───────────────────────────────────────────────────────
  function dispatch(eventName, data) {
    const payload = buildPayload(data);

    // Fire all enabled providers
    sendGA4(eventName, payload);
    sendPostHog(eventName, payload);
    sendMixpanel(eventName, payload);
    sendAdobe(eventName, payload);

    // Always persist locally for the dashboard live feed
    persistLocally(eventName, payload);

    // Dev console
    const active = Object.entries(PROVIDERS)
      .filter(([, p]) => p.enabled).map(([k]) => k).join(", ") || "localStorage only";
    console.log(`[SPE Analytics] ${eventName}`, { payload, providers: active });
  }

  // ── Provider init (call once per page, after scripts load) ───────────────
  function initProviders() {
    if (PROVIDERS.ga4.enabled && typeof window.gtag === "function") {
      window.gtag("config", PROVIDERS.ga4.measurementId, { send_page_view: false });
      console.info("[SPE Analytics] GA4 ready:", PROVIDERS.ga4.measurementId);
    }
    if (PROVIDERS.posthog.enabled && typeof window.posthog !== "undefined") {
      window.posthog.init(PROVIDERS.posthog.apiKey, {
        api_host: PROVIDERS.posthog.apiHost,
        capture_pageview: false,    // we track manually
        capture_pageleave: true,
        autocapture: false
      });
      console.info("[SPE Analytics] PostHog ready");
    }
    if (PROVIDERS.mixpanel.enabled && typeof window.mixpanel !== "undefined") {
      window.mixpanel.init(PROVIDERS.mixpanel.token, { track_pageview: false });
      console.info("[SPE Analytics] Mixpanel ready");
    }
    if (PROVIDERS.adobe.enabled && typeof window.alloy === "function") {
      window.alloy("configure", {
        datastreamId: PROVIDERS.adobe.datastreamId,
        orgId: PROVIDERS.adobe.orgId,
        debugEnabled: false,
        clickCollectionEnabled: false
      });
      console.info("[SPE Analytics] Adobe alloy ready");
    }

    // Expose active provider info for the dashboard status panel
    window.__SPE_PROVIDERS = PROVIDERS;
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    init() { initProviders(); },

    trackPageView(persona) {
      dispatch("spe.page_view", { persona });
    },
    trackPersonaSelected(persona) {
      dispatch("spe.persona_selected", { persona });
    },
    trackJourneyStarted(persona) {
      dispatch("spe.journey_started", { persona });
    },
    trackStepViewed(persona, stepIndex, step) {
      dispatch("spe.step_viewed", {
        persona, stepIndex,
        stepId: step.id, stepTitle: step.title,
        phaseName: step.phaseName, documentUrl: step.url
      });
    },
    trackDocOpened(persona, stepIndex, step) {
      dispatch("spe.doc_opened", {
        persona, stepIndex,
        stepId: step.id, stepTitle: step.title,
        phaseName: step.phaseName, documentUrl: step.url
      });
    },
    trackStepCompleted(persona, stepIndex, step) {
      dispatch("spe.step_completed", {
        persona, stepIndex,
        stepId: step.id, stepTitle: step.title,
        phaseName: step.phaseName, documentUrl: step.url,
        completed: true
      });
    },
    trackJourneyCompleted(persona, totalSteps) {
      dispatch("spe.journey_completed", {
        persona, stepIndex: totalSteps - 1, completed: true
      });
    },

    /** Called when a Learn article card enters the viewport on the landing page */
    trackArticlePreviewed(articleId, articleTitle, articleUrl) {
      dispatch("spe.article_previewed", {
        stepId: articleId,
        stepTitle: articleTitle,
        documentUrl: articleUrl
      });
      // Increment local view counter for this article
      try {
        const key = "spe_article_views";
        const views = JSON.parse(localStorage.getItem(key) || "{}");
        views[articleId] = (views[articleId] || 0) + 1;
        localStorage.setItem(key, JSON.stringify(views));
      } catch (_) {}
    },

    /** Get per-article view counts accumulated on this page */
    getArticleViews() {
      try { return JSON.parse(localStorage.getItem("spe_article_views") || "{}"); }
      catch { return {}; }
    },

    // localStorage helpers (used by dashboard)
    getLocalEvents() {
      try { return JSON.parse(localStorage.getItem("spe_events") || "[]"); }
      catch { return []; }
    },
    clearLocalEvents() { localStorage.removeItem("spe_events"); },

    // Backwards-compat shim (old pages call initAlloy)
    initAlloy() { this.init(); },

    getActiveProviders() {
      return Object.entries(PROVIDERS)
        .filter(([, p]) => p.enabled)
        .map(([k]) => k);
    }
  };
})();
