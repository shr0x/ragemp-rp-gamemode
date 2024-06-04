/**
 * Interface representing the data structure for item objects.
 */
interface IItemObjectData {
    /** The unique identifier for the item object. */
    hash: string;
    /** The dimension in which the item object exists. */
    dimension?: number;
    /** The coordinates of the item object. */
    coords: Vector3;
    /** The rotation of the item object. */
    rotation: Vector3;
    /** Whether the item object has collision enabled. */
    collision: boolean;
    /** The range within which the item object is active. */
    range: number;
    /** The data of the item associated with the object. */
    itemData: RageShared.Interfaces.Inventory.IBaseItem;
}

/**
 * Class representing an item object in the game.
 */
export class ItemObject implements IItemObjectData {
    /** Map to store all item objects by their hash. */
    static List: Map<string, ItemObject> = new Map();

    /** The unique identifier for the item object. */
    hash: string;
    /** The game object representing the item, if it exists. */
    object: ObjectMp | null = null;
    /** The dimension in which the item object exists. */
    dimension?: number;
    /** The coordinates of the item object. */
    coords: Vector3;
    /** The rotation of the item object. */
    rotation: Vector3;
    /** Whether the item object has collision enabled. */
    collision: boolean;
    /** The range within which the item object is active. */
    range: number;
    /** The data of the item associated with the object. */
    itemData: RageShared.Interfaces.Inventory.IBaseItem;

    /** Timeout for removing the item object after a certain period. */
    timeout: NodeJS.Timeout | null = null;

    /**
     * Creates an instance of ItemObject.
     * @param data - The data to initialize the item object.
     */
    constructor(data: IItemObjectData) {
        this.dimension = data.dimension || 0;
        this.coords = data.coords;
        this.rotation = data.rotation;
        this.collision = data.collision;
        this.range = data.range;
        this.itemData = data.itemData;
        this.hash = this.itemData.hash;

        this.object = mp.objects.new(mp.joaat(this.itemData.modelHash ?? "prop_food_bag1"), this.coords, {
            rotation: new mp.Vector3(data.rotation.x, data.rotation.y, data.rotation.z)
        });

        this.update();

        this.timeout = setTimeout(() => {
            if (ItemObject.List.has(this.hash)) {
                this.remove();
            }
        }, 300000);

        ItemObject.List.set(this.hash, this);
    }

    /**
     * Updates the item object properties in the game.
     */
    public async update() {
        if (!this.object || !mp.objects.exists(this.object)) return;
        this.object.setVariables({ is_item: true, itemData: JSON.stringify(this.itemData) });
    }

    /**
     * Removes the item object from the game and clears the timeout.
     */
    public remove() {
        if (this.object && mp.objects.exists(this.object)) {
            this.object.destroy();
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        ItemObject.List.delete(this.hash);
    }

    /**
     * Fetches item objects within a certain range of a player.
     * @param player - The player to check the range from.
     * @param range - The range within which to fetch item objects. Defaults to 1.
     * @returns An array of item objects within the specified range.
     */
    static fetchInRange(player: PlayerMp, range: number = 1) {
        const result: RageShared.Interfaces.Inventory.IBaseItem[] = [];
        for (const item of ItemObject.List.values()) {
            if (player.dist(item.coords) <= range) {
                result.push(item.itemData);
            }
        }
        return result;
    }

    /**
     * Retrieves an item object by its hash.
     * @param hash - The hash of the item object to retrieve.
     * @returns The item object with the specified hash, or null if not found.
     */
    static getItem(hash: string) {
        const item = ItemObject.List.get(hash);
        return item ? item.itemData : null;
    }
    /**
     * Deletes a dropped item object by its hash.
     * @param hash - The hash of the item object to delete.
     */
    static deleteDroppedItemByHash(hash: string) {
        const item = ItemObject.List.get(hash);
        if (item) item.remove();
    }
}
