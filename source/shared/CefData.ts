import { RageShared, StringifiedObject } from "./index";

export namespace CefData {
    export namespace Interfaces {
        export interface CefEventMap {
            system: {
                setPage: string;
            };
            notify: {
                show: { type: RageShared.Enums.NotifyType; message: string; skin: "light" | "dark" | "colored" };
            };
            player: {
                setCharacters: RageShared.Players.Interfaces.ICharacters[];
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
                setClothes: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null };
                setInventory: { [key: string]: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null } };
                setQuickUseItems: { [key: number]: { component: string; id: number } | null };
                setDroppedItems: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null };
                setMaxWeight: number;
            };
            auth: {};
        }
        export interface IncomingCEFEvents {
            inventory: {
                onMoveItem: (player: PlayerMp, data: StringifiedObject<RageShared.Inventory.Interfaces.IMoveItem>) => void;
                onUseItem: (player: PlayerMp, data: StringifiedObject<RageShared.Inventory.Interfaces.IUseItem>) => void;
                onGiveItem: (player: PlayerMp, data: StringifiedObject<{ playerId: number; item: RageShared.Inventory.Interfaces.IBaseItem; source: { slot: string } }>) => void;
                onDropItem: (player: PlayerMp, data: StringifiedObject<RageShared.Inventory.Interfaces.IDropItem>) => void;
                onSplitItem: (player: PlayerMp, data: StringifiedObject<RageShared.Inventory.Interfaces.ISplitItem>) => void;
                confirmItemDrop: (player: PlayerMp) => void;
                onCancelItemDrop: (player: PlayerMp) => void;
                onOpenItem: (player: PlayerMp, data: StringifiedObject<RageShared.Inventory.Interfaces.IOpenItem>) => void;
            };

            auth: {
                register: (player: PlayerMp, data: StringifiedObject<{ username: string; email: string; password: string; confirmPassword: string }>) => void;
                loginPlayer: (player: PlayerMp, data: StringifiedObject<{ username: string; password: string }>) => void;
            };

            creator: {
                naviation: (player: PlayerMp, data: string) => void;
                create: (player: PlayerMp, data: StringifiedObject<RageShared.Players.Interfaces.CreatorData>) => void;
            };

            chat: {
                sendMessage: (player: PlayerMp, message: string) => void;
            };

            hud: {
                interactResult: (player: PlayerMp, type: string) => void;
            };
        }
    }
    export namespace Enums {}
}
