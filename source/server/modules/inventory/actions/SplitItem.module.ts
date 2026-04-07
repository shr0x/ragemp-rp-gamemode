import { v4 as uuidv4 } from "uuid";
import { RageShared } from "@shared/index";

interface ISplitData {
    source: { component: "pockets" | "backpack"; slot: string | number; linkedbackpack?: string | null };
    target: { component: "pockets" | "backpack"; slot: string | number; count: number; linkedbackpack?: string | null };
}
export const splitInventoryItem = (player: PlayerMp, data: string) => {
    try {
        if (!mp.players.exists(player) || !player.character || !player.character.inventory) return;
        const inventory = player.character.inventory;
        const { source, target }: ISplitData = JSON.parse(data);

        if (!source || !target) return inventory.sync(player);
        const validComponents = ["pockets", "backpack"];

        if (!validComponents.includes(source.component) || !validComponents.includes(target.component)) {
            return inventory.sync(player);
        }

        const sourceSlot = Number(source.slot);
        const targetSlot = Number(target.slot);
        const splitCount = Number(target.count);

        if (!Number.isInteger(sourceSlot) || !Number.isInteger(targetSlot) || !Number.isInteger(splitCount)) {
            return inventory.sync(player);
        }

        const getContainerByComponent = (component: "pockets" | "backpack", linkedBackpack?: string | null) => {
            if (component === "pockets") return inventory.items.pockets;
            if (!linkedBackpack) return null;

            const backpackData = inventory.getItemByUUID(linkedBackpack);
            if (!backpackData || !backpackData.items) return null;
            return backpackData.items;
        };

        const linkedBackpackHash = source.linkedbackpack || target.linkedbackpack || null;
        const sourceContainer = getContainerByComponent(source.component, linkedBackpackHash);
        const targetContainer = getContainerByComponent(target.component, linkedBackpackHash);

        if (!sourceContainer || !targetContainer) return inventory.sync(player);

        const sourceItem = sourceContainer[sourceSlot];
        const targetItem = targetContainer[targetSlot];

        if (!sourceItem || targetItem) return inventory.sync(player);
        if (splitCount <= 0 || splitCount >= sourceItem.count) return inventory.sync(player);

        sourceContainer[sourceSlot] = { ...sourceItem, count: sourceItem.count - splitCount };
        targetContainer[targetSlot] = { ...sourceItem, count: splitCount, hash: uuidv4() };

        if (inventory.isAmmoItem(sourceItem)) {
            inventory.reloadWeaponAmmo(player, sourceItem.type);
        }

        inventory.sync(player);
    } catch (err) {
        console.log("splitInventoryItem err: ", err);
    }
};
