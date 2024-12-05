import { RageShared } from "@shared/index";
import { RAGERP } from "@api";

interface IUsingItemData {
    item: RageShared.Inventory.Interfaces.IBaseItem;
    animDict?: string;
    animName?: string;
    flag?: number;
    attachObject?: string;
}

/**
 * Represents a progress bar that appears when a player interacts with an item.
 */
export class InteractProgressBar {
    item: RageShared.Inventory.Interfaces.IBaseItem;
    animDict?: string | undefined;
    animName?: string | undefined;
    flag?: number | undefined;
    attachObject?: string | undefined;
    timeout: NodeJS.Timeout | null = null;

    /**
     * Creates an instance of InteractProgressBar.
     * @param {PlayerMp} player - The player interacting with the item.
     * @param {string} description - The description of the progress bar.
     * @param {number} time - The duration of the progress bar in seconds.
     * @param {IUsingItemData} data - The data related to the item being used.
     * @param {() => void} onFinish - Callback function to execute when the progress bar finishes.
     */
    constructor(player: PlayerMp, description: string, time: number, data: IUsingItemData, onFinish: () => void) {
        this.item = data.item;
        this.animDict = data.animDict;
        this.animName = data.animName;
        this.flag = data.flag;
        this.attachObject = data.attachObject;
        this.new(player, description, time, data, onFinish);
    }

    /**
     * Initializes and displays the progress bar for the player.
     * @param {PlayerMp} player - The player interacting with the item.
     * @param {string} description - The description of the progress bar.
     * @param {number} time - The duration of the progress bar in seconds.
     * @param {IUsingItemData} data - The data related to the item being used.
     * @param {() => void} onFinish - Callback function to execute when the progress bar finishes.
     */
    new(player: PlayerMp, description: string, time: number, data: IUsingItemData, onFinish: () => void): void {
        try {
            const buttonData: RageShared.Interfaces.IInteractButton = {
                button: "Esc",
                autoStart: true,
                time: time,
                count: -1,
                image: data.item.image.replace(".svg", ""),
                rarity: 1,
                header: data.item.name,
                description
            };

            RAGERP.cef.emit(player, "hud", "showInteractionButton", buttonData);

            player.setOwnVariable("usingItem", true);

            if (data.animDict && data.animName && typeof data.flag !== "undefined") {
                player.playAnimation(data.animDict, data.animName, 2.0, data.flag);
            }
            if (data.attachObject) {
                player.attachObject(data.attachObject, true);
            }

            this.timeout = setTimeout(() => {
                if (!mp.players.exists(player) || !player.character || !player.character.inventory) return;

                if (data.animDict && data.animName) {
                    player.stopAnimation();
                }
                if (data.attachObject) {
                    player.attachObject(data.attachObject, false);
                }

                player.call("client::control:disablePauseMenu", [false]);
                player.setOwnVariable("usingItem", false);

                if (!player.character.inventory.getItemByUUID(data.item.hash)) {
                    return;
                }
                onFinish();
                player.character.inventory.progressBar = null;
            }, time * 1000);
        } catch (err) {
            console.error("error at progressbar.new | ", err);
        }
    }

    /**
     * Cancels the progress bar and resets the player's state.
     * @param {PlayerMp} player - The player interacting with the item.
     */
    onCancel(player: PlayerMp): void {
        if (!mp.players.exists(player) || !player.character || !player.character.inventory) return;

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        if (this.animDict && this.animName) {
            player.stopAnimation();
        }
        if (this.attachObject) {
            player.attachObject(this.attachObject, false);
        }

        RAGERP.cef.emit(player, "hud", "showInteractionButton", null);
        player.setOwnVariable("usingItem", false);
        player.character.inventory.progressBar = null;
    }
}