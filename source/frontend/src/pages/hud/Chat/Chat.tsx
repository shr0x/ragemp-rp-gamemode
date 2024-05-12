import { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";

import EventManager from "utils/EventManager.util";
import ChatStore from "../../../stores/Chat.store";
import ChatInput from "./components/ChatInput";
import style from "./chat.module.scss";

let chatHideTimeout: NodeJS.Timeout | null = null;
let chatFadeInterval: NodeJS.Timeout | null = null;

function parseMessage(message: string): JSX.Element[] {
    const parts = message.split(/!{\w*}/);
    const colorRegex = /!{(\w+|\d+,\d+,\d+)}/;
    return parts.map((part, index) => {
        const colorMatch = part.match(colorRegex);
        let changestyle: React.CSSProperties = {};
        if (colorMatch) {
            const color = colorMatch[1];
            if (color.includes(",")) {
                const rgb = color.split(",");
                changestyle.color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
            } else {
                changestyle.color = color;
            }
        }
        return (
            <span className={style.message} style={changestyle} key={index}>
                {part}
            </span>
        );
    });
}

const Chat: React.FC<{ store: ChatStore; isVisible: boolean }> = ({ store, isVisible }) => {
    if (!store.isActive) return null;

    const [chatOpacity, setChatOpacity] = useState(1.0);
    const [timeVisibleChat, setTimeVisibleChat] = useState(10000);
    const chat = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const newMessageHandler = (obj: any) => {
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
        }, timeVisibleChat);
    }, [timeVisibleChat]);

    useEffect(() => {
        return () => {
            if (chatHideTimeout) clearTimeout(chatHideTimeout);
            if (chatFadeInterval) clearInterval(chatFadeInterval);
        };
    }, []);

    return (
        <div className={style.main} style={{ visibility: isVisible ? "visible" : "hidden" }}>
            <div ref={chat} className={style.content} style={{ opacity: chatOpacity }}>
                {store.messages.map((el, key) => (
                    <div className={style.text} key={key}>
                        <span className={style.message}>{parseMessage(el)}</span>
                    </div>
                ))}
            </div>
            <ChatInput store={store} chatFocusFunc={chatFocusFunc} chatBlur={chatBlur} />
        </div>
    );
};

export default observer(Chat);
