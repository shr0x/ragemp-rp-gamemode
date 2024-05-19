import { action, makeObservable, observable } from "mobx";

interface IMenuItems {
    id: number;
    text: string;
    type: number;
    subItems?: IMenuItems[];
}

interface IInteractionMenu {
    isActive: boolean;
    items: IMenuItems[];
}

interface IVehicleData {
    isActive: boolean;
    gear: number;
    speed: number;
    engine: boolean;
    locked: boolean;
    lights: boolean;
    maxSpeed: number;
}

class HudStore {
    @observable interactionMenu: IInteractionMenu = observable.object({
        isActive: false,
        items: [
            // { id: 0, type: 0, text: "Seatbelt" },
            // { id: 0, type: 0, text: "Lights" },
            // { id: 0, type: 0, text: "Trunk" },
            // { id: 0, type: 0, text: "Boot" },
            // {
            //     id: 0,
            //     type: 0,
            //     text: "Other Options",
            //     subItems: [
            //         { id: 0, type: 0, text: "Lock Vehicle" },
            //         { id: 0, type: 0, text: "Lock Vehicle" },
            //         { id: 0, type: 0, text: "Lock Vehicle" },
            //         { id: 0, type: 0, text: "Lock Vehicle" }
            //     ]
            // }
        ]
    });

    @observable vehicleData: IVehicleData = observable.object({
        isActive: false,
        gear: 5,
        engine: true,
        lights: true,
        locked: false,
        speed: 0,
        maxSpeed: 400
    });

    constructor() {
        makeObservable(this);
    }
    @action.bound setInteractionMenu(data: IInteractionMenu) {
        this.interactionMenu = data;
    }
    @action.bound hideInteraction() {
        this.setInteractionMenu({ isActive: false, items: [] });
    }

    @action.bound setVehicleData<K extends keyof IVehicleData>(data: { key: K; data: IVehicleData[K] }) {
        if (typeof this.vehicleData[data.key] === "undefined") return console.log(data.key, "dont exist");
        this.vehicleData[data.key] = data.data;
    }
}

export default HudStore;
