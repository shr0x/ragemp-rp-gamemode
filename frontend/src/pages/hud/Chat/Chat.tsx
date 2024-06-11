import { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import EventManager from "utils/EventManager.util";
import ChatInput from "./components/ChatInput";
import style from "./chat.module.scss";
import { chatStore } from "store/Chat.store";

let chatHideTimeout: NodeJS.Timeout | null = null;
let chatFadeInterval: NodeJS.Timeout | null = null;

const Chat: React.FC<{ store: typeof chatStore; isVisible: boolean }> = ({ store, isVisible }) => {
    const [chatOpacity, setChatOpacity] = useState(1.0);
    const [chatVisibility, setchatVisibility] = useState(10000);
    const chat = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const newMessageHandler = (obj: string) => {
            store.fetchNewMessage(obj);
            setChatOpacity(1.0);
            setTimeout(() => {
                if (chat.current) chat.current.scrollTop = 1000000;
            }, 50);
        };

        const keydownHandler = (e: KeyboardEvent) => {
            if (e.keyCode === 32 && e.target === document.body) {
                e.preventDefault();
            }
        };

        EventManager.addHandler("chat", "newMessage", newMessageHandler);
        window.addEventListener("keydown", keydownHandler);

        return () => {
            window.removeEventListener("keydown", keydownHandler);
        };
    }, [store]);

    const chatFocusFunc = useCallback(() => {
        setChatOpacity(1);
        if (chatHideTimeout) {
            clearTimeout(chatHideTimeout);
            chatHideTimeout = null;
            if (chatFadeInterval) clearInterval(chatFadeInterval);
        }
    }, []);

    const chatBlur = useCallback(() => {
        if (chatHideTimeout) {
            clearTimeout(chatHideTimeout);
            chatHideTimeout = null;
            if (chatFadeInterval) clearInterval(chatFadeInterval);
        }
        chatHideTimeout = setTimeout(() => {
            chatFadeInterval = setInterval(() => {
                setChatOpacity((prevOpacity) => {
                    const newOpacity = prevOpacity - 0.1;
                    if (newOpacity > 0.6) {
                        return newOpacity;
                    } else {
                        clearInterval(chatFadeInterval!);
                        return 0.6;
                    }
                });
            }, 20);
        }, chatVisibility);
    }, [chatVisibility]);

    useEffect(() => {
        return () => {
            if (chatHideTimeout) clearTimeout(chatHideTimeout);
            if (chatFadeInterval) clearInterval(chatFadeInterval);
        };
    }, []);
    if (!store.isActive) return null;

    return (
        <div className={style.main} style={{ visibility: isVisible ? "visible" : "hidden" }}>
            <div ref={chat} className={style.content} style={{ opacity: chatOpacity, backgroundColor: store.settings.background ? "#000000aa" : "transparent" }}>
                {store.messages.map((el, key) => (
                    <div className={style.text} key={key}>
                        <span className={style.message} style={{ fontSize: `${store.settings.fontsize}vh` }} dangerouslySetInnerHTML={{ __html: el }} />
                    </div>
                ))}
            </div>
            <ChatInput store={store} chatFocusFunc={chatFocusFunc} chatBlur={chatBlur} chatRef={chat} setChatOpacity={setChatOpacity} />
        </div>
    );
};

export default observer(Chat);
