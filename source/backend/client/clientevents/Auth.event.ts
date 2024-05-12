import BrowserClass from "../classes/Browser.class";
import Camera from "../classes/Camera.class";

function showLoginScreen() {
    Camera.createLoginCamera(717.3707275390625, 1201.9945068359375, 325.9500427246094);
    BrowserClass.processEvent("cef::system:setPage", "auth");
    mp.gui.cursor.show(true, true);
}

function destroyLoginCamera() {
    Camera.destroyCamera("login_camera");
}

mp.events.add("browserDomReady", (browser) => {
    if (browser === BrowserClass.mainUI) {
        mp.console.logWarning("Browser dom ready!");
        showLoginScreen();
    }
});

mp.events.add("client::auth:destroyCamera", destroyLoginCamera);
