import { RageShared } from "@shared/index";
import { inventoryAssets } from "./Items.module";
import { v4 as uuidv4 } from "uuid";
interface ISplitData {
    item: RageShared.Inventory.Interfaces.IBaseItem;
    source: { component: inventoryAssets.INVENTORY_CATEGORIES; slot: number };
    target: { component: inventoryAssets.INVENTORY_CATEGORIES; slot: number; count: number };
}
export const splitInventoryItem = (player: PlayerMp, data: string) => {
    try {
        if (!mp.players.exists(player) || !player.character || !player.character.inventory) return;
        let { item, source, target }: ISplitData = JSON.parse(data);

        if (item.type === null) return;

        player.character.inventory.items[source.component][source.slot] = { ...item, type: item.type, count: item.count - target.count };
        player.character.inventory.items[target.component][target.slot] = { ...item, type: item.type, count: target.count, hash: uuidv4() };

        if (player.character.inventory.isAmmoItem(item)) {
            player.character.inventory.reloadWeaponAmmo(player, item.type);
        }
        player.character.inventory.setInventory(player);
    } catch (err) {
        console.log("splitInventoryItem err: ", err);
    }
};
