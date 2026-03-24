function createTaskProxy(player: PlayerMp): TaskCaller {
    return new Proxy({} as TaskCaller, {
        get(_, taskName: string) {
            return (...args: any[]) => {
                player.call(`client::task:${taskName}`, args);
            };
        }
    });
}

Object.defineProperty(mp.Player.prototype, "task", {
    get: function () {
        if (!this._taskProxy) {
            this._taskProxy = createTaskProxy(this);
        }
        return this._taskProxy;
    }
});