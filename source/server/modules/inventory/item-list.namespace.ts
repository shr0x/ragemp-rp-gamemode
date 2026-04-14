import { Item } from "./inventory.types";
import { clothingItems } from "./items/clothes.items";
import { weaponItems } from "./items/weapon.items";
import { ammoItems } from "./items/ammo.items";

export namespace inventoryAssets {
    export const items: Item = {
        ...clothingItems,
        ...weaponItems,
        ...ammoItems
    };
}
