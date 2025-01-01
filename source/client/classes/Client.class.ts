import * as maleClothes from "@shared/json/maleTorso.json";
import * as femaleClothes from "@shared/json/femaleTorso.json";
import { PlayerHud } from "./Hud.class";
import { Utils } from "@shared/Utils.module";
type IClothesData = Record<number, Record<number, { BestTorsoDrawable: number; BestTorsoTexture: number }>>;

const torsoDataMale: IClothesData = maleClothes;
const femaleTorsos: IClothesData = femaleClothes;
/**
 * Represents the client-side functionality for managing player actions and interactions.
 */
class _Client {
    /**
     * Array of keys that are currently disabled.
     */
    disabledKeys: number[] = [];

    /**
     * Event handler for the tick event.
     */
    onTickEvent: EventMp | null = null;

    /**
     * Player HUD instance.
     */
    readonly hud: PlayerHud;

    /**
     * Whether a player can accept death or not
     */
    public canAcceptDeath: boolean = false;

    /**
     * An interval to re-apply death animation in case its canceled
     */
    public deathAnimInterval: NodeJS.Timeout | null = null;

    /**
     * Constructs a new Client instance.
     */
    constructor() {
        this.onTickEvent = new mp.Event("render", this.onTick.bind(this));
        this.hud = new PlayerHud();
    }

    /**
     * Returns whether a player is death state or not.
     */
    public get isDead(): boolean {
        return mp.players.local.getVariable("isDead") ?? false
    }

    /**
     * Disables a key for a specific player action.
     * @param {boolean} isMoveOrLookUp - Indicates if the key is related to movement or looking up.
     * @param {number} key - The key code to disable.
     */
    public disableKey(isMoveOrLookUp: boolean, key: number) {
        this.disabledKeys.push(key);
        mp.game.controls.setDisableControlActionBatch(isMoveOrLookUp, this.disabledKeys);
    }
    /**
     * Event handler for the tick event.
     */
    private onTick() {
        mp.game.controls.applyDisableControlActionBatch();
    }
    /**
     * Requests a model to be loaded asynchronously.
     * @param {number} modelHash - The hash of the model to load.
     * @param {number} [timeoutMs=1000] - Optional timeout in milliseconds. Default is 1000ms.
     * @returns {Promise<boolean>} - A promise resolving to true if the model is loaded successfully, false otherwise.
     */
    public async requestModel(modelHash: number, timeoutMs: number = 1000): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!mp.game.streaming.isModelValid(modelHash)) {
                reject(new Error(`Model does not exist: ${modelHash}`));
                return;
            }

            if (mp.game.streaming.hasModelLoaded(modelHash)) {
                resolve(true);
                return;
            }
            mp.game.streaming.requestModel(modelHash);
            const deadline = new Date().getTime() + timeoutMs;

            const inter = setInterval(() => {
                if (mp.game.streaming.hasModelLoaded(modelHash)) {
                    clearInterval(inter);
                    resolve(true);
                } else if (deadline < new Date().getTime()) {
                    clearInterval(inter);
                    const error = `Error: Async loading failed for model: ${modelHash}`;
                    mp.console.logError(error);
                    reject(new Error(error)); // probably better resolve(false)
                }
            }, 10);
        });
    }
    /**
     * Requests an animation dictionary to be loaded asynchronously.
     * @param {string} dict - The name of the animation dictionary to load.
     * @param {number} [timeoutMs=1000] - Optional timeout in milliseconds. Default is 1000ms.
     * @returns {Promise<boolean>} - A promise resolving to true if the animation dictionary is loaded successfully, false otherwise.
     */
    public async requestAnimDict(dict: string, timeoutMs: number = 1000): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (!mp.players.exists(mp.players.local)) {
                alert("invalid player");
                reject("invalid player");
            }

            if (mp.game.streaming.hasAnimDictLoaded(dict)) {
                resolve(true);
                return;
            }
            mp.game.streaming.requestAnimDict(dict);
            const deadline = new Date().getTime() + timeoutMs;

            const inter = setInterval(() => {
                if (mp.game.streaming.hasAnimDictLoaded(dict)) {
                    clearInterval(inter);
                    resolve(true);
                } else if (deadline < new Date().getTime()) {
                    clearInterval(inter);
                    const error = `Error: Async loading failed for anim dict: ${dict}`;
                    alert(error);
                    reject(error);
                }
            }, 10);
        });
    }
    /**
     * Plays an animation.
     * @param {string} animDict - The animation dictionary containing the animation.
     * @param {string} animName - The name of the animation.
     * @param {number} flag - The animation flag.
     * @returns {Promise<void>} - A promise that resolves when the animation is played.
     */
    async playAnimationEx(animDict: string, animName: string, flag: number): Promise<void> {
        if (mp.players.local.isInAnyVehicle(false)) return;
        await this.requestAnimDict(animDict);
        mp.players.local.taskPlayAnim(animDict, animName, 8, -8, -1, flag, 0.0, false, false, false);
    }
    /**
     * Sets the clothing of the player character.
     * @param {number} component - The clothing component ID.
     * @param {number} drawable - The drawable ID.
     * @param {number} texture - The texture ID.
     */
    public setClothes(component: number, drawable: number, texture: number): void {
        if (component === 11) {
            const modelHash = mp.players.local.model;
            const torsoData = modelHash === mp.game.joaat("mp_m_freemode_01") ? torsoDataMale : femaleTorsos;
            const torso = torsoData[drawable]?.[texture];
            if (torso && torso.BestTorsoDrawable !== -1) {
                mp.players.local.setComponentVariation(3, torso.BestTorsoDrawable, torso.BestTorsoTexture, 2);
            }
        }
        mp.players.local.setComponentVariation(component, drawable, texture, 2);
    }

    public deathAnimChecker(enable: boolean) {
        if (enable) {
            if (this.deathAnimInterval) {
                clearInterval(this.deathAnimInterval);
            }

            this.deathAnimInterval = setInterval(() => {
                if (mp.players.local.isFalling() || !mp.players.local.getVariable("deathAnim") || mp.players.local.isRagdoll()) return;

                const { dict, anim } = mp.players.local.getVariable("deathAnim");
                if (!mp.players.local.isPlayingAnim(dict, anim, 1)) {
                    mp.players.local.taskPlayAnim(dict, anim, 2.0, 0, -1, 9, 0, false, false, false);
                }
            }, 300);
            return;
        }
        if (this.deathAnimInterval) {
            clearInterval(this.deathAnimInterval);
            this.deathAnimInterval = null;
        }
        mp.players.local.clearTasks();
    }

    /**
     * Gets frametime (FPS) from a player.
     */
    public getFrameTime() {
        const frame = mp.game.misc.getFrameTime().toString(16);
        return Utils.parseHexAsFloat(frame);
    }

    /**
     * Draws 3D text at a specified position in the game world.
     *
     * @param {string} caption - The text to display.
     * @param {number} x - The X coordinate in the game world.
     * @param {number} y - The Y coordinate in the game world.
     * @param {number} z - The Z coordinate in the game world.
     * @param {number} [scale=0.3] - The scale of the text. Default is 0.3.
     * @param {Array4d} [color=[255, 255, 255, 255]] - An optional array representing the RGBA color of the text. Default is white with full opacity.
     */
    public drawText3D(caption: string, x: number, y: number, z: number, scale = 0.3, color?: Array4d) {
        let getcolor = color || [255, 255, 255, 255];
        mp.game.graphics.setDrawOrigin(x, y, z + 0.5, 0);
        mp.game.ui.setTextFont(0);
        mp.game.ui.setTextScale(scale, scale);
        mp.game.ui.setTextColour(getcolor[0], getcolor[1], getcolor[2], getcolor[3]);
        mp.game.ui.setTextProportional(true);
        mp.game.ui.setTextDropshadow(0, 0, 0, 0, 255);
        mp.game.ui.setTextEdge(2, 0, 0, 0, 150);
        mp.game.invoke("0x2513DFB0FB8400FE");
        mp.game.ui.setTextEntry("STRING");
        mp.game.ui.setTextCentre(true);
        mp.game.ui.addTextComponentSubstringPlayerName(caption);
        mp.game.ui.drawText(0, 0, 0);
        mp.game.invoke("0xFF0B610F6BE0D7AF");
    }
}

export const Client = new _Client();
