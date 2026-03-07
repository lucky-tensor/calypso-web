# Engineering Plan: Calypso PRD Wizard

This document outlines the technical strategy for building the Calypso PRD Wizard, bridging the transition from a verified scaffold to a production-ready application.

## 1. Technical Strategy
The project follows the **Calypso Blueprint**:
- **Architecture**: Monorepo (Bun + React + Tailwind).
- **LLM Boundary**: The server handles task orchestration and "headless agent" calls via CLI.
- **Persistence**: Starts with SQLite (`bun:sqlite`) for Alpha, migrating to PostgreSQL for Beta.
- **Minimalism**: DIY internal components over heavy third-party libraries.

---

## 2. Milestones

### Milestone 0: Scaffold (COMPLETED)
- [x] Monorepo structure established.
- [x] SPA routing implemented.
- [x] Testing foundations (Vitest/Playwright) verified.
- [x] Repo hosted on GitHub.

### Milestone 1: Prototype (Flash Phase)
**Goal**: Interactive UI for data gathering with no persistence.
- **UI Architecture**: Focus-mode state machine in React (`/apps/web`).
- **Data Model**: Universal TypeScript interfaces for PRD sections in `@calypso/core`.
- **Validation**: Client-side validation for business unit mapping.
- **E2E**: Verify user flow from "Start" to "Review Summary".

### Milestone 2: Alpha (Data Integrity)
**Goal**: Persisting wizard states and basic file output.
- **Persistence**: Integration of `bun:sqlite` in `/apps/server`.
- **Auth**: Minimalist self-hosted JWT middleware.
- **File I/O**: Server service to write `.md` files to a dedicated `output/` directory.
- **API**: Endpoints for `saveState` and `generateDraft`.

### Milestone 3: Beta (Agent Integration)
**Goal**: Headless generation using CLI agents.
- **Agent Bridge**: `/packages/services` module to execute `gh` or `claude` commands.
- **Streaming**: Handle long-running generation tasks with state polling.
- **Golden Fixtures**: Record real LLM responses for deterministic integration testing.

---

## 3. Component Architecture

### `@calypso/web` (React SPA)
- `WizardEngine`: Manages question progression and state.
- `AestheticLayer`: Implements the high-orbit dark mode and glassmorphism.

### `@calypso/server` (Bun/Hono)
- `AuthInterceptor`: JWT validation.
- `GenerationQueue`: Orchestrates the transition from gathered data to PRD generation.

### `@calypso/core` (Shared Types & Logic)
- `PRDSchema`: The Zod/TS source of truth for what a PRD contains.
- `BussinessUnits`: Definitions for Sales, HR, Engineering domains.

---

## 4. Verification Plan

### CI/CD Enforcement
- Every milestone must pass `bun run lint` and `bun run test`.
- **Milestone 1** requirement: Playwright coverage for the entire wizard flow.
- **Milestone 2** requirement: Integration tests verifying SQLite transaction integrity.

### Performance & UX
- Wizard transitions must maintain 60fps micro-animations.
- Server response time for API endpoints < 100ms (excluding generation tasks).
