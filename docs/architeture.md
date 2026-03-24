# Architecture

This framework follows a **multi-layer architecture**.

---

## Layers

### Server

* Game logic
* Database
* Authority over state

### Client

* Player input
* Visual behavior
* Lightweight logic

### Shared

* Types
* Utilities
* Contracts

### CEF (Frontend)

* UI (React)
* HUD, menus, interactions

---

## Data Flow

Player Input → Client → Server → Database
Server → Client → UI (CEF)

---

## Golden Rule

> The server is always the source of truth.
