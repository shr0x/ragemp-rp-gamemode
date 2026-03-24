# NativeMenu Class Documentation

The `NativeMenu` class is a utility for managing native menu interfaces for players in a multiplayer server environment. It provides methods for creating, handling, and destroying interactive menus.

---

## Overview

### Purpose
The `NativeMenu` class represents a native menu for a player, enabling seamless interaction with menu-based UI elements.


---

## Constructor

### Syntax
```typescript
constructor(
    player: PlayerMp,
    id: number,
    header: string,
    desc: string,
    items: RageShared.Interfaces.INativeMenuItem[]
)
```

### Parameters
| Parameter  | Type                                      | Description                                |
|------------|-------------------------------------------|--------------------------------------------|
| `player`   | `PlayerMp`                                | The player who owns the menu.              |
| `id`       | `number`                                  | The unique identifier for the menu.        |
| `header`   | `string`                                  | The header title of the menu.              |
| `desc`     | `string`                                  | The description of the menu.               |
| `items`    | `RageShared.Interfaces.INativeMenuItem[]` | The items displayed in the menu.           |

### Example
```typescript
const menu = new NativeMenu(player, 1, "Main Menu", "Select an option", items);
```

---

## Properties

### `id: number`
The unique identifier for the menu.

### `header: string`
The header title of the menu.

### `desc: string`
The description of the menu.

### `player: PlayerMp`
The player who owns the menu.

### `items: RageShared.Interfaces.INativeMenuItem[]`
The items displayed in the menu.

---

## Methods

### `onItemSelected`
Handles the selection of an item in the menu.

#### Syntax
```typescript
onItemSelected(target: PlayerMp): Promise<StringifiedObject<{ id: number; listitem: number; name: string; uid: number }> | null>
```

#### Parameters
| Parameter  | Type       | Description                              |
|------------|------------|------------------------------------------|
| `target`   | `PlayerMp` | The player who selected the menu item.  |

#### Returns
A promise resolving with the selected item's data or `null` if the player is not valid.

#### Example
```typescript
menu.onItemSelected(player).then((data) => {
    if (!data) return;
    console.log(`Selected item: ${data.name}`);
});
```

---

### `destroy`
Destroys the menu and cleans up associated events.

#### Syntax
```typescript
destroy(player: PlayerMp): void
```

#### Parameters
| Parameter  | Type       | Description                               |
|------------|------------|-------------------------------------------|
| `player`   | `PlayerMp` | The player for whom the menu is destroyed. |

#### Example
```typescript
menu.destroy(player);
```

---

## Events

### `onSelectEvent`
Triggered when an item is selected.

### `onCheckboxEvent`
Triggered when a checkbox item is changed.

### `onSwitchEvent`
Triggered when a switch item is toggled.

---

## Usage Example

### Creating and Using a NativeMenu
```typescript
const items = [
    { uid: 0, type: RageShared.Enums.NATIVEMENU_TYPES.TYPE_DEFAULT, name: "Option 1" },
    { uid: 1, type: RageShared.Enums.NATIVEMENU_TYPES.TYPE_DEFAULT, name: "Option 2" }
];

const menu = new NativeMenu(player, 1, "Test Menu", "Choose an option", items);

menu.onItemSelected(player).then((data) => {
    if (!data) return;
    console.log(`Player selected: ${data.name}`);
    menu.destroy(player);
});
```

---

## Notes
- Ensure `CefEvent` is properly configured to handle native menu interactions.
- Use the `destroy` method to clean up menus after use to avoid memory leaks or unintended behavior.


