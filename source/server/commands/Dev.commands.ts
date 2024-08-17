import { RAGERP } from "@api";
import { inventorydataPresset } from "@modules/inventory/Assets.module";
import { RageShared } from "@shared/index";
import { NativeMenu } from "@classes/NativeMenu.class";

RAGERP.commands.add({
    name: "gotopos",
    description: "Teleport to a x y z",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    run: (player: PlayerMp, fulltext: string, x: string, y: string, z: string) => {
        if (!fulltext.length || !x.length || !y.length || !z.length) return player.outputChatBox("Usage: /gotopos [x] [y] [z]");

        player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
    }
});

RAGERP.commands.add({
    name: "savepos",
    aliases: ["getpos", "mypos"],
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    run: (player: PlayerMp) => {
        const [{ x, y, z }, heading] = [player.position, player.heading];
        console.log(`Position: new mp.Vector3(${x}, ${y}, ${z})`);
        console.log(`Heading: ${heading}`);
    }
});

RAGERP.commands.add({
    name: "settime",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    run: (player: PlayerMp, fulltext: string, time: string) => {
        mp.world.time.set(parseInt(time), 0, 0);
    }
});

RAGERP.commands.add({
    name: "sethealth",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    run: (player: PlayerMp, fulltext, health) => {
        player.health = parseInt(health);
    }
});

RAGERP.commands.add({
    name: "clearinventory",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    run: (player: PlayerMp, fulltext: string, targetid: string) => {
        let target = mp.players.at(parseInt(targetid));
        if (!target || !mp.players.exists(target) || !target.character || !target.character.inventory) return;

        target.character.inventory.items = {
            pockets: {
                ...inventorydataPresset.pockets,
                "12": {
                    type: RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PANTS, //"pants",
                    typeCategory: RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_CLOTHING,
                    hash: "f38fdbfb-fee5-4298-849e-222222",
                    key: 'pants {"component":4,"drawable":1,"texture":0}',
                    quality: -1,
                    image: "pants.svg",
                    render: "male/c_m_4_1_0.webp",
                    name: "Pants",
                    description: "Beast Pants Eva",
                    count: 1,
                    weight: 1,
                    maxStack: 1,
                    options: ["putOn", "drop", "trade"],
                    modelHash: "bkr_prop_duffel_bag_01a",
                    isPlaced: false,
                    gender: 0
                }
            },
            clothes: {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: null,
                7: null,
                8: null,
                9: null,
                10: null,
                11: null,
                12: null,
                13: null
            }
        };
        target.character.inventory.quickUse = inventorydataPresset.quickUse;
        target.character.inventory.reloadClothes(target);
        console.log(target.character.inventory.items);
    }
});

RAGERP.commands.add({
    name: "giveweapon",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    run: (player: PlayerMp, fulltext, weapon: RageShared.Inventory.Enums.ITEM_TYPES) => {
        if (!player.character || !player.character.inventory) return;
        const itemData = player.character.inventory.addItem(weapon);
        if (!itemData || itemData.typeCategory !== RageShared.Inventory.Enums.ITEM_TYPE_CATEGORY.TYPE_WEAPON) return;
        player.showNotify(
            itemData ? RageShared.Enums.NotifyType.TYPE_SUCCESS : RageShared.Enums.NotifyType.TYPE_ERROR,
            itemData ? `You received a ${itemData.name}` : `An error occurred giving u the item.`
        );
    }
});

RAGERP.commands.add({
    name: "setpage",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    run: (player: PlayerMp, fulltext, pagename) => {
        RAGERP.cef.emit(player, "system", "setPage", pagename);
    }
});

RAGERP.commands.add({
    name: "reloadclientside",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    run: (player: PlayerMp) => {
        //@ts-ignore
        mp.players.reloadResources();
    }
});

RAGERP.commands.add({
    name: "testnativemenu",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    run: async (player: PlayerMp) => {
        player.nativemenu = new NativeMenu(player, 0, "Hello World", "This is a description", [
            { name: "test", type: RageShared.Enums.NATIVEMENU_TYPES.TYPE_DEFAULT, uid: 123 },
            { name: "test 2", type: RageShared.Enums.NATIVEMENU_TYPES.TYPE_DEFAULT, uid: 1232 },
            { name: "test 3", type: RageShared.Enums.NATIVEMENU_TYPES.TYPE_DEFAULT, uid: 1232 }
        ]);

        player.nativemenu.onItemSelected(player).then((res) => {
            if (!res) return player.nativemenu?.destroy(player);
            const data = RAGERP.utils.parseObject(res);
            console.log("onItemSelected called, with result: ", data);

            switch (data.listitem) {
                case 0: {
                    console.log("player selected the first item in native menu");
                    return;
                }
                default: {
                    return console.log(`player selected index ${data.listitem} | name: ${data.name} | uid: ${data.uid}`);
                }
            }
        });
    }
});

RAGERP.commands.add({
    name: "testitem",
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    run: async (player: PlayerMp) => {
        if (!player.character || !player.character.inventory) return;

        const items = player.character.inventory.getItemsInCategoryByType([RageShared.Inventory.Enums.INVENTORY_CATEGORIES.POCKETS], RageShared.Inventory.Enums.ITEM_TYPES.ITEM_TYPE_PISTOL);
        if (!items.length) return;
        player.character.inventory.startUsingItem(
            player,
            "Press ESC to cancel this action",
            5,
            {
                item: items[0],
                animDict: "mini@repair",
                animName: "fixing_a_player",
                flag: 16,
                attachObject: "item_toolbox"
            },
            async () => {
                console.log("Hello world!");
            }
        );
    }
});

RAGERP.commands.add({
    adminlevel: RageShared.Enums.ADMIN_LEVELS.LEVEL_SIX,
    name: "testattach",
    run: (player: PlayerMp, fullText: string, item: string, isAttach: string) => {
        player.attachObject(item, parseInt(isAttach) !== 0);
    }
});
