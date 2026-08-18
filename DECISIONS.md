# NOVA — Engineering Decisions

## 1. Why Django + server-rendered HTML instead of React?

I chose Django with server-rendered HTML, CSS, and vanilla JavaScript because the challenge focuses on delivering a polished responsive homepage rather than a complex client-side application.

This approach aligns with my Python-oriented development path and keeps the implementation simple enough to understand and defend during a technical discussion. I rejected React because the homepage does not require complex client-side state management. Django templates with lightweight JavaScript reduced setup and allowed more time for UI quality, responsive behavior, accessibility, and product presentation.

Chart.js was introduced only for the interactive analytics visualization where it provides clear value.

## 2. What trade-off did I make under the time limit?

I intentionally treated NOVA as a product demonstration rather than implementing a complete analytics SaaS backend. The dashboard uses controlled fictional demonstration data instead of real customer data, authentication, external data ingestion, or a production AI inference pipeline.

With a full development week, I would add authentication, PostgreSQL, real analytics APIs, data connectors, background processing, user-specific dashboards, and an actual AI insight pipeline. For this challenge, implementing those systems would reduce the time available to polish the homepage that is actually being evaluated.

## 3. Where did I use AI tools?

AI tools were used for brainstorming, implementation assistance, debugging ideas, and reviewing possible approaches. I personally reviewed, tested, and modified the generated implementation, including the Django structure, responsive CSS, JavaScript interactions, Chart.js behavior, accessibility, CTA interactions, and deployment configuration.

No generated code was included without understanding its purpose. The final application was manually tested across desktop and mobile layouts, including approximately 390px and 1440px widths.

## Principle

The final implementation prioritizes **clarity, honesty, responsiveness, restraint, and product quality over unnecessary complexity.**
