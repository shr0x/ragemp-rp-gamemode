import { makeObservable, observable, action } from "mobx";

interface IChatSettings {
    timestamp: boolean;
    fontsize: number;
    background: boolean;
}

export default class ChatStore {
    @observable
    isActive: boolean = false;

    @observable
    commandList: string[] = observable.array(["/goto", "/help", "/ban", "/kick", "/mute", "/unmute"]);

    @observable
    messages: string[] = observable.array([
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123',
        // 'this is a long <span style="color:red">test text hello 123</span>, this is a long test text hello 123, this is a long test text hello 123'
    ]);

    @observable
    lastMessages: string[] = observable.array([]);

    @observable
    historyCounter: number = -1;

    @observable
    settings: IChatSettings = observable.object({
        background: false,
        fontsize: 1.48888889,
        timestamp: false
    });

    constructor() {
        makeObservable(this);
    }

    @action.bound
    setActive(data: boolean) {
        this.isActive = data;
    }

    @action.bound
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

    @action.bound
    fetchNewMessage(obj: string) {
        this.messages.push(obj);
        if (this.messages.length > 150) this.messages.shift();
    }

    @action.bound
    fetchCommandList(commands: string[]) {
        this.commandList = commands;
    }
}
