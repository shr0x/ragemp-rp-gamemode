
# CEF Events & Communication

This document explains how communication between the **backend (server)** and the **CEF frontend (UI)** works. 

## Summary:
The code of this project is focused on structure, type declaration and or hard coded declaration, if you're a single developer, you can skip this totally, but if you're a team of developers, then this way becomes powerful because by declaring types you don't have to explain stuff or have other developers in your team confused. How this came as an idea? Well a little story about this, when I used to work with other developers and the did new features, I would always go back and forth on files to find data such as event names they used, or what even should i call to update a new ui done by another dev in the team, so yeah, in this system, other devs have to declare events they create linked on the ui they added, so whenever another dev tries to call an event for that specific ui they get a pop-up hint with all available events for that page, awesome right?


## 🔁 Full Communication Flow

### Server → UI

```text
[RAGERP.cef.emit]
        ↓
cef::<target>:<event>
        ↓
client bridge (<client::eventManager>)
        ↓
CEF<communication receiver>
        ↓
window.callHandler("target:event")
        ↓
EventManager.callHandler("target:event")
        ↓
Store Handler (MobX)
        ↓
UI Updates (React)
```

---

### UI → Server

```text
EventManager.emitServer("target", "event")
        ↓
server::<target>:<event>
        ↓
client bridge (mp.trigger → callRemote)
        ↓
RAGERP.cef.register handler
        ↓
Server Logic Executes
```

---

## 🧠 One-Line Summary

```text
Server → emit → UI updates
UI → emitClient → Client executes
UI → emitServer → Server executes
```


## 🧠 Why this system exists

In default RAGE:MP development, updating the UI requires multiple steps across different layers.

To send data to the UI:

```ts
server → client → CEF
```

To receive data from the UI:

```ts
CEF → client → server
```

This means every UI interaction requires manually wiring multiple events between server, client, and browser.

---

## ❌ Default Approach

Example: updating player cash in the UI.

### Server

```ts
player.cash += 1000;
player.call("updateCash", player.cash);
```

### Client

```ts
mp.events.add("updateCash", (cash) => {
    browser.execute(`updateCash(${cash})`);
});
```

### Frontend

```ts
const updateCash = (cash) => {
    // update UI
}
```

---

### Problem

This approach becomes difficult to manage when:

* many UI features exist
* multiple developers are working together
* event names and payloads are not centralized

You often end up:

* searching for event names across files
* guessing payload structures
* duplicating logic

---

## ✅ Solution: Structured CEF Event System

This framework introduces a structured system that removes unnecessary layers and standardizes communication.

Instead of:

```ts
server → client → UI
```

You work with:

```ts
RAGERP.cef.emit(...)
EventManager.addHandler(...)
```

---

## 🎯 Goal

* simplify UI communication
* enforce consistent structure
* provide type-safe contracts
* improve collaboration between developers

---

## 🧠 Design Philosophy

This system is built with long-term scalability in mind.

Instead of allowing random event usage, it enforces:

* centralized event definitions (`CefData.ts`)
* structured naming (`target:event`)
* clear separation of responsibilities

This becomes especially powerful in team environments, where:

* developers can instantly see available UI events
* event payloads are predictable
* systems remain consistent across the project

---

## 💡 Key Idea

> UI communication should be structured, predictable, and easy to extend — not manually wired every time.

---

Everything explained below builds on this system.


This document explains how communication between:

* Server (backend)
* Client (client side)
* Frontend (CEF / React)

works inside the framework.

---

# 🧠 Overview

The framework uses a structured event system:

* `RAGERP.cef.emit` → Server → UI
* `RAGERP.cef.register` → UI → Server
* `CefData.ts` → Shared contract
* `EventManager` → Frontend dispatcher

---

# 🧩 What is `RAGERP`?

`RAGERP` is the **main framework API object**.

It exposes core systems:

```ts
RAGERP.database
RAGERP.entities
RAGERP.utils
RAGERP.cef
RAGERP.commands
RAGERP.chat
```

---

# 🔁 Event Naming System

All events follow this structure:

```bash
<target>:<event>
```

Examples:

* `hud:setInteraction`
* `auth:loginPlayer`
* `inventory:setItems`

Internally:

| Direction   | Format                     |
| ----------- | -------------------------- |
| Server → UI | `cef::<target>:<event>`    |
| UI → Server | `server::<target>:<event>` |

---

# 🔧 Server → UI (`RAGERP.cef.emit`)

### Purpose

Send data from server to frontend.

---

## Example

```ts
RAGERP.cef.emit(player, "hud", "setAreaData", {
  area: "San Andreas",
  street: "Los Santos"
});
```

---

## Flow

```text
Server
→ cef::hud:setAreaData
→ client::eventManager
→ Browser.class.ts
→ window.callHandler("hud:setAreaData")
→ EventManager.callHandler(...)
→ frontend store updates
```

---

## Rule

> Use `emit` when the server needs to update UI.

---

# 📥 UI → Server (`RAGERP.cef.register`)

### Purpose

Handle events coming from the frontend.

---

## Example

```ts
RAGERP.cef.register("auth", "loginPlayer", async (player, data) => {
  const parsed = RAGERP.utils.parseObject(data);

  // handle login
});
```

---

## Flow

```text
Frontend
→ EventManager.emitServer("auth", "loginPlayer")
→ Browser → mp.events.callRemote
→ server::auth:loginPlayer
→ handler executes
```

---

## Rule

> Use `register` for UI-triggered actions.

---

# 📦 `CefData.ts` (Contract Layer)

Location:

```
source/shared/CefData.ts
```

---

## Purpose

Defines:

* available events
* payload structure
* allowed communication

---

## Server → UI

```ts
export interface CefEventMap {
  hud: {
    setAreaData: { area: string; street: string };
  };
}
```

---

## UI → Server

```ts
export interface IncomingCEFEvents {
  auth: {
    loginPlayer: (player: PlayerMp, data: any) => void;
  };
}
```

---

## Why this matters

Without it:

❌ random events
❌ unknown payloads

With it:

✅ typed system
✅ predictable behavior
✅ safer development

---

# 🧩 Full System Flow

## Server → UI

```text
RAGERP.cef.emit
→ Browser bridge
→ window.callHandler
→ EventManager.callHandler
→ Store handler
→ UI updates
```

---

## UI → Server

```text
EventManager.emitServer
→ Browser bridge
→ mp.events.callRemote
→ RAGERP.cef.register
→ Server logic
```

---

# 🧠 Mental Model

* `emit` → send data to UI
* `register` → receive data from UI
* `CefData.ts` → defines allowed events
* `EventManager` → executes frontend handlers

---

# 🎯 Summary

| Layer    | Responsibility    |
| -------- | ----------------- |
| Server   | Logic + authority |
| Client   | Bridge            |
| Frontend | UI + state        |
| Shared   | Contracts         |

---

> This system ensures all UI communication is structured and scalable.


# Frontend Event Manager

Location:

```
frontend/src/utils/EventManager.util.ts
```

---

# 🧠 Overview

`EventManager` is the **frontend event registry and dispatcher**.

It is responsible for:

* storing event handlers in memory
* dispatching incoming events from the game
* sending events to server or client
* grouping events by `target`

---

# 🧩 Event Structure

Each event is defined as:

```ts
interface EventEntry {
  target: string;
  name: string;
  handler: (...args: any[]) => void;
}
```

---

## Example

```ts
target: "hud"
name: "setAreaData"
```

Full event:

```ts
hud:setAreaData
```

---

# 📦 Internal Storage

All handlers are stored in:

```ts
private eventsInMemory: EventEntry[] = [];
```

---

# 🔧 Methods

---

## `addHandler(target, name, handler)`

Registers a new event handler.

```ts
EventManager.addHandler("hud", "setAreaData", (data) => {
  this.setAreaData(data);
});
```

### Behavior

* Prevents duplicates
* First registration wins

---

## `updateHandler(target, name, handler)`

Replaces an existing handler.

```ts
EventManager.updateHandler("hud", "setAreaData", newHandler);
```

---

## `callHandler("target:name", ...args)`

Dispatches an event.

```ts
EventManager.callHandler("hud:setAreaData", data);
```

### Behavior

* Splits event string
* Finds matching handler
* Executes it

---

## `stopAddingHandler(target)`

Logs registered handlers (dev mode only).

```ts
EventManager.stopAddingHandler("hud");
```

### Important

> This does NOT block future registrations.

---

## `removeTargetHandlers(target)`

Removes all handlers for a target.

```ts
EventManager.removeTargetHandlers("hud");
```

---

## `emitServer(target, name, ...args)`

Sends event to server.

```ts
EventManager.emitServer("auth", "loginPlayer", data);
```

Internally:

```ts
server::auth:loginPlayer
```

---

## `emitClient(target, name, ...args)`

Sends event to client layer.

```ts
EventManager.emitClient("camera", "close");
```

---

# 🔁 How Events Reach EventManager

```text
Server
→ RAGERP.cef.emit
→ Client side Browser bridge
→ window.callHandler("hud:setAreaData")
→ EventManager.callHandler("hud:setAreaData")
→ handler runs
```

---

# 🧩 How Handlers Should Be Registered

## Correct Pattern (Store-based)

```ts
public createEvents() {
  EventManager.addHandler("hud", "setAreaData", (data) => this.setAreaData(data));
  EventManager.addHandler("hud", "setVehicleData", (data) => this.setVehicleData(data));
  EventManager.stopAddingHandler("hud");
}
```

---

## Why this pattern

* Each system owns its events
* No global event chaos
* Easy to maintain

---

# 🧠 Architecture Pattern

```text
EventManager
→ Store handler
→ MobX state update
→ React UI re-render
```

---

# 🚨 Common Mistakes

## ❌ Registering same event twice

Use:

```ts
updateHandler()
```

not:

```ts
addHandler()
```

---

## ❌ Misunderstanding stopAddingHandler

It is only for logging.

---

## ❌ Registering events in components

Events should be registered in stores/modules.

---

## ❌ Putting logic in UI

Frontend should only:

* receive data
* update state

---

# 🔗 Relationship with Other Systems

| System          | Role                  |
| --------------- | --------------------- |
| `RAGERP.cef`    | Server communication  |
| `Browser.class` | Client side ↔ Browser bridge |
| `EventManager`  | Frontend dispatcher   |
| `CefData.ts`    | Event contract        |

---

# 🧠 Mental Model

* `addHandler` → register event
* `callHandler` → execute event
* `emitServer` → send to backend
* `emitClient` → send to client

---

# 🎯 Summary

`EventManager` is the system that connects the frontend to the game by:

* storing handlers
* dispatching incoming events
* sending outgoing events
* enforcing structured communication

---

> It is the frontend equivalent of `RAGERP.cef`.
