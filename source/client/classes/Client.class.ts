import * as maleClothes from "@json/maleTorso.json";
import * as femaleClothes from "@json/femaleTorso.json";
import { PlayerHud } from "./Hud.class";
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
     * Whether player is crawling or not
     */
    crawling: boolean = false;

    /**
     * Crawling animation
     */
    crawlingAnimation: string | null = null;

    /**
     * Crawling timeout
     */
    crawlingTimeout: NodeJS.Timeout | null = null;

    /**
     * Crawling interval
     */
    crawlingInterval: NodeJS.Timeout | null = null;

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
                reject(alert("invalid player"));
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
                    reject(alert(error));
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
     * Toggles the crawling state for the player.
     * If currently crawling, it stops the crawling process and clears the interval.
     * If not currently crawling, it starts the crawling process and sets the interval.
     * @private
     */
    private toggleCrawling() {
        if (this.crawling) {
            Client.crawling = false;
            if (this.crawlingInterval !== null) clearInterval(this.crawlingInterval);
            mp.players.local.clearTasks();
        } else {
            this.crawlingInterval = setInterval(this.processCrawlingControls.bind(this), 0);
            Client.crawling = true;
            mp.game.streaming.requestAnimDict("move_crawlprone2crawlfront");
            mp.players.local.taskPlayAnim("move_crawlprone2crawlfront", "front", 8.0, 1000, -1, 2, 0, false, false, false);
        }
    }

    /**
     * Processes the crawling controls for the player.
     * Disables movement controls and handles the crawling animations based on user input.
     * @private
     */
    private processCrawlingControls() {
        const dict = "move_crawl";
        const rotation = mp.players.local.getRotation(2);
        const controls = mp.game.controls;

        controls.disableControlAction(0, 32, true); // Disable move forward
        controls.disableControlAction(0, 33, true); // Disable move backward
        controls.disableControlAction(0, 34, true); // Disable move left
        controls.disableControlAction(0, 35, true); // Disable move right

        if (controls.isDisabledControlPressed(0, 34)) {
            mp.players.local.setRotation(rotation.x, rotation.y, rotation.z + 0.5, 2, true);
        }

        if (controls.isDisabledControlPressed(0, 35)) {
            mp.players.local.setRotation(rotation.x, rotation.y, rotation.z - 0.5, 2, true);
        }

        const processcrawlingAnimationation = (anim: string) => {
            if (this.crawlingAnimation === anim || this.crawlingTimeout) return;

            this.crawlingAnimation = anim;
            const timer = mp.game.entity.getEntityAnimDuration(dict, anim);
            mp.game.streaming.requestAnimDict(dict);
            mp.players.local.taskPlayAnim(dict, anim, 8.0, 1000, -1, 2, 0, false, false, false);

            this.crawlingTimeout = setTimeout(() => {
                this.crawlingAnimation = null;
                this.crawlingTimeout = null;
            }, (timer - 0.1) * 1000);
        };

        if (controls.isDisabledControlPressed(0, 32)) {
            processcrawlingAnimationation("onfront_fwd");
        }

        if (controls.isDisabledControlPressed(0, 33)) {
            processcrawlingAnimationation("onfront_bwd");
        }
    }
}

export const Client = new _Client();
