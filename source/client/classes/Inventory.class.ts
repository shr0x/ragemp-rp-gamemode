import { Utils } from "@shared/Utils.module";
import { Browser } from "./Browser.class";
import { ChatAPI } from "./Chat.class";

/**
 * Class responsible for managing the player's inventory.
 */
class _PlayerInventory {
    screenPedHandle: Handle;

    isOpen: boolean = false;
    onTick: NodeJS.Timeout | null = null;

    constructor() {
        this.screenPedHandle = 0;

        // temporary keybinds (subject to change)
        // Bind keys for inventory actions
        mp.keys.bind(27, false, this.close.bind(this)); // ESC to close inventory

        // Event bindings
        mp.events.add("client::mainMenu:openInventory", this.open.bind(this));
        mp.events.add("server::mainMenu:closeInventory", this.close.bind(this));
        mp.events.add("client:inventory:updatePedComponent", this.setPedComponentVariation.bind(this));
        mp.events.add("client:inventory:updatePedProp", this.setPedProps.bind(this));
        mp.events.add("client::inventory:deletePedScreen", this.deletePedScreen.bind(this));
        mp.events.add("playerWeaponShot", this.playerWeaponShot.bind(this));
        mp.events.add("playerQuit", this.playerQuit.bind(this));
    }

    public playerWeaponShot(_targetEntity: EntityMp) {
        if (mp.players.local.getVariable("loggedin")) {
            if (mp.players.local.getVariable("ammoHash")) {
                mp.events.callRemote("server::player:weaponShot");
            }
        }
    }

    /**
     * Updates nearby players.
     */
    public updateNearbyPlayers() {}

    /**
     * Checks players around the player.
     *
     * @param bool - Whether to check players around or not.
     */
    public checkPlayersAround(bool: boolean) {}

    /**
     * Creates a ped screen.
     */
    public async createPedScreen() {
        try {
            mp.game.ui.setPauseMenuActive(false);
            mp.game.ui.setFrontendActive(false);
            mp.game.ui.activateFrontendMenu(mp.game.gameplay.getHashKey("FE_MENU_VERSION_EMPTY_NO_BACKGROUND"), false, -1);

            let playerPed = mp.peds.new(
                mp.players.local.model,
                new mp.Vector3(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z - 10),
                0,
                mp.players.local.dimension
            );

            setInterval(() => {
                mp.game.invoke("0x2162C446DFDF38FD", true);
            }, 0);

            while (playerPed.handle === 0) {
                await mp.game.waitAsync(15);
            }

            playerPed.setInvincible(true);
            playerPed.setCollision(false, false);
            mp.players.local.cloneToTarget(playerPed.handle);
            mp.game.entity.setVisible(playerPed.handle, false, false);
            this.screenPedHandle = playerPed.handle;

            mp.game.ped.setCapsule(this.screenPedHandle, 0.001);
            mp.game.wait(100);
            mp.game.hud.givePedToPauseMenu(this.screenPedHandle, 1);
            mp.game.hud.setPauseMenuPedLighting(true);
            mp.game.hud.setPauseMenuPedSleepState(true);

            mp.game.hud.replaceColourWithRgba(117, 0, 0, 0, 0);
            mp.game.invoke("0x98215325A695E78A", false);
        } catch (e: unknown) {
            if (e instanceof TypeError) mp.console.logWarning(`${JSON.stringify(e.message)}`);
        }
    }

    /**
     * Deletes the ped screen.
     */
    public deletePedScreen() {
        mp.game.invoke("0xF314CF4F0211894E", 117, 0, 0, 0, 186); // REPLACE_HUD_COLOUR_WITH_RGBA
        mp.game.hud.clearPedInPauseMenu();
        mp.game.ui.setPauseMenuActive(false);
        mp.game.ui.setFrontendActive(false);
        mp.game.invoke("0x98215325A695E78A", true);

        let findPed = mp.peds.atHandle(this.screenPedHandle);
        if (findPed && mp.peds.exists(findPed)) {
            findPed.destroy();
        }

        this.screenPedHandle = 0;
    }

    /**
     * Sets ped properties.
     *
     * @param propid - The property ID.
     * @param drawableid - The drawable ID.
     * @param textureid - The texture ID.
     */
    public setPedProps(propid: number, drawableid: number, textureid: number) {
        try {
            if (this.screenPedHandle === null) return;
            mp.game.invoke("0x93376B65A266EB5F", this.screenPedHandle, propid, drawableid, textureid, true);
        } catch (e: unknown) {
            if (e instanceof TypeError) mp.console.logWarning(`setPedProps || ${JSON.stringify(e.message)}`);
        }
    }

    /**
     * Sets ped component variation.
     *
     * @param componentId - The component ID.
     * @param drawableId - The drawable ID.
     * @param textureId - The texture ID.
     * @param paletteId - The palette ID.
     */
    public setPedComponentVariation(componentId: number, drawableId: number, textureId: number, paletteId: number) {
        try {
            if (this.screenPedHandle === null) return;
            mp.game.invoke("0x262B14F48D29DE80", this.screenPedHandle, componentId, drawableId, textureId, paletteId);
        } catch (e: unknown) {
            if (e instanceof TypeError) mp.console.logWarning(`setPedComponentVariation || ${JSON.stringify(e.message)}`);
        }
    }

    /**
     * Toggles the fast slot.
     *
     * @param slotNumber - The slot number to toggle.
     */
    toggleFastSlot(slotNumber: number): void {
        if (mp.game.ui.isPauseMenuActive() || Browser.currentPage) return;
        if (mp.game.ped.getVehicleIsEntering(mp.players.local.handle)) return;
        mp.events.callRemote("server::inventory:quickUse", `k_fastslot${slotNumber}`);
    }

    /**
     * Opens the inventory.
     */
    public async open() {
        try {
            if (ChatAPI.chatOpen) return;

            if (this.isOpen) return this.close();

            this.isOpen = !this.isOpen;
            await this.createPedScreen();

            Browser.mainUI.active = true;
            Browser.processEvent("cef::inventory:setVisible", true);
            Browser.startPage("inventory");
            mp.events.callRemote("server::player:loadInventory");
            this.checkPlayersAround(true);
        } catch (e: unknown) {
            if (e instanceof TypeError) mp.console.logWarning(`OpenInventory:: >> ${e.message}`);
        }
    }

    /**
     * Closes the inventory.
     */
    public close() {
        if (!this.isOpen) return;
        this.isOpen = !this.isOpen;

        Browser.processEvent("cef::inventory:setVisible", false);
        Browser.closePage();
        this.deletePedScreen();
        mp.game.graphics.transitionFromBlurred(1);
        mp.events.callRemote("server:inventory:close");
        this.checkPlayersAround(false);
        return;
    }

    /**
     * Gives a weapon to the player.
     *
     * @param weapon - The weapon ID.
     * @param totalAmmo - The total amount of ammo.
     * @param ammoInClip - The amount of ammo in the clip (optional).
     */
    public async giveWeapon(weapon: number, totalAmmo: number, ammoInClip?: number) {
        if (ammoInClip) {
            mp.players.local.giveWeapon(weapon, totalAmmo, true);
            mp.game.invoke("0xBF0FD6E56C964FCB", mp.players.local.handle, weapon, totalAmmo, false, true);
            mp.game.weapon.setPedAmmo(mp.players.local.handle, mp.players.local.weapon, totalAmmo, false);
            await Utils.sleep(250).then(() => {
                mp.game.weapon.setPedAmmo(mp.players.local.handle, mp.players.local.weapon, totalAmmo, false);
                mp.players.local.setAmmoInClip(mp.players.local.weapon, ammoInClip);
            });
        } else {
            mp.players.local.giveWeapon(weapon, totalAmmo, true);
        }
    }

    /**
     * Reloads the player's weapons.
     */
    public reloadWeapons() {}

    /**
     * Handles player quit event.
     *
     * @param player - The player who quit.
     */
    public playerQuit(player: PlayerMp) {
        if (player === mp.players.local) this.deletePedScreen();
    }
}

export const Inventory = new _PlayerInventory();
