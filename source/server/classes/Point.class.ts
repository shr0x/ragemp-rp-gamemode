import { v4 as uuidv4 } from "uuid";

type onKeyPressAsync = (player: PlayerMp) => Promise<void>; //- Asynchronous key press handler.
type onKeyPress = (player: PlayerMp) => void; //- Synchronous key press handler.

/**
 * Interface for point handlers.
 * @interface IPointHandlers
 * @property {(player: PlayerMp) => void} enterHandler - Handler for when a player enters the point.
 * @property {(player: PlayerMp) => void} exitHandler - Handler for when a player exits the point.
 * @property {onKeyPressAsync | onKeyPress} onKeyPress - Handler for key press events at the point.
 */
export interface IPointHandlers {
    enterHandler: (player: PlayerMp) => void;
    exitHandler: (player: PlayerMp) => void;
    onKeyPress: onKeyPressAsync | onKeyPress;
}

/**
 * Interface for label data.
 * @interface ILabelData
 * @property {string} text - The text for the label.
 * @property {Vector3} [position] - The position of the label. Defaults to the point position if not provided.
 * @property {object} [options] - Additional options for the label.
 * @property {number} [options.font] - Font of the label.
 * @property {RGBA} [options.color] - Color of the label.
 * @property {number} [options.dimension] - Dimension of the label.
 * @property {number} [options.drawDistance] - Draw distance of the label.
 * @property {boolean} [options.los] - Line of sight for the label.
 */
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
export const dynamicPointPool: DynamicPoint[] = [];

export class DynamicPoint {
    id: string;
    pointShape: ColshapeMp | null = null;
    textLabel: TextLabelMp | null = null;
    position: Vector3;
    dimension: number;
    onKeyPress: onKeyPressAsync | onKeyPress;

    /**
     * Creates an instance of DynamicPoint.
     * @param {Vector3} position - The position of the dynamic point.
     * @param {number} range - The range of the point shape.
     * @param {number} dimension - The dimension of the point.
     * @param {IPointHandlers} handlers - The handlers for point events.
     * @param {ILabelData} [label] - Optional label data.
     */
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
        dynamicPointPool.push(this);
    }

    /**
     * Creates a text label.
     * @param {string} text - The text for the label.
     * @param {Vector3} [position] - Optional, if no position is set then the point position will be used.
     * @param {object} [options] - Label options, such as font, color, los, etc.
     * @param {number} [options.font] - The font of the label.
     * @param {RGBA} [options.color] - The color of the label.
     * @param {number} [options.dimension] - The dimension of the label.
     * @param {number} [options.drawDistance] - The draw distance of the label.
     * @param {boolean} [options.los] - Line of sight for the label.
     * @returns {void}
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

    /**
     * Updates the text of the label.
     * @param {string} text - The new text to update the label.
     */
    public updateLabel(text: string) {
        if (this.textLabel && mp.labels.exists(this.textLabel)) this.textLabel.text = text;
    }

    /**
     * Destroys the label.
     */
    public destroyLabel() {
        if (!this.textLabel || !mp.labels.exists(this.textLabel)) return;
        this.textLabel.destroy();
        this.textLabel = null;
    }

    /**
     * Checks if a dynamic point exists.
     * @param {DynamicPoint} point - The dynamic point to check.
     * @returns {DynamicPoint | undefined} - The found dynamic point or undefined.
     */
    public exists(point: DynamicPoint) {
        return dynamicPointPool.find((x) => x.id === point.id);
    }

    /**
     * Destroys the dynamic point.
     */
    public destroy() {
        if (this.pointShape && mp.colshapes.exists(this.pointShape)) {
            this.pointShape.destroy();
        }

        if (this.textLabel && mp.labels.exists(this.textLabel)) {
            this.textLabel.destroy();
        }

        let point = dynamicPointPool.find((x) => x.id === this.id);
        if (!point) return;
        dynamicPointPool.splice(dynamicPointPool.indexOf(point), 1);
    }

    /**
     * Gets the nearest dynamic point to a player.
     * @param {PlayerMp} player - The player to check proximity.
     * @returns {DynamicPoint | null} - The nearest dynamic point or null if none found.
     */
    static getNearestPoint(player: PlayerMp): DynamicPoint | null {
        let found_point: DynamicPoint | null = null;
        for (let i = 0; i < dynamicPointPool.length; i++) {
            let point = dynamicPointPool[i];
            if (!point.pointShape || !mp.colshapes.exists(point.pointShape)) continue;
            if (player.dimension === point.dimension && point.pointShape.isPointWithin(player.position)) {
                found_point = point;
                break;
            }
        }
        return found_point;
    }

    /**
     * Creates a new dynamic point.
     * @param {Vector3} position - The position of the dynamic point.
     * @param {number} range - The range of the point shape.
     * @param {number} dimension - The dimension of the point.
     * @param {IPointHandlers} handlers - The handlers for point events.
     * @param {ILabelData} [label] - Optional label data.
     * @returns {DynamicPoint} - The created dynamic point.
     */
    static new(position: Vector3, range: number, dimension: number, handlers: IPointHandlers, label?: ILabelData): DynamicPoint {
        return new DynamicPoint(position, range, dimension, handlers, label);
    }
}
