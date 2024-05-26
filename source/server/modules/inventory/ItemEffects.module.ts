export const startItemEffect = (player: PlayerMp, effectName: string, time: number, onFinish: (player: PlayerMp) => void) => {
    player.call("client::effect:start", [effectName, time]);
    setTimeout(() => onFinish(player), time);
};

export const stopItemEffect = (player: PlayerMp) => {
    player.call("client::effect:stop");
};
