import { FC, useRef, useEffect, useCallback, useState } from "react";
import { observer } from "mobx-react-lite";

import cn from "classnames";
import EventManager from "utils/EventManager.util";
import ChatStore from "../../../../stores/Chat.store";

import style from "./input.module.scss";

const ChatInput: FC<{ store: ChatStore; chatFocusFunc: any; chatBlur: any }> = ({ store, chatFocusFunc, chatBlur }) => {
    const [isFocused, setFocused] = useState(false),
        [selection, setSelection] = useState<{ start: number; end: number }>({ start: 0, end: 0 }),
        [inputText, setInputText] = useState("");

    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        EventManager.addHandler("chat", "setTextInput", (text: string) => setInputText(text));
        EventManager.addHandler("chat", "toggle", (bool: true) => {
            setFocused(bool);
            bool ? input.current?.focus() : input.current?.blur();
        });

        EventManager.addHandler("chat", "sendMessage", () => {
            EventManager.emitServer("chat", "sendMessage", String(inputText));
            store.updateLastMessages(String(inputText));
            setInputText("");
        });

        EventManager.addHandler("chat", "command", () => {
            setFocused(true);
            input.current?.focus();
            setInputText(`/`);
        });
    }, [inputText, store]);

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, [isFocused]);

    useEffect(() => {
        EventManager.addHandler("chat", "setLastMessage", (int: number) => {
            if (int === -1) setInputText("");
            else setInputText(store.lastMessages[int]);
        });
    }, [input, store.lastMessages]);

    const sendMessage = useCallback(
        (text: string) => {
            input.current?.blur();

            if (text.length === 0) {
                setInputText("");
                if (isFocused) EventManager.emitClient("chat", "close");
                setFocused(false);
                return;
            }
            EventManager.emitServer("chat", "sendMessage", text);
            store.updateLastMessages(text);
            setInputText("");
            store.historyCounter = -1;
            setFocused(false);
        },
        [] //eslint-disable-line
    );

    useEffect(() => {
        if (!selection || !input.current) return;
        const { start, end } = selection;
        input.current?.focus();
        input.current.setSelectionRange(start, end);
    }, [selection]);

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (!input.current || !isFocused) return;
            const start = input.current.selectionStart ?? 0;
            const end = input.current.selectionEnd ?? 0;

            switch (event.key) {
                case "Enter": {
                    sendMessage(inputText);
                    return;
                }
                case "ArrowUp": {
                    let counter = store.historyCounter;
                    counter++;
                    if (counter === store.lastMessages.length) return;
                    store.historyCounter = counter;
                    setInputText(store.lastMessages[counter]);
                    setTimeout(() => setSelection({ start: start + store.lastMessages[counter].length, end: end + store.lastMessages[counter].length }), 2);
                    return;
                }
                case "ArrowDown": {
                    let counter = store.historyCounter;
                    counter--;
                    if (counter < 0) return;
                    store.historyCounter = counter;
                    setInputText(store.lastMessages[counter]);
                    setTimeout(() => setSelection({ start: start + store.lastMessages[counter].length, end: end + store.lastMessages[counter].length }), 2);
                    return;
                }
                default:
                    return;
            }
        },
        [store.lastMessages, store.historyCounter, inputText, isFocused] // eslint-disable-line
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);

    return (
        <div className={cn(style.chatinput, !isFocused && style.chatinputDisabled)}>
            <div className={style.box}>
                <input
                    className={style.input}
                    type="text"
                    placeholder={isFocused ? "Insert Message..." : ""}
                    ref={input}
                    value={inputText}
                    onFocus={() => {
                        setFocused(true);
                        chatFocusFunc();
                    }}
                    onBlur={() => chatBlur()}
                    onChange={(e) => setInputText(e.target.value)}
                    maxLength={200}
                    tabIndex={-1}
                />
            </div>
        </div>
    );
};

export default observer(ChatInput);
