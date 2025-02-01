# Inventory and Progress Bar Documentation

## Overview

This document provides a detailed explanation of the **Inventory System** and the **Progress Bar Implementation**. It includes methods for managing inventory items, starting a progress bar for item usage, and handling animations, objects, and callbacks during the usage process.

---

## Progress Bar Class Documentation

### **Class: InteractProgressBar**

The `InteractProgressBar` class manages the progress bar displayed to players when they interact with items. This includes animations, objects attached to the player, and post-action callbacks.

#### **Constructor**

```typescript
constructor(
    player: PlayerMp,
    description: string,
    time: number,
    data: IUsingItemData,
    onFinish: () => void
);
```

**Parameters**:

| Parameter     | Type             | Description                                              |
| ------------- | ---------------- | -------------------------------------------------------- |
| `player`      | `PlayerMp`       | The player using the item.                               |
| `description` | `string`         | Description displayed on the progress bar.               |
| `time`        | `number`         | Duration of the progress bar in seconds.                 |
| `data`        | `IUsingItemData` | Data about the item being used, animations, and objects. |
| `onFinish`    | `() => void`     | Callback executed when the progress bar completes.       |

#### **Methods**

##### **new**

Initializes and displays the progress bar.

```typescript
new(
    player: PlayerMp,
    description: string,
    time: number,
    data: IUsingItemData,
    onFinish: () => void
): void;
```

**Example**

```typescript
const item = player.inventory.getItemByUUID(123456);

const progressBar = new InteractProgressBar(
    player,
    "Using a health potion...",
    3,
    {
        item: item,
        animDict: "mp_player_inteat@burger",
        animName: "mp_player_int_eat_burger",
        flag: 49
    },
    () => {
        console.log("Item used successfully!");
    }
);
```

##### **onCancel**

Cancels the progress bar and resets the player's state.

```typescript
onCancel(player: PlayerMp): void;
```

**Example**

```typescript
progressBar.onCancel(player);
console.log("Progress bar canceled.");
```

---

## Inventory Class Documentation

### **Class: Inventory**

The `Inventory` class manages a player's inventory, including items, clothing, quick-use slots, and weight limits. It also provides utilities to manage items during gameplay.

#### **Creating a player inventory**
```typescript
import { InventoryItemsEntity } from "@entities/Inventory.entity";
import { inventorydataPresset } from "@modules/inventory/Assets.module";
import { Inventory } from "@modules/inventory/Core.class";

//Prior to initializing a player-inventory, you must make sure the player has a character and has successfully logged into the server.
//A default item preset has been made to make your job easier to initialize a fresh inventory for the player.
const player = mp.players.at(0); //find a player
const characterData = player.character;

//Usually here you would do a check whether the player has a character or not since player.character is either a character class or null.
if (!characterData) return; //if there's no character assigned to the player then you should return here, otherwise errors might occurr.

const inv = inventorydataPresset; //Inventory data preset
characterData.inventory = new Inventory(player, inv.clothes, inv.pockets, inv.quickUse);

//Here we create the necessary data to insert into the inventory table in the database.
const inventoryItems = new InventoryItemsEntity();
inventoryItems.clothes = characterData.inventory.items.clothes;
inventoryItems.pockets = characterData.inventory.items.pockets;
inventoryItems.quickUse = characterData.inventory.quickUse;
inventoryItems.character = characterData;
characterData.items = inventoryItems;
```



#### **Methods**

##### **addItem**

Adds an item to the inventory.

```typescript
const player = mp.players.at(0);
if (!player || !mp.players.exists(player) || !player.character) return;
player.character.inventory.addItem(type: RageShared.Inventory.Enums.ITEM_TYPES): RageShared.Inventory.Interfaces.IBaseItem | null;
```

**Example**

```typescript
const player = mp.players.at(0);
if (!player || !mp.players.exists(player) || !player.character || !player.character.inventory) return;

const addedItem = player.character.inventory.addItem(RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_DAGGER);
if (addedItem) {
    console.log(`Item added: ${addedItem.name}`);
} else {
    console.log("No available slot for the item.");
}
```

##### **getItemsInCategoryByType**

Retrieves items in a specific category by their type.

```typescript
getItemsInCategoryByType(
    category: RageShared.Inventory.Enums.INVENTORY_CATEGORIES[],
    type: RageShared.Inventory.Enums.ITEM_TYPES
): RageShared.Inventory.Interfaces.IBaseItem[];
```

**Example**

```typescript
const pistols = inventory.getItemsInCategoryByType(
    [RageShared.Inventory.Enums.INVENTORY_CATEGORIES.POCKETS],
    RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PISTOL
);
console.log(`Found ${pistols.length} pistols in inventory.`);
```

##### **getItemByUUID**

Retrieves an item by its unique identifier.

```typescript
getItemByUUID(hashKey: string): RageShared.Inventory.Interfaces.IBaseItem | null;
```

**Example**

```typescript
const item = inventory.getItemByUUID("abc123");
if (item) {
    console.log(`Item found: ${item.name}`);
} else {
    console.log("Item not found.");
}
```

##### **startUsingItem**

Starts using an item with a progress bar.

```typescript
startUsingItem(
    player: PlayerMp,
    description: string,
    time: number,
    data: IUsingItemData,
    handler: () => void
): void;
```

**Example**

```typescript
inventory.startUsingItem(
    player,
    "Repairing vehicle...",
    5,
    {
        item: { name: "Repair Kit", image: "repair_kit.png", hash: "repair123" },
        animDict: "mini@repair",
        animName: "fixing_a_player",
        flag: 49,
        attachObject: "toolbox"
    },
    () => {
        console.log("Vehicle repaired successfully!");
    }
);
```

---

## Using an Item with Progress Bar

### **Example**

```typescript
if (!player.character || !player.character.inventory) return;

const items = player.character.inventory.getItemsInCategoryByType(
    [RageShared.Inventory.Enums.INVENTORY_CATEGORIES.POCKETS],
    RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PISTOL
);
if (!items.length) return;

player.character.inventory.startUsingItem(
    player,
    "Press ESC to cancel this action",
    5,
    {
        item: items[0],
        animDict: "mini@repair",
        animName: "fixing_a_player",
        flag: 16,
        attachObject: "item_toolbox"
    },
    async () => {
        console.log("Hello world!");
    }
);
```

### **Explanation**

1. **Retrieve Item:**

   - The example fetches the first available item of type `ITEM_TYPE_PISTOL` from the player's inventory.

2. **Initialize Progress Bar:**

   - The `startUsingItem` method is called with parameters like description, duration, and animation data.

3. **Animation and Object:**

   - The player performs the animation `fixing_a_player` from `mini@repair`, and an object (`item_toolbox`) is attached during the process.

4. **Completion Callback:**

   - Upon completion, the callback logs "Hello world!" to the console, where other actions (e.g., item consumption, state changes) can be added.

---

## Interfaces

### **IUsingItemData**

Data structure for item usage.

```typescript
interface IUsingItemData {
    item: RageShared.Inventory.Interfaces.IBaseItem;
    animDict?: string;
    animName?: string;
    flag?: number;
    attachObject?: string;
}
```

**Fields**:

| Field          | Type        | Description                                      |
| -------------- | ----------- | ------------------------------------------------ |
| `item`         | `IBaseItem` | The item being used.                             |
| `animDict`     | `string`    | Animation dictionary for the progress bar.       |
| `animName`     | `string`    | Animation name for the progress bar.             |
| `flag`         | `number`    | Animation flag (e.g., looping, synchronization). |
| `attachObject` | `string`    | Object to attach during the animation.           |

---

This documentation provides a comprehensive guide to the **Inventory System** and **Progress Bar** in your application. Let me know if you need additional details or examples!



...to be continued.