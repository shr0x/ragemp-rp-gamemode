import { v4 as uuidv4 } from "uuid";

type onKeyPressAsync = (player: PlayerMp) => Promise<void>;
type onKeyPress = (player: PlayerMp) => void;

export interface IPointHandlers {
    enterHandler: (player: PlayerMp) => void;
    exitHandler: (player: PlayerMp) => void;
    onKeyPress: onKeyPressAsync | onKeyPress;
}

interface ILabelData {
    text: string;
    position?: Vector3;
    options?: {
        font?: number;
        color?: RGBA;
        dimension?: number;
        drawDistance?: number;
        los?: boolean;
    };
}

export class DynamicPoint {
    static List: DynamicPoint[] = [];
    id: string;
    pointShape: ColshapeMp | null = null;
    textLabel: TextLabelMp | null = null;
    position: Vector3;
    dimension: number;

    onKeyPress: onKeyPressAsync | onKeyPress;

    constructor(position: Vector3, range: number, dimension: number, handlers: IPointHandlers, label?: ILabelData) {
        this.id = uuidv4();
        this.dimension = dimension || 0;

        this.position = position;
        this.pointShape = mp.colshapes.newSphere(position.x, position.y, position.z, range, this.dimension);

        if (label) {
            this.textLabel = mp.labels.new(label.text, label.position ? label.position : position, {
                ...label.options
            });
        }

        this.pointShape.enterHandler = handlers.enterHandler;
        this.pointShape.exitHandler = handlers.exitHandler;

        this.onKeyPress = handlers.onKeyPress;

        DynamicPoint.List.push(this);
    }
    //--------------------------------------------------------------//
    /**
     * Creates a text label
     * @param text the text for the label
     * @param position? optional, if no position is set then the point position will be used
     * @param options? label options, such as font, los etc
     * @returns void
     */
    public createLabel(
        text: string,
        position?: Vector3,
        options?: {
            font?: number;
            color?: RGBA;
            dimension?: number;
            drawDistance?: number;
            los?: boolean;
        }
    ) {
        if (this.textLabel && mp.labels.exists(this.textLabel)) {
            this.textLabel.text = text;
            if (position) this.textLabel.position = position;
            return;
        }

        this.textLabel = mp.labels.new(text, position ? position : this.position, {
            ...options
        });
    }
    //--------------------------------------------------------------//
    /**
     * Updates label text
     * @param text The new text to update the label
     */
    public updateLabel(text: string) {
        if (this.textLabel && mp.labels.exists(this.textLabel)) this.textLabel.text = text;
    }
    //--------------------------------------------------------------//
    public destroyLabel() {
        if (!this.textLabel || !mp.labels.exists(this.textLabel)) return;
        this.textLabel.destroy();
        this.textLabel = null;
    }
    //--------------------------------------------------------------//
    public exists(point: DynamicPoint) {
        return DynamicPoint.List.find((x) => x.id === point.id);
    }

    public destroy() {
        if (this.pointShape && mp.colshapes.exists(this.pointShape)) {
            this.pointShape.destroy();
        }

        if (this.textLabel && mp.labels.exists(this.textLabel)) {
            this.textLabel.destroy();
        }

        let point = DynamicPoint.List.find((x) => x.id === this.id);
        if (!point) return;
        DynamicPoint.List.splice(DynamicPoint.List.indexOf(point), 1);
    }

    //--------------------------------------------------------------//
    static getNearestPoint(player: PlayerMp): DynamicPoint | null {
        let found_point: DynamicPoint | null = null;
        for (let i = 0; i < DynamicPoint.List.length; i++) {
            let point = DynamicPoint.List[i];
            if (!point.pointShape || !mp.colshapes.exists(point.pointShape)) continue;
            if (player.dimension === point.dimension && point.pointShape.isPointWithin(player.position)) {
                found_point = point;
                break;
            }
        }
        return found_point;
    }

    static new(position: Vector3, range: number, dimension: number, handlers: IPointHandlers, label?: ILabelData) {
        return new DynamicPoint(position, range, dimension, handlers, label);
    }
}

mp.events.add({
    "server::player:pressE": async (player: PlayerMp) => {
        try {
            if (!mp.players.exists(player)) return;
            const point = DynamicPoint.getNearestPoint(player);
            if (!point) return;
            point.onKeyPress.constructor.name === "AsyncFunction" ? await point.onKeyPress(player) : point.onKeyPress(player);
        } catch (err) {
            console.error("dynamic point event err: ", err);
        }
    },
    playerEnterColshape: (player: PlayerMp, shape: ColshapeMp): void => {
        if (typeof shape.enterHandler !== "undefined") shape.enterHandler(player);
    },

    playerExitColshape: (player: PlayerMp, shape: ColshapeMp): void => {
        if (typeof shape.exitHandler !== "undefined") shape.exitHandler(player);
    }
});
