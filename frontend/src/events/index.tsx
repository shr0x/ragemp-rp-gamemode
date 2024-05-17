import { InitChatEvents } from "./Chat.event";
import ChatStore from "../stores/Chat.store";
import PlayerStore from "store/Player.store";
import { InitPlayerEvents } from "./Player.event";
import HudStore from "store/Hud.store";
import {InitHudEvents} from "./Hud.event";

interface IStores {
    chatStore: ChatStore;
    playerStore: PlayerStore;
    hudStore: HudStore;
}

export const initializeEvents = (stores: IStores) => {
    InitChatEvents(stores.chatStore);
    InitPlayerEvents(stores.playerStore);
    InitHudEvents(stores.hudStore);
};
