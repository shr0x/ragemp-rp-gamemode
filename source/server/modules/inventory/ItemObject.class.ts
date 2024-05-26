import { inventoryAssets } from "./Items.module";
import { v4 as uuidv4 } from "uuid";

export class ItemObject {
    static List: { [key: string]: ItemObject } = {};

    image: string;
    hash: string;
    dimension: number;
    type: string;
    key: string;

    model: string;
    coords: Vector3;
    rotation: Vector3;
    collision: boolean;
    name: string;
    range: number;
    count: number;
    assets: RageShared.Interfaces.Inventory.IInventoryItem;
    itemType: string;

    timeout: NodeJS.Timeout | null = null;

    object: ObjectMp;

    constructor(data: {
        image: string;
        hash: string;
        dimension?: number;
        type: string;
        key: string;
        model: string;
        coords: Vector3;
        rotation: Vector3;
        collision: boolean;
        name: string;
        range: number;
        count: number;
        itemType: string;
        assets: any;
    }) {
        this.image = data.image;
        this.hash = data.hash;
        this.dimension = data.dimension || 0;
        this.type = data.type;
        this.key = data.key;

        this.model = data.model;
        this.coords = data.coords;
        this.rotation = data.rotation;
        this.collision = data.collision;
        this.name = data.name;
        this.range = data.range;
        this.count = data.count;
        this.itemType = data.itemType;
        this.assets = data.assets;
        if (this.coords) {
            this.object = mp.objects.new(mp.joaat(this.model), this.coords, {
                rotation: new mp.Vector3(data.rotation.x, data.rotation.y, data.rotation.z)
            });
        }
        this.update();

        this.timeout = setTimeout(() => {
            if (ItemObject.List[this.hash]) {
                this.remove();
            }
        }, 300000);

        ItemObject.List[this.hash] = this;
    }
    public async update() {
        this.object.setVariables({
            is_item: true,
            hash: this.hash,
            image: this.image,
            item_type: this.itemType
        });

        mp.players.forEachInRange(this.object.position, mp.config["stream-distance"], (player) => {
            if (player.getVariable("loggedin")) {
                player.call("client::entity:enableStreamin");
            }
        });
    }
    public remove() {
        if (this.object && mp.objects.exists(this.object)) {
            this.object.destroy();
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        delete ItemObject.List[this.hash];
    }

    static fetchInRange(player: PlayerMp, range: number = 1) {
        return Object.values(ItemObject.List)
            .filter((x) => player.dist(x.coords) <= range)
            .map((x) => x.assets);
    }

    static getItem(hash: string) {
        return Object.values(ItemObject.List).find((x) => x.assets?.hash === hash)?.assets ?? null;
    }
    static deleteDroppedItemByHash(hash: string) {
        const item = Object.values(ItemObject.List).find((x) => x.assets?.hash === hash) ?? null;
        if (item) item.remove();
    }
}

function interactEntity(player: PlayerMp, hash: number) {}

function closeCEF(player: PlayerMp, type: any) {}

mp.events.add("server::entitySync:interact", interactEntity);
mp.events.add("server::player:closeCEF", closeCEF);
