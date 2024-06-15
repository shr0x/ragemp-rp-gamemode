interface ICefPages {
    [key: string]: {
        blur: boolean;
        radar: boolean;
        pause: boolean;
        controls: boolean;
        close: boolean;
        freezeCamera?: boolean;
    };
}
const CEFPages: ICefPages = {
    chat: { blur: false, radar: true, pause: true, controls: true, close: false },
    auth: { blur: true, radar: false, pause: false, controls: true, close: false },
    creator: { blur: false, radar: false, pause: false, controls: true, close: true },
    selectcharacter: { blur: true, radar: false, pause: false, controls: true, close: false },
    hud: { blur: false, radar: true, pause: false, controls: true, close: false },
    interactionMenu: { blur: false, radar: true, pause: false, controls: false, close: true },
    inventory: { blur: true, radar: false, pause: true, controls: true, close: true }
};
export { CEFPages };
