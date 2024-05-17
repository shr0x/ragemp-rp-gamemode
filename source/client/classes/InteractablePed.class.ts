import { Utils } from "../../shared/Utils.module";
import Camera from "./Camera.class";
import { Client } from "./Client.class";

type onKeyPressAsync = () => Promise<void>;
type onKeyPress = () => void;

interface IPedData {
    blockInteraction?: boolean;
    type: number;
    model: string;
    coords: Vector3;
    heading: number;
    event: string;
    name: string;
    key: string;
    id?: number;
}

export class InteractablePed {
    static pool: InteractablePed[] = [];
    model: string;
    coords: Vector3;
    heading: number;
    event: string;
    name: string;
    ped: PedMp | null;

    textLabel: TextLabelMp | null = null;
    blockInteraction: boolean = false;

    onKeyPress: onKeyPressAsync | onKeyPress;

    constructor(data: IPedData, onKeyPress?: onKeyPress | onKeyPressAsync) {
        this.model = data.model;
        this.coords = data.coords;
        this.heading = data.heading || 0;
        this.event = data.event;
        this.name = data.name;

        if (onKeyPress) {
            this.onKeyPress = onKeyPress;
        }

        if (data.blockInteraction) this.blockInteraction = true;
        this.create();
    }

    async create() {
        let modelHash = mp.game.joaat(this.model);

        await Client.requestModel(modelHash);

        let interval = setInterval(() => {
            if (modelHash) {
                mp.game.streaming.requestModel(modelHash);
                if (mp.game.streaming.hasModelLoaded(modelHash)) {
                    this.ped = mp.peds.new(modelHash, new mp.Vector3(this.coords.x, this.coords.y, this.coords.z), this.heading, 0);

                    const position = new mp.Vector3(this.coords.x, this.coords.y, this.coords.z + 1);
                    this.textLabel = mp.labels.new(`~y~NPC~n~~w~~c~${this.name}`, position, { dimension: 0, font: 4, los: true });
                    this.ped.setBlockingOfNonTemporaryEvents(true);
                    this.ped.taskSetBlockingOfNonTemporaryEvents(true);
                    this.ped.setInvincible(true);
                    this.ped.setFleeAttributes(15, true);
                    this.ped.freezePosition(true);
                    this.ped.setRandomComponentVariation(true);
                    this.ped.setRandomProps();
                    this.ped.setCanBeTargetted(false);
                    InteractablePed.pool.push(this);
                    clearInterval(interval);
                }
            }
        }, 100);

        return this;
    }

    public deletePed() {
        if (this.ped && mp.peds.exists(this.ped)) this.ped.destroy();
        if (this.textLabel && mp.labels.exists(this.textLabel)) this.textLabel.destroy();

        const index = InteractablePed.pool.indexOf(this);
        if (index !== -1) InteractablePed.pool.splice(index, 1);
    }

    static init() {
        mp.events.add("client::ped:interact", this.createForwardCamera.bind(this));
        mp.events.add("client::ped:destroyCamera", this.destroyForwardCamera.bind(this));
        mp.keys.bind(69, false, this.interact.bind(this));
        mp.keys.bind(69, false, this.destroyForwardCamera.bind(this));
    }

    static getClosest(range: number = 3): InteractablePed | null {
        const peds = InteractablePed.pool;
        for (const ped of peds) {
            if (!ped.ped) continue;
            if (Utils.distanceToPos(mp.players.local.position, ped.ped.position) < range) {
                return ped;
            }
        }
        return null;
    }

    static createForwardCamera(pedid: number) {
        const ped = mp.peds.at(pedid);
        if (!ped || !mp.peds.exists(ped)) return;
        mp.players.local.setAlpha(0);

        const startPosition = ped.position;
        const forwardVector = ped.getForwardVector();

        const forwardCameraPosition = {
            x: startPosition.x + forwardVector.x * 4,
            y: startPosition.y + forwardVector.y * 4,
            z: startPosition.z + 0.6
        };

        mp.game.audio.playAmbientSpeechWithVoice(ped.handle, "GENERIC_HI", "", "SPEECH_PARAMS_FORCE_SHOUTED", false);
        let finalPosition = new mp.Vector3(forwardCameraPosition.x, forwardCameraPosition.y, forwardCameraPosition.z);
        let pointAtPosition = new mp.Vector3(startPosition.x, startPosition.y, startPosition.z + 0.6);

        Camera.createCamera("ped_camera", finalPosition);
        Camera.setCameraLookAt("ped_camera", pointAtPosition);
        Camera.setCameraFov("ped_camera", 15);
        Camera.setCameraActive("ped_camera", true, 2000);
    }

    static destroyForwardCamera() {
        if (!Camera.isActive("ped_camera")) return;
        mp.players.local.setAlpha(255);
        Camera.setCameraActive("ped_camera", false);
        Camera.destroyCamera("ped_camera");
    }

    static interact() {
        const peds = InteractablePed.pool;
        for (const ped of peds) {
            if (!ped.ped) continue;
            if (Utils.distanceToPos(mp.players.local.position, ped.ped.position) < 3) {
                this.createForwardCamera(ped.ped.id);
            }
        }
    }
}

mp.events.add("entityStreamIn", (entity: EntityMp) => {
    if (entity.type === "ped") {
        let ped = entity as PedMp;
        ped.setCanBeTargetted(false);
    }
});
