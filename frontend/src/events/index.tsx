import { InitChatEvents } from "./Chat.event";
import ChatStore from "../stores/Chat.store";
import PlayerStore from "store/Player.store";
import { InitPlayerEvents } from "./Player.event";
import HudStore from "store/Hud.store";
import { InitHudEvents } from "./Hud.event";
import InventoryStore from "store/Inventory.store";
import { InitInventoryEvents } from "./Inventory.event";

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
