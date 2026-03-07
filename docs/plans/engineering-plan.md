# Engineering Plan: Calypso PRD Wizard

This document outlines the technical strategy for building the Calypso PRD Wizard, bridging the transition from a verified scaffold to a production-ready application.

## 1. Technical Strategy
The project follows the **Calypso Blueprint**:
- **Architecture**: Monorepo (Bun + React + Tailwind).
- **LLM Boundary**: The server handles task orchestration and "headless agent" calls via CLI.
- **Persistence**: Starts with SQLite (`bun:sqlite`) for Alpha, migrating to PostgreSQL for Beta.
- **Minimalism**: DIY internal components over heavy third-party libraries.

---

## 2. Milestone 1: Prototype (Comprehensive)
**Goal**: Build a fully functional prototype with UI, persistence, and agent integration.

### Phase 1: Interactive Wizard & UI
- **UI Architecture**: Focus-mode state machine in React (`/apps/web`).
- **Data Model**: Universal TypeScript interfaces for PRD sections in `@calypso/core`.
- **Validation**: Client-side validation for business unit mapping.
- **Aesthetic**: Premium dark-mode/glassmorphism following the Calypso design standard.

### Phase 2: Persistence & Authentication
- **Persistence**: Implementation of `bun:sqlite` in `/apps/server` for session state.
- **Auth**: Minimalist self-hosted JWT middleware for secure interaction.
- **File I/O**: Server service to write generated `.md` files to the repository.

### Phase 3: Headless Agent Integration
- **Agent Bridge**: `/packages/services` module to execute `gh` or `claude` (Claude CLI) commands.
- **Generation**: Automated generation of `docs/prd.md` based on gathered wizard data.
- **Golden Fixtures**: Recording real LLM responses to ensure test determinism.

---

## 3. Future Phases (Post-Prototype)
- **Beta**: Transition to PostgreSQL, multi-user scaling, and observability.
- **V1**: Production stability and cloud-native deployment.

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
