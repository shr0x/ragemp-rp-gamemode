import { Browser } from "../classes/Browser.class";
import { InteractionMenu } from "../classes/InteractMenu.class";
import { Vehicle } from "../classes/Vehicle.class";
import { current_object } from "./Interact.event";

//temporary keybinds

let buttonPressedTime: number = 0;

async function showVehicleInteractionMenu(vehicle: VehicleMp) {
    if (!vehicle || !mp.vehicles.exists(vehicle)) return;
    const data = {
        isActive: true,
        items: [
            { id: 0, type: 0, text: `Open Trunk` },
            { id: 1, type: 0, text: "Lock Vehicle" },
            { id: 2, type: 0, text: "Open Hood" }
        ]
    };

    return await InteractionMenu.new(data);
}

mp.keys.bind(71, false, async () => {
    if (new Date().getTime() - buttonPressedTime < 500 || !current_object) return;

    if (Browser.currentPage && Browser.currentPage !== "interactionMenu") return;

    buttonPressedTime = new Date().getTime();

    let entity = mp.vehicles.atHandle(current_object);
    mp.console.logInfo(`PressG: ${entity?.remoteId}`);
    if (entity && mp.vehicles.exists(entity)) {
        const response = await showVehicleInteractionMenu(entity);
        mp.console.logInfo(`Vehicle interaction result: ${response}`);
        if (response == 0) {
            //open trunk
            Vehicle.setTrunkState(entity, true);
        }
        InteractionMenu.closeMenu();
    }
});
