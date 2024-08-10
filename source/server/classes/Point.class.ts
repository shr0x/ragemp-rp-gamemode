import { v4 as uuidv4 } from "uuid";

/**
 * Type representing a key press handler, which can be either synchronous or asynchronous.
 * @param {PlayerMp} player - The player who pressed the key.
 * @returns {void | Promise<void>} - Returns nothing for synchronous handlers or a promise for asynchronous handlers.
 */
type onKeyPressHandler = (player: PlayerMp) => void | Promise<void>;

/**
 * Interface for point handlers.
 * @interface IPointHandlers
 * @property {(player: PlayerMp) => void} enterHandler - Handler for when a player enters the point.
 * @property {(player: PlayerMp) => void} exitHandler - Handler for when a player exits the point.
 * @property {onKeyPressHandler} onKeyPress - Handler for key press events at the point.
 */
export interface IPointHandlers {
    enterHandler: (player: PlayerMp) => void;
    exitHandler: (player: PlayerMp) => void;
    onKeyPress: onKeyPressHandler;
}

/**
 * Interface representing the data required to create a text label.
 */
interface ILabelData {
    /** The text content of the label. */
    text: string;
    /** The position of the label in a 3D space (optional). */
    position?: Vector3;
    /** Optional settings for the label. */
    options?: {
        /** The font of the label text. */
        font?: number;
        /** The color of the label text (RGBA). */
        color?: RGBA;
        /** The dimension where the label is visible. */
        dimension?: number;
        /** The draw distance of the label. */
        drawDistance?: number;
        /** Whether the label is visible only when in line of sight (LoS). */
        los?: boolean;
    };
}

/**
 * Interface representing the data required to create a blip.
 */
interface IBlipData {
    /** The sprite ID for the blip. */
    sprite: number;
    /** The position of the blip in a 3D space. */
    position: Vector3;
    /** Optional settings for the blip. */
    options?: {
        /** The alpha transparency of the blip (0-255). */
        alpha?: number;
        /** The color of the blip. */
        color?: number;
        /** The dimension where the blip is visible. */
        dimension?: number;
        /** The draw distance of the blip. */
        drawDistance?: number;
        /** The name of the blip. */
        name?: string;
        /** The rotation of the blip. */
        rotation?: number;
        /** The scale of the blip. */
        scale?: number;
        /** Whether the blip is short-range (only visible on the minimap when nearby). */
        shortRange?: boolean;
    };
}

/**
 * Interface representing the data required to create a marker.
 */
interface IMarkerData {
    /** The type of marker (e.g., cylinder, arrow, etc.). */
    type: number;
    /** The position of the marker in a 3D space. */
    position: Vector3;
    /** The scale of the marker. */
    scale: number;
    /** Optional settings for the marker. */
    options?: {
        /** The color of the marker (RGBA). */
        color?: RGBA;
        /** The dimension where the marker is visible. */
        dimension?: number;
        /** The direction of the marker. */
        direction?: Vector3;
        /** The rotation of the marker. */
        rotation?: Vector3;
        /** Whether the marker is visible. */
        visible?: boolean;
    };
}

export const dynamicPointPool: DynamicPoint[] = [];

export class DynamicPoint {
    id: string;
    position: Vector3;
    dimension: number;
    onKeyPress: onKeyPressHandler;

    pointShape: ColshapeMp | null = null;
    textLabel: TextLabelMp | null = null;
    blip: BlipMp | null = null;
    marker: MarkerMp | null = null;

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
            this.pointShape = null;
        }

        if (this.textLabel && mp.labels.exists(this.textLabel)) {
            this.textLabel.destroy();
            this.textLabel = null;
        }

        if (this.marker && mp.markers.exists(this.marker)) {
            this.marker.destroy();
            this.marker = null;
        }

        if (this.blip && mp.blips.exists(this.blip)) {
            this.blip.destroy();
            this.blip = null;
        }

        let point = dynamicPointPool.find((x) => x.id === this.id);
        if (!point) return;
        dynamicPointPool.splice(dynamicPointPool.indexOf(point), 1);
    }

    /**
     * Creates a new blip based on the provided data.
     * @param {IBlipData} data - The data used to create the blip.
     */
    public createBlip(data: IBlipData) {
        this.blip = mp.blips.new(data.sprite, data.position, data.options);
    }

    /**
     * Destroys the current blip if it exists.
     */
    public destroyBlip() {
        if (this.blip && mp.blips.exists(this.blip)) {
            this.blip.destroy();
            this.blip = null;
        }
    }

    /**
     * Creates a new marker based on the provided data.
     * @param {IMarkerData} data - The data used to create the marker.
     */
    public createMarker(data: IMarkerData) {
        this.marker = mp.markers.new(data.type, data.position, data.scale, data.options);
    }

    /**
     * Destroys the current marker if it exists.
     */
    public destroyMarker() {
        if (this.marker && mp.markers.exists(this.marker)) {
            this.marker.destroy();
            this.marker = null;
        }
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
