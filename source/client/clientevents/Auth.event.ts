import { Utils } from "../../shared/Utils.module";
import { Camera } from "../classes/Camera.class";
import { Browser } from "../classes/Browser.class";

const loginCameras = [
    { from: new mp.Vector3(-392.0152587890625, -2195.9765625, 204.3353729248047), to: new mp.Vector3(-126.2790298461914, -1274.2332763671875, 173.96531677246094), rot: 132.75473022460938 },
    { from: new mp.Vector3(-1252.8284912109375, -1805.2391357421875, 19.733186721801758), to: new mp.Vector3(-1599.369873046875, -1187.55078125, 37.93876266479492), rot: 132.75473022460938 },
    { from: new mp.Vector3(-2710.405517578125, 2500.914306640625, 58.51343536376953), to: new mp.Vector3(-1596.3924560546875, 2653.988037109375, 24.990520477294922), rot: 132.75473022460938 }
];

function showLoginScreen() {
    const camera = Utils.getRandomFromArray(loginCameras);

    Camera.createLoginCamera(camera.from, camera.to, camera.rot);
    Browser.processEvent("cef::system:setPage", "auth");
    mp.gui.cursor.show(true, true);
}

function destroyLoginCamera() {
    Camera.destroyCamera("login_camera");
}

mp.events.add("browserDomReady", (browser) => {
    if (browser === Browser.mainUI) {
        mp.console.logWarning("Browser dom ready!");
        showLoginScreen();
    }
});

mp.events.add("client::auth:destroyCamera", destroyLoginCamera);
