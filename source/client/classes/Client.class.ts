import * as maleClothes from "../json/maleTorso.json";
import * as femaleClothes from "../json/femaleTorso.json";
import { PlayerHud } from "./Hud.class";
type IClothesData = Record<number, Record<number, { BestTorsoDrawable: number; BestTorsoTexture: number }>>;

const torsoDataMale: IClothesData = maleClothes;
const femaleTorsos: IClothesData = femaleClothes;
class _Client {
    disabledKeys: number[] = [];
    onTickEvent: EventMp | null = null;
    readonly hud: PlayerHud;

    constructor() {
        this.onTickEvent = new mp.Event("render", this.onTick.bind(this));
        this.hud = new PlayerHud();
    }

    public disableKey(isMoveOrLookUp: boolean, key: number) {
        this.disabledKeys.push(key);
        mp.game.controls.setDisableControlActionBatch(isMoveOrLookUp, this.disabledKeys);
    }

    private onTick() {
        mp.game.controls.applyDisableControlActionBatch();
    }

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
    async playAnimationEx(animDict: string, animName: string, flag: number) {
        if (mp.players.local.isInAnyVehicle(false)) return;
        await this.requestAnimDict(animDict);
        mp.players.local.taskPlayAnim(animDict, animName, 8, -8, -1, flag, 0.0, false, false, false);
    }

    public setClothes(component: number, drawable: number, texture: number) {
        const freemodeModels = [mp.game.joaat("mp_m_freemode_01"), mp.game.joaat("mp_f_freemode_01")];
        mp.players.local.setComponentVariation(component, drawable, texture, 2);
        if (component === 11) {
            if (mp.players.local.model == freemodeModels[0]) {
                if (torsoDataMale[drawable] !== undefined || torsoDataMale[drawable][texture] !== undefined) {
                    if (torsoDataMale[drawable][texture].BestTorsoDrawable != -1) {
                        mp.players.local.setComponentVariation(3, torsoDataMale[drawable][texture].BestTorsoDrawable, torsoDataMale[drawable][texture].BestTorsoTexture, 2);
                    }
                }
            } else {
                if (femaleTorsos[drawable] !== undefined || femaleTorsos[drawable][texture] !== undefined) {
                    if (femaleTorsos[drawable][texture].BestTorsoDrawable != -1) {
                        mp.players.local.setComponentVariation(3, femaleTorsos[drawable][texture].BestTorsoDrawable, femaleTorsos[drawable][texture].BestTorsoTexture, 2);
                    }
                }
            }
        }
    }
}

export const Client = new _Client();
