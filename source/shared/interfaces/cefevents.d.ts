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

    interface CefEventMap {
        notify: {
            show: { type: RageShared.Enums.NotifyType; message: string; skin: "light" | "dark" | "colored" };
        };
        player: {
            setCharacters: any[];
            setKeybindData: { [key: string]: string };
        };
        hud: {
            setInteraction: RageShared.Interfaces.InteractionData;
            setVehicleData: { key: keyof IVehicleData; data: any };
        };
        chat: {
            setCommands: string[];
        };
        inventory: {
            setVisible: boolean;
            setClothes: { [key: number]: RageShared.Interfaces.Inventory.IInventoryItem | null };
            setInventory: { [key: string]: { [key: number]: RageShared.Interfaces.Inventory.IInventoryItem | null } };
            setQuickUseItems: { [key: number]: { component: string; id: number } | null };
            setDroppedItems: { [key: number]: RageShared.Interfaces.Inventory.IInventoryItem | null };
            setMaxWeight: number;
        };
        auth: {};
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
