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
export const CEFPages: ICefPages = {
    chat: { blur: false, radar: true, pause: true, controls: true, close: false },
    auth: { blur: true, radar: false, pause: false, controls: true, close: false }
};
