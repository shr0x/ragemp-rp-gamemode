import { weaponList } from "../assets/Weapons.assets";
import { Browser } from "./Browser.class";

export class PlayerHud {
    onlinePlayersCounter: NodeJS.Timeout | null = null;
    weaponInterval: NodeJS.Timeout | null = null;
    zoneInterval: NodeJS.Timeout | null = null;

    constructor() {
        this.onlinePlayersCounter = setInterval(this.setOnlinePlayers.bind(this), 5_000);
        this.weaponInterval = setInterval(this.trackPlayerWeapon.bind(this), 100);
        this.zoneInterval = setInterval(this.trackPlayerZone.bind(this), 1_000);
        this.setPlayerData("id", mp.players.local.remoteId);

        mp.events.add("playerEnterVehicle", this.playerEnterVehicle.bind(this));
        mp.events.add("playerLeaveVehicle", this.playerExitVehicle.bind(this));
    }

    //#region PLAYER RELATED
    public trackPlayerZone() {
        const arename = mp.game.hud.getCurrentAreaNameString();
        const streetName = mp.game.hud.getCurrentStreetNameString();
        Browser.processEvent("cef::hud:setAreaData", { area: arename, street: streetName });
    }

    public trackPlayerWeapon() {
        if (!mp.players.local.getVariable("loggedin") || mp.players.local.isJumping()) return;

        /*
         * Tracks weapon data and sends them to CEF
         */
        const { handle, weapon } = mp.players.local;
        const weaponAmmo = mp.players.local.getAmmoInClip(weapon);
        const maxammo = mp.game.weapon.getAmmoInPed(handle, weapon) - weaponAmmo;
        const weaponName = weaponList[weapon];
        this.setPlayerData("weapondata", { weapon: weaponName, ammo: weaponAmmo, maxammo: maxammo });
    }

    /**
     * Sets how many players are online in HUD.
     * @returns void
     */
    public setOnlinePlayers() {
        if (!mp.players.local.getVariable("loggedin")) return;
        return Browser.processEvent("cef::player:setNowPlaying", mp.players.length);
    }
    /**
     * Changes a player-related HUD parameter (see IPlayerData)
     * @param key which data to change
     * @param value value to set to the data you're about to change
     * @returns void
     */
    public setPlayerData<K extends keyof RageShared.Players.Interfaces.IPlayerData>(key: K, value: RageShared.Players.Interfaces.IPlayerData[K]) {
        return Browser.processEvent("cef::player:setPlayerData", key, value);
    }
    //#endregion

    //#region VEHICLE RELATED

    public playerEnterVehicle(vehicle: VehicleMp, seat: number) {
        if (!mp.players.local.getVariable("loggedin")) return;
        if (seat !== -1) return;
        const vehicleClass = vehicle.getClass();
        if (vehicleClass === RageEnums.Vehicle.Classes.CYCLES) return;
        this.showVehicleSpeedometer(true);
    }
    public playerExitVehicle(vehicle: VehicleMp, seat: number) {
        if (!mp.players.local.getVariable("loggedin")) return;
        const vehicleClass = vehicle.getClass();
        if (vehicleClass === RageEnums.Vehicle.Classes.CYCLES) return;
        this.showVehicleSpeedometer(false);
    }

    /**
     * Show or hide vehicle speedometer for local player.
     * @param enable Whether to display or not vehicle speedometer
     * @returns void
     */
    public showVehicleSpeedometer(enable: boolean) {
        return Browser.processEvent("cef::hud:setVehicleData", { key: "isActive", data: enable });
    }

    /**
     * Update a value on vehicle's speedometer
     * @param data Which data to set eg: 'speed'
     * @param value The value to set to the data
     * @returns void;
     */
    public setSpeedometerData<K extends keyof RageShared.Vehicles.Interfaces.IVehicleData>(data: K, value: RageShared.Vehicles.Interfaces.IVehicleData[K]) {
        return Browser.processEvent("cef::hud:setVehicleData", { key: data, data: value });
    }
    //#endregion
}
