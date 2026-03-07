# Product Owner Interview: Calypso PRD Wizard

**Role:** Expert Software Architect & Technical PM (Calypso Specialist)
**Objective:** Confirm specifications for the "Calypso PRD Wizard" helper app.

---

## 1. Product Vision & Value Proposition

* **Core Problem:** Users struggle to bootstrap high-quality enterprise web applications with clear requirements.
* **Inferred Solution:** An interactive wizard that extracts business unit requirements and generates a canonical `prd.md`, replacing the need for multiple fragmented SaaS vendors by building a unified internal platform.
* **Success Outcome:** A user can go from a vague idea to a fully specified Calypso project with a `prd.md` file, ready for an AI agent to implement.

> [!NOTE]
> **PO REVIEW:** Is the primary goal specifically to "replace SaaS vendors" by localizing all business unit software into this new portal/platform?
> - [x] **Yes** (Inferred)
> - [ ] **No** (Please clarify)

---

## 2. Core Workflows & User Stories

### User Story 1: Business Unit Discovery
* **Workflow:** User identifies which business units (e.g., Sales, HR, Engineering) require software.
* **Interaction:** Multiple-choice selection of departments.

### User Story 2: Interaction Mapping
* **Workflow:** User defines data flowing *between* units, *from* external sources, and *to* external sinks.
* **Interaction:** Wizard prompts for synchronization requirements and reporting needs.

### User Story 3: Agent Intelligence & Access
* **Workflow:** User specifies what data the AI Agent (Claude CLI) can see (logs, records) and fuse into intelligence.
* **Interaction:** Permissions checklist for the agent per department.

### User Story 4: PRD Generation
* **Workflow:** Wizard triggers a headless Bun process to spawn the Claude CLI, which helps refine the questionnaire logic, and finally outputs `prd.md`.

> [!NOTE]
> **PO REVIEW:** After the `prd.md` is generated, the user enters a "Chat with Agent" mode. Is this chat occurring *within* the web app, or does the web app simply facilitate the initial setup for the external CLI agent?
> - [x] **Informed Choice:** The web app provides an interface to chat with the agent (spawning the CLI in the background).

---

## 3. User Roles, Permissions, and Access

* **Roles:** 
    - **Administrator:** Can configure all business units and agent permissions.
    - **Business Unit User:** Can access portal features specific to their department (as defined in the generated PRD).
* **Identity:** Self-hosted JWT auth stored in secure cookies (Calypso Standard).

---

## 4. UI Style & User Experience (CRITICAL)

* **Aesthetic:** **Elite, professional, and contemporary.** 
* **Design System:** Use a high-end, minimalist palette (e.g., deep charcoal, slate, and vibrant highlights). 
* **Typography:** Modern, highly readable fonts (e.g., Inter, Outfit).
* **Interactions:** Subtle micro-animations, glassmorphism elements, and smooth transitions.
* **Wizard Flow:** A "Focus Mode" experience that hides unnecessary distractions, focusing the user entirely on the current question.

> [!NOTE]
> **PO REVIEW:** Should the professional style lean more towards a "Dark Mode" default to emphasize the contemporary look?
> - [x] **Yes** (Inferred)
> - [ ] **No** (Please specify preference)

---

## 5. External Integrations (Business Context)

* **Integration 1:** **Claude CLI (Headless via Bun).** This is the core engine for LLM assistance.
* **Integration 2:** **External Data Sources/Sinks.** The wizard must allow users to define these (e.g., Salesforce, Stripe context) even if they aren't configured yet.

---

## 5. Test Credentials and Setup

> [!IMPORTANT]
> To build the "Golden Fixture" generator for the Claude CLI integration, I will need access to a machine where Claude is installed, or a mockable execution path that mimics the CLI's stdio behavior.

---

**Next Steps:**
Please confirm or edit the inferred answers above. Once confirmed, I will generate the `docs/prd.md` and begin the **Prototype Phase**.
