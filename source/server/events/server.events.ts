
mp.events.add("server::client:debug", (player, message: string, ...args: any) => {
    if (!process.env.DEBUG_MODE) return;
    console.log(message, ...args);
});
