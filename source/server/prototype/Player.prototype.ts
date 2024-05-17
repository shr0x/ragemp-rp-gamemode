import { CefEvent } from "../classes/CEFEvent.class";

mp.Player.prototype.showNotify = function (type: RageShared.Enums.NotifyType, message: string, skin: "light" | "dark" | "colored" = "dark") {
    return CefEvent.emit(this, "notify", "show", { type, message, skin });
};