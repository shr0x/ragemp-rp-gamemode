class _Vehicle {
    constructor() {
        // Bind event handlers
        mp.events.add("entityStreamIn", this.syncValues.bind(this));
        mp.events.add("client::vehicle:setWindowStatus", this.setWindowState.bind(this));
        mp.events.add("client::vehicle:setWheelStatus", this.setWheelState.bind(this));
        mp.events.add("client::vehicle:setDirtLevel", this.setDirtLevel.bind(this));

        mp.events.add("client::vehicle:setTrunkState", this.changeTrunkState.bind(this));
        mp.events.add("client::vehicle:setHoodState", this.changeHoodState.bind(this));
    }

    /**
     * Used to check if the vehicle exists or its handle is valid.
     * @param vehicle the vehicle to check.
     * @returns boolean - true if the vehicle exists, false otherwise.
     */
    public doesExist(vehicle: VehicleMp) {
        return mp.vehicles.exists(vehicle) && vehicle.handle > 0;
    }

    /**
     * Used to set vehicle window index state.
     * @param vehicle_id the vehicle id to set the window index state.
     * @param windowIndex the index of the window.
     * @param state the state of the window.
     */
    public setWindowState(vehicle_id: number, windowIndex: number, state: boolean) {
        const vehicle = mp.vehicles.atRemoteId(vehicle_id);
        if (this.doesExist(vehicle)) {
            state === true ? vehicle.rollDownWindow(windowIndex) : vehicle.rollUpWindow(windowIndex), vehicle.fixWindow(windowIndex);
        }
    }
    /**
     * Sets the state of a vehicle's wheel.
     * @param {number} vehicle_id - The ID of the vehicle.
     * @param {number} wheelIndex - The index of the wheel.
     * @param {boolean} state - The state of the wheel (true for burst, false for fixed).
     */
    public setWheelState(vehicle_id: number, wheelIndex: number, state: boolean) {
        const vehicle = mp.vehicles.at(vehicle_id);
        if (this.doesExist(vehicle)) {
            switch (wheelIndex) {
                case 9:
                    state === true ? vehicle.setTyreBurst(45, false, 1000) : vehicle.setTyreFixed(45);
                    break;
                case 10:
                    state === true ? vehicle.setTyreBurst(47, false, 1000) : vehicle.setTyreFixed(47);
                    break;
                default:
                    state === true ? vehicle.setTyreBurst(wheelIndex, false, 1000) : vehicle.setTyreFixed(wheelIndex);
                    break;
            }
        }
    }

    /**
     * Sets the dirt level of a vehicle.
     * @param {number} vehicle_id - The ID of the vehicle.
     * @param {number} level - The dirt level to set.
     */
    public setDirtLevel(vehicle_id: number, level: number) {
        const vehicle = mp.vehicles.atRemoteId(vehicle_id);
        if (!this.doesExist(vehicle)) return;

        vehicle.setDirtLevel(level);
    }

    /**
     * Determines if the entity class is a plane or helicopter.
     * @param {number} entityClass - The class of the entity.
     * @returns {boolean} - True if the entity is a plane or helicopter, false otherwise.
     */
    public isPlaneOrHeli(entityClass: number): boolean {
        if (entityClass === 15 || entityClass === 16) return true;
        return false;
    }

    /**
     * Synchronizes various vehicle values.
     * @param {VehicleMp} vehicle - The vehicle to synchronize.
     */
    public syncValues(vehicle: VehicleMp) {
        if ((vehicle as EntityMp).type !== "vehicle" || !this.doesExist(vehicle)) return;
        if (this.isPlaneOrHeli(vehicle.getClass())) return;

        const windows = vehicle.getVariable("windows"),
            frozen = vehicle.getVariable("frozen"),
            trunkState = vehicle.getVariable("trunkState"),
            hoodState = vehicle.getVariable("hoodState"),
            smokeColor = vehicle.getVariable("smokecolor"),
            interiorColor = vehicle.getVariable("interiorcolor"),
            dashboardColor = vehicle.getVariable("dashboardcolor"),
            primaryColorType = vehicle.getVariable("primaryColorType"),
            secondaryColorType = vehicle.getVariable("secondaryColorType"),
            engineState = vehicle.getVariable("engine");

        mp.console.logWarning(
            `[::vehicleStreamIn]-> Vehicle Stream In\n[::vehicleStreamIn]-> Streamed vehicle id ${vehicle.remoteId}\n==========================[DATA==========================\n[::states]-> Engine: ${engineState} | Trunk: ${trunkState} | Hood: ${hoodState} | Frozen: ${frozen}\n[::colors]-> Smoke: ${smokeColor} | Interior: ${interiorColor} | Dashboard ${dashboardColor}\n[::colortype]-> Primary: ${primaryColorType} | Secondary: ${secondaryColorType}\n `
        );
        mp.console.logWarning(``);

        if (typeof frozen !== "undefined") vehicle.freezePosition(frozen);

        if (windows) {
            for (const [key, val] of Object.entries(windows)) {
                val === true ? vehicle.rollDownWindow(parseInt(key)) : vehicle.rollUpWindow(parseInt(key));
            }
        }

        if (!this.isPlaneOrHeli(vehicle.getClass()) && vehicle.getClass() !== 14 && vehicle.model !== mp.game.joaat("rhino")) {
            if (smokeColor) {
                vehicle.toggleMod(20, smokeColor.r !== 255 || smokeColor.g !== 255 || smokeColor.b !== 255);
                vehicle.setTyreSmokeColor(smokeColor.r, smokeColor.g, smokeColor.b);
            }
            if (interiorColor) mp.game.vehicle.setInteriorColor(vehicle.handle, interiorColor);

            if (dashboardColor) mp.game.vehicle.setDashboardColor(vehicle.handle, dashboardColor);

            trunkState ? vehicle.setDoorOpen(5, false, false) : vehicle.setDoorShut(5, false);
            hoodState ? vehicle.setDoorOpen(4, false, false) : vehicle.setDoorShut(4, false);
        }

        if (primaryColorType) {
            vehicle.setModColor1(primaryColorType, 0, 0);
        }
        if (secondaryColorType) {
            vehicle.setModColor2(secondaryColorType, 0);
        }

        if (typeof engineState === "boolean") {
            vehicle.setEngineOn(engineState, engineState, engineState);
        }

        if (!this.isPlaneOrHeli(vehicle.getClass()) && ![22, 11, 20].includes(vehicle.getClass()) && ![mp.game.joaat("polmav"), mp.game.joaat("rhino")].includes(vehicle.model)) {
            for (let i = 0; i < 10; i++) {
                vehicle.setExtra(i, 1);
            }
        }
    }

    private changeTrunkState(vehicleId: number, state: boolean) {
        const vehicle = mp.vehicles.atRemoteId(vehicleId);
        if (!this.doesExist(vehicle)) return;
        state ? vehicle.setDoorOpen(5, false, false) : vehicle.setDoorShut(5, false);
    }
    private changeHoodState(vehicleId: number, state: boolean) {
        const vehicle = mp.vehicles.atRemoteId(vehicleId);
        if (!this.doesExist(vehicle)) return;

        state ? vehicle.setDoorOpen(4, false, false) : vehicle.setDoorShut(4, false);
    }
}

export const Vehicle = new _Vehicle();
