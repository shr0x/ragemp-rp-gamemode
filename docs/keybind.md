# PlayerKeybind Class Guide

The `PlayerKeybind` class is designed to manage in game player keybinds. It provides methods for adding, removing, updating, and retrieving keybinds, allowing for easy management of user input actions.

## Getting Started

To use the `PlayerKeybind` class, follow these steps:

1. **Import the Class:**

    ```typescript
    import { PlayerKeybind } from './PlayerKeybind';
    ```

2. **Add Keybinds:**

    Use the `addKeybind` method to add keybinds to your application. This method takes four parameters:

    - `keyCode`: The key code of the keybind.
    - `up`: A boolean indicating whether the keybind is for the key up event.
    - `action`: The action to be performed when the keybind is triggered. This can be either a synchronous function (`KeyAction`) or an asynchronous function (`KeyActionAsync`).
    - `description`: A description of the keybind.

    Example:
    ```typescript
    PlayerKeybind.addKeybind(32, true, () => console.log('Space key released'), 'Release Space key');
    ```

3. **Remove Keybinds:**

    Use the `removeKeybind` method to remove existing keybinds. This method takes two parameters:

    - `keyCode`: The key code of the keybind to be removed.
    - `up`: A boolean indicating whether the keybind is for the key up event.

    Example:
    ```typescript
    PlayerKeybind.removeKeybind(32, true);
    ```

4. **Update Keybinds:**

    Use the `updateKeybind` method to update existing keybinds with new actions or descriptions. This method takes four parameters:

    - `keyCode`: The key code of the keybind to be updated.
    - `up`: A boolean indicating whether the keybind is for the key up event.
    - `newAction`: The new action to be performed when the keybind is triggered.
    - `newDescription`: The new description of the keybind.

    Example:
    ```typescript
    PlayerKeybind.updateKeybind(32, true, () => console.log('New action for Space key'), 'New action description');
    ```

5. **Retrieve Keybind Description:**

    Use the `getKeybindDescription` method to retrieve the description of a keybind. This method takes two parameters:

    - `keyCode`: The key code of the keybind.
    - `up`: A boolean indicating whether the keybind is for the key up event.

    Example:
    ```typescript
    const description = PlayerKeybind.getKeybindDescription(32, true);
    ```

6. **Retrieve All Keybinds:**

    Use the `getAllKeybinds` method to retrieve all keybinds as a map. This method returns a map containing all keybinds.

    Example:
    ```typescript
    const allKeybinds = PlayerKeybind.getAllKeybinds();
    ```

## Example Usage

```typescript
import { PlayerKeybind } from './PlayerKeybind';

// Adding a keybind
PlayerKeybind.addKeybind(32, true, () => console.log('Space key released'), 'Release Space key');

// Removing a keybind
PlayerKeybind.removeKeybind(32, true);

// Updating a keybind
PlayerKeybind.updateKeybind(32, true, () => console.log('New action for Space key'), 'New action description');

// Retrieving keybind description
const description = PlayerKeybind.getKeybindDescription(32, true);

// Retrieving all keybinds
const allKeybinds = PlayerKeybind.getAllKeybinds();
```
