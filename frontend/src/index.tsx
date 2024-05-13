import React from "react";
import ReactDOM from "react-dom/client";
import EventManager from "utils/EventManager.util";

import App from "./App";
import { configure } from "mobx";

import "./styles/init.scss";
import "./styles/fonts.scss";

const isDev = process.env.NODE_ENV === "development";

configure({
    useProxies: "ifavailable",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: false,
    enforceActions: "never"
});

const parseObject = (obj: any) => {
    try {
        return JSON.parse(obj);
    } catch (e) {
        return obj;
    }
};

// @ts-ignore
if (isDev && !window.mp) {
    //@ts-ignore
    window.mp = {
        trigger: (...args: any) => {},
        events: {
            add: (...args: any) => {},
            addProc: async (...args: any) => {}
        }
    };
}

function processHandlerCall(event: string, ...args: any) {
    for (let i = 0; i < args.length; i++) {
        args[i] = parseObject(args[i]);
    }
    EventManager.callHandler(event, ...args);
}

//@ts-ignore
window.callHandler = processHandlerCall;
mp.events.add("cef::eventManager", processHandlerCall);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
