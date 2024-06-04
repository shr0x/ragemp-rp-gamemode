export const openInventoryItem = (player: PlayerMp, data: string) => {
    try {
        let { item }: { item: RageShared.Interfaces.Inventory.IBaseItem } = JSON.parse(data);
        if (!item) return;
        switch (item.type) {
            //backpack?...

            default:
                return;
        }
    } catch (err) {
        console.log("openInventoryItem err: ", err);
    }
};
