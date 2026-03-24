# 📦 Inventory System Documentation

## Overview

The inventory system is a **modular, server-driven system** responsible for:

- Managing player items
- Handling item storage (pockets, clothes, quick-use)
- Enforcing slot and weight limits
- Providing item lookup and filtering
- Handling item usage with progress bars, animations, and callbacks
- Syncing inventory state with the database

The system is designed to be:
- **Extensible** (easy to add new item types)
- **Structured** (category-based storage)
- **Gameplay-ready** (built-in usage flow with animations & UI)

---

## 🧠 Core Architecture

The inventory system is built around **three main components**:

### 1. `Inventory` (Core Logic)

Handles:
- Item storage
- Slot management
- Item operations (add, remove, search)
- Item usage pipeline

---

### 2. `InventoryItemsEntity` (Persistence Layer)

Represents inventory data stored in the database:
- Clothes slots
- Pocket slots
- Quick-use slots

---

### 3. `InteractProgressBar` (Usage System)

Handles:
- Item usage timing
- Animations
- Object attachments
- Cancel / finish states

---

## 📁 Inventory Structure

Each player inventory is divided into **categories**:

| Category   | Description |
|------------|------------|
| `clothes`  | Equipment / wearable slots |
| `pockets`  | Main storage |
| `quickUse` | Fast-access items |

---

## ⚙️ Initialization Flow

Inventory is created **after player login & character load**.

```ts
const invPreset = inventorydataPresset;

character.inventory = new Inventory(
    player,
    invPreset.clothes,
    invPreset.pockets,
    invPreset.quickUse
);
```

### Important Notes

- Inventory **must not be initialized before character exists**
- Preset defines:
  - Slot sizes
  - Default layout
- Inventory is then linked to DB:

```ts
const entity = new InventoryItemsEntity();

entity.clothes = character.inventory.items.clothes;
entity.pockets = character.inventory.items.pockets;
entity.quickUse = character.inventory.quickUse;
entity.character = character;

character.items = entity;
```

---

## 📦 Item Model

All items follow the base interface:

```ts
IBaseItem {
    name: string;
    hash: string;
    image?: string;
    type: ITEM_TYPES;
}
```

Each item is uniquely identified using a **UUID / hash key**.

---

## 🧰 Core Methods

### ➕ Add Item

```ts
inventory.addItem(type: ITEM_TYPES): IBaseItem | null;
```

- Automatically finds a valid slot
- Returns `null` if inventory is full

---

### 🔍 Get Item by UUID

```ts
inventory.getItemByUUID(hash: string): IBaseItem | null;
```

Used for:
- Item usage
- Validation
- Sync operations

---

### 📂 Filter Items

```ts
inventory.getItemsInCategoryByType(categories, type)
```

Example:

```ts
inventory.getItemsInCategoryByType(
    [INVENTORY_CATEGORIES.POCKETS],
    ITEM_TYPES.ITEM_TYPE_PISTOL
);
```

---

## ⚡ Item Usage System

Item usage is **not instant** — it's handled through a controlled pipeline:

```
Request → Progress Bar → Animation → Completion / Cancel
```

---

### Start Using Item

```ts
inventory.startUsingItem(player, description, time, data, callback);
```

### Parameters

| Param | Description |
|------|------------|
| `description` | UI text |
| `time` | Duration (seconds) |
| `data` | Animation + item config |
| `callback` | Executed on success |

---

## 🎬 Progress Bar System

### Class: `InteractProgressBar`

Handles full lifecycle of an interaction.

---

### Flow

1. Starts UI progress bar  
2. Plays animation  
3. Attaches object (optional)  
4. Waits duration  
5. Either:  
   - ✅ completes → callback  
   - ❌ cancels → reset state  

---

### Example Usage

```ts
inventory.startUsingItem(
    player,
    "Repairing vehicle...",
    5,
    {
        item: repairKit,
        animDict: "mini@repair",
        animName: "fixing_a_player",
        flag: 49,
        attachObject: "toolbox"
    },
    () => {
        // success logic
    }
);
```

---

## 🧩 Usage Data Interface

```ts
interface IUsingItemData {
    item: IBaseItem;
    animDict?: string;
    animName?: string;
    flag?: number;
    attachObject?: string;
}
```

---

## ❌ Cancel Handling

```ts
progressBar.onCancel(player);
```

- Stops animation  
- Removes object  
- Resets player state  

---

## 🏗️ How Items Actually Work (Important)

Items are **not just objects**, they are:

- Defined by `ITEM_TYPES`
- Created dynamically
- Stored in structured slots
- Referenced via UUID

This means:

✔ You don’t manually create item instances  
✔ You request items by type  
✔ System handles placement + structure  

---

## ➕ Adding New Items

### Step 1: Add to Enum

```ts
ITEM_TYPE_MY_ITEM
```

---

### Step 2: Define Item Data

Inside your item registry (Assets module):

```ts
{
    type: ITEM_TYPE_MY_ITEM,
    name: "My Item",
    image: "my_item.png"
}
```

---

### Step 3: Use It

```ts
inventory.addItem(ITEM_TYPE_MY_ITEM);
```

---

## 🔁 Typical Flow Example

```ts
const items = inventory.getItemsInCategoryByType(
    [INVENTORY_CATEGORIES.POCKETS],
    ITEM_TYPES.ITEM_TYPE_PISTOL
);

if (!items.length) return;

inventory.startUsingItem(
    player,
    "Using weapon...",
    3,
    {
        item: items[0],
        animDict: "combat@aim",
        animName: "fire",
        flag: 16
    },
    () => {
        // apply effect
    }
);
```

---

## ⚠️ Best Practices

### ✅ Do

- Always check `player.character.inventory`
- Use UUID for item operations
- Use categories properly
- Handle null returns

---

### ❌ Don’t

- Don’t manually mutate inventory arrays
- Don’t skip progress system for actions
- Don’t trust client-side item state

---

## 🔄 Data Flow Summary

```
Database (InventoryItemsEntity)
        ↓
Inventory Class (Server)
        ↓
Player Interaction
        ↓
Progress Bar System
        ↓
Callback Execution
```

---

## 💡 Design Notes

- Inventory is **server authoritative**
- Progress system prevents instant abuse
- Modular structure allows:
  - Crafting systems
  - Equipment systems
  - Trading systems

---

## 🚀 Extending the System

You can easily build on top of this:

- Item effects system
- Durability system
- Stackable items
- Drag & drop UI (CEF)
- Trading between players

---

## 🧾 Summary

The inventory system provides:

✔ Structured item storage  
✔ Clean API for item operations  
✔ Built-in usage system with animations  
✔ Database integration  
✔ Extensible architecture  