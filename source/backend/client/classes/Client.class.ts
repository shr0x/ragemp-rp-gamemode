class _Client {
    disabledKeys: number[] = [];
    onTickEvent: EventMp | null = null;

    constructor() {
        this.onTickEvent = new mp.Event("render", this.onTick.bind(this));
    }

    public disableKey(isMoveOrLookUp: boolean, key: number) {
        this.disabledKeys.push(key);
        mp.game.controls.setDisableControlActionBatch(isMoveOrLookUp, this.disabledKeys);
    }

    private onTick() {
        mp.game.controls.applyDisableControlActionBatch();
    }
}

export const Client = new _Client();
