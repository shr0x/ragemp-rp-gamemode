import BrowserClass from "../classes/Browser.class";

mp.events.add("browserDomReady", (browser) => {
    if (browser === BrowserClass.mainUI) {
        mp.console.logWarning("Browser dom ready!");
        BrowserClass.processEvent("cef::system:setPage", "auth");
        mp.gui.cursor.show(true, true);
    }
});
