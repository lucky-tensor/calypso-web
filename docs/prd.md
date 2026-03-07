# PRD: Calypso PRD Wizard

## 1. Executive Summary
The Calypso PRD Wizard is an interactive, "elite" web application designed to help users bootstrap enterprise-grade web applications by generating a canonical `prd.md` file. It focuses on replacing fragmented SaaS vendors with a unified, agent-enhanced internal platform.

## 2. Product Vision
- **Target Audience:** Entrepreneurs, Product Managers, and AI Engineers.
- **Core Value:** Move from business unit requirements to a structured technical roadmap in minutes.
- **Killer Feature:** Headless integration with the Claude CLI to help refine and generate the final PRD.

## 3. Scope & Features

### Phase 1: Interactive Wizard
- **Business Unit Discovery:** Multiple-choice selection of departments (Sales, HR, Ops, etc.).
- **Interaction Mapping:** Define data flows between units and external sources/sinks.
- **Agent Governance:** Configure which data types (logs, employee records, customer data) the agent can query or fuse.
- **Reporting & Task Queues:** Define high-level requirements for internal operations.

### Phase 2: PRD Generation
- Output a version-controlled `docs/prd.md` in the user's project.
- Use a headless Bun process to interact with the Claude CLI for intelligent text generation.

### Phase 3: Post-Generation Chat
- An integrated chat interface to iterate on the generated PRD directly with the agent.

## 4. User Experience & Design
- **Style:** Elite, professional, contemporary.
- **Aesthetic:** Dark Mode default, high-end slate/charcoal palette, glassmorphism.
- **Navigation:** Focus-mode wizard (one question at a time) with smooth micro-animations.

## 5. Technical Constraints (Calypso Compliance)
- **Stack:** TypeScript, Bun, React, Tailwind CSS.
- **Architecture:** Monorepo with strict separation of `/apps/web` and `/apps/server`.
- **Deployment:** Bare-metal Linux (Target: systemd).
- **Authentication:** Self-hosted JWT (secure cookies).
- **Testing:** Zero-mocking philosophy; Vitest + Playwright.

## 6. Business Units & Access (Inferred)
1. **Sales:** Customer records, lead sync.
2. **HR:** Employee actions, internal logs.
3. **Engineering:** Program error logs, task queues.

---
*Created via Calypso PRD Assistant*
