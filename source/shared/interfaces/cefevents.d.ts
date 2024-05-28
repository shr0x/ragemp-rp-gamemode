declare namespace RageShared.Interfaces {
    declare namespace Inventory {
        interface IMoveItem {
            item: RageShared.Interfaces.Inventory.IInventoryItem;
            source: { component: "pockets" | "clothes" | "quickUse" | "groundItems"; slot: string };
            target: { component: "pockets" | "clothes" | "quickUse" | "groundItems"; slot: string; item: RageShared.Interfaces.Inventory.IInventoryItem | null };
        }
        interface IUseItem {
            item: RageShared.Interfaces.Inventory.IInventoryItem;
            source: { component: "pockets" | "clothes"; slot: string };
        }

        interface IDropItem {
            item: RageShared.Interfaces.Inventory.IInventoryItem;
            source: { component: "pockets" | "clothes" | "backpack"; slot: string; viewingBackpack?: string };
        }

        interface ISplitItem {
            item: RageShared.Interfaces.Inventory.IInventoryItem;
            source: { component: "pockets" | "backpack"; slot: string };
            target: { component: "pockets" | "backpack"; count: number; slot: string };
        }
        interface IOpenItem {
            item: RageShared.Interfaces.Inventory.IInventoryItem;
            source: { component: "backpack" | "pockets"; slot: string };
        }
    }

    interface IncomingCEFEvents {
        inventory: {
            onMoveItem: (player: PlayerMp, data: StringifiedObject<RageShared.Interfaces.Inventory.IMoveItem>) => void;
            onUseItem: (player: PlayerMp, data: StringifiedObject<RageShared.Interfaces.Inventory.IUseItem>) => void;
            onGiveItem: (player: PlayerMp, data: StringifiedObject<{ playerId: number; item: RageShared.Interfaces.Inventory.IInventoryItem; source: { slot: string } }>) => void;
            onDropItem: (player: PlayerMp, data: StringifiedObject<RageShared.Interfaces.Inventory.IDropItem>) => void;
            onSplitItem: (player: PlayerMp, data: StringifiedObject<RageShared.Interfaces.Inventory.ISplitItem>) => void;
            confirmItemDrop: (player: PlayerMp) => void;
            onCancelItemDrop: (player: PlayerMp) => void;
            onOpenItem: (player: PlayerMp, data: StringifiedObject<RageShared.Interfaces.Inventory.IOpenItem>) => void;
        };

        auth: {
            register: (player: PlayerMp, data: StringifiedObject<{ username: string; email: string; password: string; confirmPassword: string }>) => void;
            loginPlayer: (player: PlayerMp, data: StringifiedObject<{ username: string; password: string }>) => void;
        };
    }
}
