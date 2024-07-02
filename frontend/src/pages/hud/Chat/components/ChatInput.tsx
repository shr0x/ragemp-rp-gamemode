import { FC, useRef, useEffect, useCallback, useState, MutableRefObject } from "react";
import { observer } from "mobx-react-lite";
import cn from "classnames";
import EventManager from "utils/EventManager.util";
import { chatStore } from "store/Chat.store";

import enterIcon from "assets/images/hud/icons/enter.svg";
import style from "./input.module.scss";

interface ChatInputProps {
    store: typeof chatStore;
    chatFocusFunc: () => void;
    chatBlur: () => void;
    readonly chatRef: MutableRefObject<HTMLDivElement | null>;
    setChatOpacity: (opacity: number) => void;
}

const ChatInput: FC<ChatInputProps> = ({ store, chatFocusFunc, chatBlur, chatRef, setChatOpacity }) => {
    const [isFocused, setFocused] = useState(false);

    const [selection, setSelection] = useState<{ start: number; end: number }>({ start: 0, end: 0 });

    const [inputText, setInputText] = useState("");

    const [suggestedCommand, setSuggestedCommand] = useState("");

    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        //@ts-ignore
        window.chatAPI = {
            clear: () => {
                store.messages = [];
            },

            push: (text: string) => {
                store.fetchNewMessage(text);
                setChatOpacity(1.0);
                setTimeout(() => {
                    if (chatRef.current) chatRef.current.scrollTop = 1000000;
                }, 50);
            },

            activate: (toggle: boolean) => {
                store.setActive(toggle);
            },

            show: (toggle: boolean) => {
                store.setActive(toggle);
            }
        };

        //@ts-ignore
        if (typeof mp !== "undefined") {
            const api: Record<string, Function> = {
                //@ts-ignore
                "chat:push": window.chatAPI.push,
                //@ts-ignore
                "chat:clear": window.chatAPI.clear,
                //@ts-ignore
                "chat:activate": window.chatAPI.activate,
                //@ts-ignore
                "chat:show": window.chatAPI.show
            };

            for (const fn in api) {
                //@ts-ignore
                mp.events.add(fn, api[fn]);
            }
        }
    }, [store]);

    useEffect(() => {
        //@ts-ignore
        mp.trigger("setTypingInChatState", isFocused);
    }, [isFocused]);

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
    }, [inputText, store]);

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, [isFocused]);

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
        [isFocused, store]
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
                case "Tab": {
                    if (suggestedCommand) {
                        setInputText(suggestedCommand);
                        setSelection({ start: suggestedCommand.length, end: suggestedCommand.length });
                        event.preventDefault();
                    }
                    return;
                }
                default:
                    return;
            }
        },
        [store.lastMessages, store.historyCounter, inputText, isFocused, suggestedCommand]
    );

    const handleInputChange = useCallback((e: { target: { value: any } }) => {
        const value = e.target.value;
        setInputText(value);

        if (value.startsWith("/") && value.length > 3) {
            const match = store.commandList.find((cmd) => cmd.startsWith(value));
            setSuggestedCommand(match || "");
        } else {
            setSuggestedCommand("");
        }
    }, []);

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
                    onChange={handleInputChange}
                    maxLength={200}
                    tabIndex={-1}
                />
                {suggestedCommand && (
                    <div className={style.suggestion}>
                        <span className={style.suggestionHighlight}>{inputText}</span>
                        <span className={style.suggestionRest}>{suggestedCommand.slice(inputText.length)}</span>
                    </div>
                )}
                <img src={enterIcon} alt="enter" />
            </div>
        </div>
    );
};

export default observer(ChatInput);
