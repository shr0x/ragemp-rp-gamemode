import { InitChatEvents } from "./Chat.event";
import ChatStore from "../stores/Chat.store";

interface IStores {
    chatStore: ChatStore;
}

export const initializeEvents = (stores: IStores) => {
    InitChatEvents(stores.chatStore);
};
