import { InitChatEvents } from "./Chat.event";
import ChatStore from "../stores/Chat.store";
import PlayerStore from "store/Player.store";
import { InitPlayerEvents } from "./Player.event";

interface IStores {
    chatStore: ChatStore;
    playerStore: PlayerStore;
}

export const initializeEvents = (stores: IStores) => {
    InitChatEvents(stores.chatStore);
    InitPlayerEvents(stores.playerStore);
};
