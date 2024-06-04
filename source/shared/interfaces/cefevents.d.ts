declare namespace RageShared.Cef {
    namespace Interfaces {
        interface CefEventMap {
            system: {
                showPage: string;
            };
            notify: {
                show: { type: RageShared.Enums.NotifyType; message: string; skin: "light" | "dark" | "colored" };
            };
            player: {
                setCharacters: any[];
                setKeybindData: { [key: string]: string };
            };
            hud: {
                setInteraction: RageShared.Interfaces.InteractionData;
                setVehicleData: { key: keyof RageShared.Vehicles.Interfaces.SpeedometerData; data: any };
                showInteractionButton: { button: string; title: string; text: string } | null;
            };
            chat: {
                setCommands: string[];
            };
            inventory: {
                setVisible: boolean;
                setClothes: { [key: number]: RageShared.Interfaces.Inventory.IBaseItem | null };
                setInventory: { [key: string]: { [key: number]: RageShared.Interfaces.Inventory.IBaseItem | null } };
                setQuickUseItems: { [key: number]: { component: string; id: number } | null };
                setDroppedItems: { [key: number]: RageShared.Interfaces.Inventory.IBaseItem | null };
                setMaxWeight: number;
            };
            auth: {};
        }
        interface IncomingCEFEvents {
            inventory: {
                onMoveItem: (player: PlayerMp, data: StringifiedObject<RageShared.Interfaces.Inventory.IMoveItem>) => void;
                onUseItem: (player: PlayerMp, data: StringifiedObject<RageShared.Interfaces.Inventory.IUseItem>) => void;
                onGiveItem: (player: PlayerMp, data: StringifiedObject<{ playerId: number; item: RageShared.Interfaces.Inventory.IBaseItem; source: { slot: string } }>) => void;
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
    namespace Enums {}
}
