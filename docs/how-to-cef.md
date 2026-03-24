# 🧩 Adding a New Feature (CEF Page)

This guide explains how to add a **new feature/page** to the gamemode using the intended architecture.

A feature in this framework is not just UI — it is a **full system** that spans:

* Frontend (React page)
* Frontend state (Store + EventManager)
* Shared contract (`CefData.ts`)
* Backend logic (`RAGERP.cef`)

---

# 🧠 What “adding a feature” means

A complete feature includes:

1. UI page (React)
2. Store (state + event handlers)
3. Shared event definitions
4. Backend emit logic (server → UI)
5. Backend handlers (UI → server)
6. Gameplay entry point (command, interaction, etc.)

---

# 🎯 Example Feature: Bank

We will create a `bank` feature where:

* server opens the page
* UI shows player cash + balance
* player can deposit money
* server validates and updates state
* UI refreshes automatically

---

# 📦 Step 1 — Define the Contract (`CefData.ts`)

Location:

```bash
source/shared/CefData.ts
```

---

## Server → UI

```ts
export interface CefEventMap {
  bank: {
    setVisible: boolean;
    setData: {
      cash: number;
      balance: number;
    };
  };
}
```

---

## UI → Server

```ts
export interface IncomingCEFEvents {
  bank: {
    deposit: (player: PlayerMp, amount: number) => void;
  };
}
```

---

## 🧠 Why this matters

This defines:

* what the page receives
* what the page can send
* payload structure

> Always start here.

---

# 🖥 Step 2 — Create Frontend Page

Example:

```tsx
import { observer } from "mobx-react-lite";
import { bankStore } from "stores/Bank.store";

const BankPage = observer(() => {
  if (!bankStore.isVisible) return null;

  return (
    <div>
      <h1>Bank</h1>

      <p>Cash: {bankStore.cash}</p>
      <p>Balance: {bankStore.balance}</p>

      <button onClick={() => bankStore.deposit(500)}>
        Deposit 500
      </button>

      <button onClick={() => bankStore.hide()}>
        Close
      </button>
    </div>
  );
});

export default BankPage;
```

---

# 🧠 Rule

> UI should only render state and trigger actions.

---

# 🧩 Step 3 — Create Store (Event + State)

```ts
import { makeAutoObservable } from "mobx";
import EventManager from "utils/EventManager.util";

class _BankStore {
  isVisible = false;
  cash = 0;
  balance = 0;

  constructor() {
    makeAutoObservable(this);
    this.createEvents();
  }

  setVisible(state: boolean) {
    this.isVisible = state;
  }

  setData(data: { cash: number; balance: number }) {
    this.cash = data.cash;
    this.balance = data.balance;
  }

  deposit(amount: number) {
    EventManager.emitServer("bank", "deposit", amount);
  }

  hide() {
    this.setVisible(false);
    EventManager.emitClient("system", "setPage", "hud");
  }

  createEvents() {
    EventManager.addHandler("bank", "setVisible", (state: boolean) => this.setVisible(state));
    EventManager.addHandler("bank", "setData", (data) => this.setData(data));
    EventManager.stopAddingHandler("bank");
  }
}

export const bankStore = new _BankStore();
```

---

# 🧠 Key Idea

* Store owns state
* Store registers handlers
* Store sends actions

---

# ⚛️ Step 4 — Mount Page in App

```tsx
import BankPage from "pages/bank/BankPage";

function App() {
  return (
    <>
      <BankPage />
    </>
  );
}
```

---

# ⚠️ Important

> Creating the page file is not enough — it must be mounted.

---

# 🧠 Step 5 — Backend: Open the Page

```ts
function openBank(player: PlayerMp) {
  RAGERP.cef.startPage(player, "bank");

  RAGERP.cef.emit(player, "bank", "setVisible", true);
  RAGERP.cef.emit(player, "bank", "setData", {
    cash: player.cash,
    balance: player.bankBalance
  });
}
```

---

# 🧠 What happens

```text
Server
→ startPage("bank")
→ emit setVisible
→ emit setData
→ EventManager
→ Store updates
→ UI renders
```

---

# 📥 Step 6 — Backend: Handle UI Actions

```ts
RAGERP.cef.register("bank", "deposit", (player, amount: number) => {
  if (typeof amount !== "number" || amount <= 0) return;
  if (player.cash < amount) return;

  player.cash -= amount;
  player.bankBalance += amount;

  RAGERP.cef.emit(player, "bank", "setData", {
    cash: player.cash,
    balance: player.bankBalance
  });
});
```

---

# 🔁 Flow

```text
UI click
→ EventManager.emitServer
→ server::bank:deposit
→ handler executes
→ data updated
→ emit new state
→ UI refreshes
```

---

# 🎮 Step 7 — Connect to Gameplay

Example command:

```ts
mp.events.addCommand("bank", (player) => {
  openBank(player);
});
```

---

# 🧠 Now the feature is fully integrated

---

# 🔁 Full Flow Summary

## Open Page

```text
Server → startPage
→ emit data
→ EventManager
→ Store
→ UI
```

## User Action

```text
UI → emitServer
→ register handler
→ server logic
→ emit updated data
→ UI updates
```

---

# 📋 Feature Checklist

## Frontend

* Page component
* Store
* Event handlers (`addHandler`)
* Page mounted

## Shared

* `CefEventMap`
* `IncomingCEFEvents`

## Backend

* `emit` calls
* `register` handlers
* page opening logic
* gameplay trigger

---

# 🚨 Common Mistakes

## ❌ Skipping `CefData.ts`

Leads to unstructured events.

## ❌ Registering handlers in components

Use stores.

## ❌ Letting UI control logic

Server is authority.

## ❌ Forgetting to mount page

Page will never render.

---

# 🧠 Recommended Pattern

```text
Define contract
→ Create store
→ Register handlers
→ Build UI
→ Connect backend
→ Add gameplay entry
```

---

# 🎯 Final Takeaway

Adding a feature is not just UI.

It is a structured system across:

```text
Frontend UI
↕
Store (EventManager)
↕
Shared Contract
↕
Backend Logic
```

---

> Follow this pattern and every feature will remain scalable, predictable, and easy to maintain.
