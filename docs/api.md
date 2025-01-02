# RAGERP API Documentation

## Overview
The `RAGERP` namespace provides a comprehensive framework for managing entities, utilities, event handling, commands, and chat features in a structured application environment. This document outlines the components and usage of the `RAGERP` API.

---

## Namespace Structure
The `RAGERP` namespace is organized into the following sections:

- **`database`**: Main data source for the application.
- **`pools`**: Entity pools for vehicles and dynamic points.
- **`entities`**: Management systems for vehicles and dynamic points.
- **`utils`**: Utility functions.
- **`cef`**: Client Event Framework.
- **`commands`**: Command registry.
- **`chat`**: Chat-related methods.

---

### 1. Database

#### Description
The `database` property connects to the main data source of the application.

#### Access
```typescript
const db = RAGERP.database;
```

---

### 2. Pools

#### Description
The `pools` property contains entity pools for managing vehicles and dynamic points.

#### Access
```typescript
const vehiclePool = RAGERP.pools.vehicles;
const pointPool = RAGERP.pools.points;
```

---

### 3. Entities

#### 3.1 Dynamic Points

##### Description
Manage dynamic points in the system.

##### Properties
- **`pool`**: Access the dynamic point pool.
- **`new`**: Constructor for creating new dynamic points.

##### Usage
```typescript
const dynamicPoint = new RAGERP.entities.points.new(new mp.Vector3(0, 0,0), 2.0, 0, {
    enterHandler: (player) => {
        console.log("Player entered dynamic point");
    },
    exitHandler: (player) => {
        console.log("Player exited dynamic point");
    },
    onKeyPress: (player) => {
        console.log("Player pressed key in dynamic point");
    }
});
const allPoints = RAGERP.entities.points;
```

#### 3.2 Vehicles

##### Description
Manage vehicles in the system.

##### Properties
- **`pool`**: Access the vehicle pool.
- **`manager`**: Manage vehicle operations.
- **`new`**: Constructor for creating new vehicles.
- **`at`**: Get a vehicle by ID.
- **`atSQL`**: Get a vehicle by SQL ID.
- **`getNearest`**: Get the nearest vehicle.

##### Usage
```typescript
const vehicle = new RAGERP.entities.vehicles.new(RageShared.Vehicles.Enums.VEHICLETYPES.ADMIN, "police", new mp.Vector3(0, 0, 0), 0, 0);
const nearestVehicle = RAGERP.entities.vehicles.getNearest(playerPosition, range);
const vehicleById = RAGERP.entities.vehicles.at(vehicleId);
```

---

### 4. Utils

#### Description
A collection of utility functions.

#### Access
```typescript
const randomNumber = RAGERP.utils.getRandomFromArray([1, 2, 3, 4, 5);
```

---

### 5. Chromium Embedded Framework (CEF)

#### Description
Framework for handling CEF events from the server side.

#### Access
```typescript
//This event is triggered when the player clicks login on the login page.
RAGERP.cef.register("auth", "loginPlayer", async (player, data) => {
    const { username, password } = RAGERP.utils.parseObject(data);
});

```

---

### 6. Commands

#### Description
Registry for handling in-game commands.

#### Access
```typescript
//an example of adding a admin command to spawn a vehicle.
RAGERP.commands.add({
    name: "veh",
    aliases: ["vehicle", "spawnveh", "spawncar"],
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE,
    run: (player: PlayerMp, fullText: string, vehicleModel: string) => {
        if (!fullText.length || !vehicleModel.length) return RAGERP.chat.sendSyntaxError(player, "/veh [vehiclemodel]");

        const vehicle = new RAGERP.entities.vehicles.new(RageShared.Vehicles.Enums.VEHICLETYPES.ADMIN, vehicleModel, player.position, player.heading, player.dimension);
        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `Successfully spawned ${vehicleModel} (${vehicle.getId()})`);
        RAGERP.chat.sendAdminWarning(RageShared.Enums.HEXCOLORS.LIGHTRED, `AdmWarn: ${player.name} (${player.id}) has spawned a vehicle (Model: ${vehicleModel} | ID: ${vehicle.getId()}).`);
    }
});
```

---

### 7. Chat

#### Description
Provides methods for interacting with the in-game chat.

#### Access
```typescript
 RAGERP.chat;
```

---

## Example Usage

Here is an example of how to use the `RAGERP` namespace:

```typescript
import { RAGERP } from "@api";

// Access database
const db = RAGERP.database;

// Create a new vehicle
const vehicle = new RAGERP.entities.vehicles.new(RageShared.Vehicles.Enums.VEHICLETYPES.ADMIN, "police", new mp.Vector3(0, 0, 0), 0, 0);

//an example of adding a admin command to spawn a vehicle.
RAGERP.commands.add({
    name: "veh",
    aliases: ["vehicle", "spawnveh", "spawncar"],
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE,
    run: (player: PlayerMp, fullText: string, vehicleModel: string) => {
        if (!fullText.length || !vehicleModel.length) return RAGERP.chat.sendSyntaxError(player, "/veh [vehiclemodel]");

        const vehicle = new RAGERP.entities.vehicles.new(RageShared.Vehicles.Enums.VEHICLETYPES.ADMIN, vehicleModel, player.position, player.heading, player.dimension);
        player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `Successfully spawned ${vehicleModel} (${vehicle.getId()})`);
        RAGERP.chat.sendAdminWarning(RageShared.Enums.HEXCOLORS.LIGHTRED, `AdmWarn: ${player.name} (${player.id}) has spawned a vehicle (Model: ${vehicleModel} | ID: ${vehicle.getId()}).`);
    }
});
// Send a syntax error message
RAGERP.chat.sendSyntaxError(mp.players.at(0), "/veh [vehiclemodel]");

// Use a utility function
const randomnumber = RAGERP.utils.getRandomFromArray([1, 2, 3, 4, 5])
console.log(randomnumber);
```

---

## Conclusion
The `RAGERP` API is powerful for managing application entities, utilities, and features. By following the structured components above, you can efficiently integrate its functionality into your doings, you can of course always edit it or expand to your preferences.
