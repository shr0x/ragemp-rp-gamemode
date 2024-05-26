import { Browser } from "./Browser.class";

/**
 * Manages the chat functionality, including opening, closing, and sending messages.
 */
class ChatAPI {
    sendModeCount: number = 0;
    arrayMessage: number = -1;
    chatOpen: boolean = false;

    /**
     * Initializes the ChatAPI and sets up event handlers and key bindings.
     */
    constructor() {
        mp.console.logWarning("[CHAT] ChatAPI initialized!");
        mp.events.add("client::chat:newMessage", this.sendMessage.bind(this));
        mp.events.add("client::chat:close", this.close.bind(this));
        mp.events.add("client::chat:open", this.open.bind(this));

        mp.keys.bind(84, false, this.open.bind(this)); // Bind "T" key to open chat
        mp.keys.bind(13, false, this.close.bind(this)); // Bind "Enter" key to close chat
    }

    /**
     * Opens the chat interface.
     * Binds the function to the "T" key.
     */
    public open() {
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
    }

    /**
     * Closes the chat interface.
     * Binds the function to the "Enter" key.
     */
    public close() {
        if (!this.chatOpen || Browser.currentPage !== "chat") return;
        this.chatOpen = false;
        Browser.processEvent("cef::chat:toggle", false);
        Browser.closePage();
    }

    /**
     * Sends a new message to the chat interface.
     * @param {string} data - The message data to send.
     */
    public sendMessage(data: string) {
        this.arrayMessage++;
        Browser.processEvent("cef::chat:newMessage", data);
    }
}

export default new ChatAPI();
