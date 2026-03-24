import { RAGERP } from "@api";
import { HouseEntity } from "@entities/House.entity";
import { DynamicPoint } from "./Point.class";

export class House {
    static List = new Map<number, House>();

    private id: number;

    enterPosition: Vector3;
    exitPosition: Vector3;
    price: number;
    dimension: number;
    owner: number;
    ownerName: string;
    class: number;

    locked: boolean = false;

    entities: {
        enterMarker: MarkerMp | null;
        enterLabel: TextLabelMp | null;
        exitMarker: MarkerMp | null;
        exitLabel: TextLabelMp | null;
        enterPoint: DynamicPoint | null;
        exitPoint: DynamicPoint | null;
        destroy: () => void;
    } = {
            enterMarker: null,
            enterLabel: null,
            exitMarker: null,
            exitLabel: null,
            enterPoint: null,
            exitPoint: null,
            destroy: () => {
                this.destroyEntities();
            },
        };

    constructor(
        id: number,
        enterPosition: Vector3,
        exitPosition: Vector3,
        price: number,
        owner: number,
        ownerName: string,
        classType: number
    ) {
        this.id = id;
        this.enterPosition = enterPosition;
        this.exitPosition = exitPosition;
        this.price = price;
        this.owner = owner;
        this.ownerName = ownerName;
        this.class = classType;
        this.dimension = this.id + 1000;
        this.createEntities();

        House.List.set(id, this);
    }

    // Getters and setters

    get houseId(): number {
        return this.id;
    }

    setPrice(newPrice: number): void {
        this.price = newPrice;
    }

    toggleLock(): void {
        this.locked = !this.locked;
    }

    private createEntities(): void {
        this.entities.enterPoint = new DynamicPoint(this.enterPosition, 2.0, 0, {
            enterHandler: (player: PlayerMp) => {
                player.showInteractionButton("E", "Enter House", `Press E to enter house ${this.id}`);
            },
            exitHandler: (player: PlayerMp) => {
                player.hideInteractionButton()
            },
            onKeyPress: (player: PlayerMp) => {
                player.outputChatBox(`You pressed E at house ${this.id}`);
            },
        });

        this.entities.enterLabel = mp.labels.new(`House ${this.id}`, this.enterPosition, {
            los: false,
            font: 4,
            drawDistance: 10,
            dimension: 0,
        });

        this.entities.enterMarker = mp.markers.new(1, this.enterPosition, 1, {
            color: [0, 255, 0, 255],
            visible: true,
            dimension: 0,
        });

        this.entities.exitMarker = mp.markers.new(1, this.exitPosition, 1, {
            color: [255, 0, 0, 255],
            visible: true,
            dimension: this.dimension,
        });

        this.entities.exitLabel = mp.labels.new(`House ${this.id}`, this.exitPosition, {
            los: false,
            font: 4,
            drawDistance: 10,
            dimension: this.dimension,
        });

        this.entities.exitPoint = new DynamicPoint(this.exitPosition, 2.0, this.dimension, {
            enterHandler: (player: PlayerMp) => { },
            exitHandler: (player: PlayerMp) => { },
            onKeyPress: (player: PlayerMp) => {
                player.outputChatBox(`You pressed E to exit house ${this.id}`);
            },
        });
    }

    private destroyEntities(): void {
        this.entities.enterMarker?.destroy();
        this.entities.enterLabel?.destroy();
        this.entities.exitMarker?.destroy();
        this.entities.exitLabel?.destroy();
        this.entities.enterPoint?.destroy();
        this.entities.exitPoint?.destroy();
    }

    async save(): Promise<void> {
        try {
            await RAGERP.database.getRepository(HouseEntity).update(this.id, {
                price: this.price,
                owner: this.owner,
                ownerName: this.ownerName,
                class: this.class,

                enterPosition: this.enterPosition,
                exitPosition: this.exitPosition,
                dimension: this.dimension,
            });
        } catch (error) {
            console.error(error);
        }
    }

    static getHouse(id: number): House | null {
        return House.List.get(id) || null;
    }

    static findHouse(filter: (house: House) => boolean): House | null {
        for (let house of House.List.values()) {
            if (filter(house)) return house;
        }
        return null;
    }

    static async create(
        enterPosition: Vector3,
        exitPosition: Vector3,
        price: number,
        owner: number,
        ownerName: string,
        classType: number
    ): Promise<House | null> {
        try {
            const houseEntity = new HouseEntity();
            houseEntity.enterPosition = enterPosition;
            houseEntity.exitPosition = exitPosition;
            houseEntity.price = price;
            houseEntity.owner = owner;
            houseEntity.ownerName = ownerName;
            houseEntity.class = classType;

            const inserted = await RAGERP.database.getRepository(HouseEntity).save(houseEntity);
            const house = new House(inserted.id, enterPosition, exitPosition, price, owner, ownerName, classType);
            return house;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async loadAll(): Promise<void> {
        const houses = await RAGERP.database.getRepository(HouseEntity).find();
        for (const house of houses) {
            if (house.enterPosition && house.exitPosition) {
                new House(house.id, house.enterPosition, house.exitPosition, house.price, house.owner, house.ownerName, house.class);
            }
        }
    }

    static async destroy(id: number): Promise<void> {
        const house = House.getHouse(id);
        if (!house) return;

        await RAGERP.database.getRepository(HouseEntity).delete(id);
        house.destroyEntities();
        House.List.delete(id);
    }
}
