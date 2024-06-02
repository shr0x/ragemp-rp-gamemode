import { InitChatEvents } from "./Chat.event";
import { InitPlayerEvents } from "./Player.event";
import { InitHudEvents } from "./Hud.event";
import { InitInventoryEvents } from "./Inventory.event";
import PlayerStore from "store/Player.store";
import ChatStore from "../stores/Chat.store";
import HudStore from "store/Hud.store";
import InventoryStore from "store/Inventory.store";

interface IStores {
    chatStore: ChatStore;
    playerStore: PlayerStore;
    hudStore: HudStore;
    inventoryStore: InventoryStore;
}

export const initializeEvents = (stores: IStores) => {
    InitChatEvents(stores.chatStore);
    InitPlayerEvents(stores.playerStore);
    InitHudEvents(stores.hudStore);
    InitInventoryEvents(stores.inventoryStore);
};
