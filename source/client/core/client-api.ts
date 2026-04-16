import { Browser } from "@services/browser.service";
import { CEFPages } from "@assets/cef-pages.assets";
import { Camera } from "@services/camera.service";
import { PlayerClient } from "@services/client.service";
import { ChatAPI } from "@services/chat.service";

/**
 * Client-side API for RAGERP.
 * Provides access to game functionalities and entity management.
 * @namespace Client
 */
export namespace RAGERP.Client {

    export const local = PlayerClient;

    export const browser = Browser;

    // Additional client-side functionalities can be added here

    export const assets = {
        cefpages: CEFPages
    };

    export const services = {
        // Add other services here as needed
        camera: Camera,
        chat: ChatAPI,

    };


}