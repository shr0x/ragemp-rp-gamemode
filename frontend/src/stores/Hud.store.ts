import { action, makeObservable, observable } from "mobx";
import EventManager from "utils/EventManager.util";
import { RageShared } from "../../../source/shared";

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

class HudStore {
    @observable
    interactionMenu: IInteractionMenu = observable.object({
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
            //         { id: 0, type: 0, text: "Lock Vehicle" },
            //         { id: 0, type: 0, text: "Lock Vehicle" },
            //         { id: 0, type: 0, text: "Lock Vehicle" },
            //         { id: 0, type: 0, text: "Lock Vehicle" },
            //         { id: 0, type: 0, text: "Lock Vehicle" },
            //         { id: 0, type: 0, text: "Lock Vehicle" },
            //         { id: 0, type: 0, text: "Lock Vehicle" },
            //         { id: 0, type: 0, text: "Lock Vehicle" },
            //         { id: 0, type: 0, text: "Lock Vehicle" }
            //     ]
            // }
        ]
    });

    @observable
    interactButtonData: {
        button: string;
        text: string;
    } | null = null;

    @observable
    areaData: { area: string; street: string } = observable.object({
        area: "San Andreas",
        street: "Los SAntos International"
    });

    @observable
    vehicleData: RageShared.Vehicles.Interfaces.SpeedometerData = observable.object({
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
    @action.bound
    setInteractionMenu(data: IInteractionMenu) {
        this.interactionMenu = data;
    }
    @action.bound hideInteraction() {
        this.setInteractionMenu({ isActive: false, items: [] });
    }

    @action.bound
    setVehicleData<K extends keyof RageShared.Vehicles.Interfaces.SpeedometerData>(data: { key: K; data: RageShared.Vehicles.Interfaces.SpeedometerData[K] }) {
        if (typeof this.vehicleData[data.key] === "undefined") return console.log(data.key, "dont exist");
        this.vehicleData[data.key] = data.data;
    }

    @action.bound
    setAreaData(data: { area: string; street: string }) {
        this.areaData = data;
    }

    @action.bound
    setInteractionButtonData(data: typeof this.interactButtonData) {
        this.interactButtonData = data;
    }

    public createEvents() {
        EventManager.addHandler("hud", "setInteraction", (data: any) => this.setInteractionMenu(data));
        EventManager.addHandler("hud", "setVehicleData", (data: any) => this.setVehicleData(data));
        EventManager.addHandler("hud", "setAreaData", (data: { area: string; street: string }) => this.setAreaData(data));
        EventManager.addHandler("hud", "showInteractionButton", (data: { button: string; text: string }) => this.setInteractionButtonData(data));
        EventManager.stopAddingHandler("hud");
    }
}

export default HudStore;
