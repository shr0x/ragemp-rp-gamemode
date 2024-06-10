import { observable, makeAutoObservable } from "mobx";
import EventManager from "utils/EventManager.util";

interface IChatSettings {
    timestamp: boolean;
    fontsize: number;
    background: boolean;
}

class _ChatStore {
    isActive: boolean = false;

    commandList: string[] = observable.array(["/goto", "/help", "/ban", "/kick", "/mute", "/unmute"]);

    messages: string[] = observable.array([
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123'
    ]);

    lastMessages: string[] = observable.array([]);

    historyCounter: number = -1;

    settings: IChatSettings = observable.object({
        background: false,
        fontsize: 1.48888889,
        timestamp: false
    });

    constructor() {
        makeAutoObservable(this);
        this.createEvents();
    }

    setActive(data: boolean) {
        this.isActive = data;
    }

    updateLastMessages(text: string) {
        if (text.length > 0) {
            let message = text.trim();
            let history = [...this.lastMessages];

            history.unshift(message);
            if (history.length > 100) {
                history = history.slice(0, 100);
            }
            this.lastMessages = history;
        }
    }

    fetchNewMessage(obj: string) {
        this.messages.push(obj);
        if (this.messages.length > 150) this.messages.shift();
    }

    fetchCommandList(commands: string[]) {
        this.commandList = commands;
    }

    public createEvents() {
        EventManager.addHandler("chat", "setActive", (data: boolean) => this.setActive(data));
        EventManager.addHandler("chat", "setCommands", (data: string[]) => this.fetchCommandList(data));
        EventManager.stopAddingHandler("chat");
    }
}

export const chatStore = new _ChatStore();
