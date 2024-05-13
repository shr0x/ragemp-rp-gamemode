import Browser from "./Browser.class";

class ChatAPI {
    sendModeCount: number = 0;

    arrayMessage: number = -1;
    chatOpen: boolean = false;

    constructor() {
        mp.console.logWarning("[CHAT] ChatAPI initialized!");
        mp.events.add("client::chat:newMessage", this.sendMessage.bind(this));
        mp.events.add("client::chat:close", this.close.bind(this));
        mp.events.add("client::chat:open", this.open.bind(this));

        mp.keys.bind(84, false, this.open.bind(this));
        mp.keys.bind(13, false, this.close.bind(this));
    }

    open = () => {
        try {
            if (Browser.currentPage && Browser.currentPage !== "death") return;
            Browser.processEvent("cef::chat:toggle", true);
            Browser.startPage("chat");
            this.chatOpen = true;
        } catch (err: unknown) {
            if (err instanceof TypeError) {
                mp.console.logWarning("Chat.Open Error: " + err.message, true, false);
            }
        }
    };

    close = () => {
        if (!this.chatOpen || Browser.currentPage !== "chat") return;
        this.chatOpen = false;
        Browser.processEvent("cef::chat:toggle", false);
        Browser.closePage();
    };

    sendMessage = (data: string) => {
        this.arrayMessage++;
        Browser.processEvent("cef::chat:newMessage", data);
    };
}

export default new ChatAPI();
