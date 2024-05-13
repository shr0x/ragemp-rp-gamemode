import { useEffect } from "react";
import EventManager from "../utils/EventManager.util";
import ChatStore from "../stores/Chat.store";

export const InitChatEvents = (chatStore: ChatStore) => {
    return useEffect(() => {
        EventManager.addHandler("chat", "setActive", (data: boolean) => chatStore.setActive(data));

        EventManager.stopAddingHandlers("chat");
        return () => EventManager.removeTargetHandlers("chat");
    }, [chatStore]);
};
