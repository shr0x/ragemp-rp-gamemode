import { RageShared, StringifiedObject } from "./index";

export namespace CefData {
    export namespace Interfaces {
        export interface IAdminPanelPlayer {
            id: number;
            name: string;
            ping: number;
            health: number;
            armour: number;
            adminLevel?: number;
        }

        export interface IAdminPanelStats {
            onlinePlayers: number;
            onlineAdmins: number;
            serverUptime: string;
        }

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
                showInteractionButton: RageShared.Interfaces.IInteractButton | null;
            };
            nativemenu: {
                setData: RageShared.Interfaces.INativeMenu;
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
            admin: {
                setVisible: boolean;
                setPlayers: IAdminPanelPlayer[];
                setStats: IAdminPanelStats;
                setSelectedPlayer: IAdminPanelPlayer | null;
                setLoading: boolean;

                setInventoryVisible: boolean;
                setInventoryTarget: { id: number; name: string } | null;
                setInventoryClothes: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null };
                setInventoryQuickUse: { [key: number]: { component: string; id: number } | null };
                setInventoryData: { [key: string]: { [key: number]: RageShared.Inventory.Interfaces.IBaseItem | null } };
                setInventoryMaxWeight: number;
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

            settings: {
                changePassword: (player: PlayerMp, data: StringifiedObject<{ old: string; new: string }>) => void;
            };

            chat: {
                sendMessage: (player: PlayerMp, message: string) => void;
            };

            hud: {
                interactResult: (player: PlayerMp, type: string) => void;
            };

            admin: {
                requestOpen: (player: PlayerMp) => void;
                requestPlayers: (player: PlayerMp) => void;
                selectPlayer: (player: PlayerMp, targetId: number) => void;
                kickPlayer: (player: PlayerMp, targetId: number, reason: string) => void;
                freezePlayer: (player: PlayerMp, targetId: number, state: boolean) => void;
                gotoPlayer: (player: PlayerMp, targetId: number) => void;
                bringPlayer: (player: PlayerMp, targetId: number) => void;
                healPlayer: (player: PlayerMp, targetId: number) => void;
                armourPlayer: (player: PlayerMp, targetId: number) => void;
                inspectInventory: (player: PlayerMp, data: { targetId: number }) => void;
                removeInventoryItem: (player: PlayerMp, data: { targetId: number; itemHash: string }) => void;
            };
        }
    }

    export namespace Enums { }
}