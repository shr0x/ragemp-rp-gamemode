class _WorldManager {
    private readonly dateNow = new Date();

    private secondTimerInterval: NodeJS.Timer;
    private minuteTimerInterval: NodeJS.Timer;
    private hourTimerInterval: NodeJS.Timer;

    constructor() {
        this.secondTimerInterval = setInterval(this.secondTimer.bind(this), 1_000);
        this.minuteTimerInterval = setInterval(this.secondTimer.bind(this), 60 * 1000);
        this.hourTimerInterval = setInterval(this.secondTimer.bind(this), 1_000);
    }

    private secondTimer() {
        const date = this.dateNow;
        const [hours, minute, second] = [date.getHours(), date.getMinutes(), date.getSeconds()];
        mp.world.time.set(hours, minute, second);
    }
    private minuteTimer() {}
    private hourTimer() {}
}
export const WorldManager = new _WorldManager();
