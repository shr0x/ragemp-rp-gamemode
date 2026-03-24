# Project Structure

---

## Server (`source/server`)

* `api/` → abstractions
* `modules/` → gameplay systems
* `commands/` → command handlers
* `database/` → ORM + entities
* `events/` → event handlers
* `prototype/` → extensions (e.g. mp.Player)

---

## Client (`source/client`)

* `modules/` → gameplay logic
* `handlers/` → event bindings
* `procs/` → callable client functions
* `events/` → client events

---

## Shared (`source/shared`)

* types
* constants
* helpers

---

## Frontend (`frontend/`)

* React app
* MobX state
* UI components

---

## Rule

> If you don’t know where something goes → it probably belongs in a module.
