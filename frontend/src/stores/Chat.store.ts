import { makeObservable, observable, action } from "mobx";

export default class ChatStore {
    @observable isActive: boolean = true;
    @observable messages: string[] = observable.array([]);

    @observable lastMessages: string[] = observable.array([]);
    @observable historyCounter: number = -1;

    constructor() {
        makeObservable(this);
    }

    @action.bound setActive(data: boolean) {
        this.isActive = data;
    }

    @action.bound updateLastMessages(text: string) {
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

    @action.bound fetchNewMessage(obj: string) {
        this.messages.push(obj);
        if (this.messages.length > 150) this.messages.shift();
    }
}
