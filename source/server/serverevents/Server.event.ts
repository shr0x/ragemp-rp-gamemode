mp.events.add("server::client:debug", (player, message: string, ...args: any) => {
    console.log(message, ...args);
});
