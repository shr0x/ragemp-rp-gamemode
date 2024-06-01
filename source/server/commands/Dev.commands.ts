import { RAGERP } from "@api";
import { InteractionMenu } from "@classes/Interaction.class";
import { inventorydataPresset } from "@modules/inventory/Assets.module";

RAGERP.commands.add({
    name: "ped",
    run: (player: PlayerMp) => {
        const ped = mp.peds.new(mp.joaat("mp_m_freemode_01"), player.position, { dynamic: true, invincible: false, lockController: true, dimension: 0 });
        player.giveWeapon(mp.joaat("weapon_pistol"), 1000);
        ped.controller = player;
    }
});
RAGERP.commands.add({
    name: "savepos",
    aliases: ["getpos", "mypos"],
    run: (player: PlayerMp) => {
        const [{ x, y, z }, heading] = [player.position, player.heading];
        console.log(`Position: new mp.Vector3(${x}, ${y}, ${z})`);
        console.log(`Heading: ${heading}`);
    }
});

RAGERP.commands.add({
    name: "interact",
    run: async (player: PlayerMp, fulltext) => {
        const data = {
            isActive: true,
            items: [
                { type: 0, id: 0, text: "Whatever" },
                { type: 0, id: 1, text: "Whatever 1" },
                { type: 0, id: 2, text: "Whatever 2" }
            ]
        };

        player.interactionMenu = new InteractionMenu();
        await player.interactionMenu.new(player, data).then((res) => {
            console.log(res);
        });
    }
});

RAGERP.commands.add({
    name: "getvar",
    run: (player: PlayerMp) => {}
});

RAGERP.commands.add({
    name: "testinv",
    run: (player: PlayerMp) => {
        player.call("client::inventory:setVisible", [true]);
    }
});

RAGERP.commands.add({
    name: "clearinventory",
    run: (player: PlayerMp, fulltext: string, targetid: string) => {
        let target = mp.players.at(parseInt(targetid));
        if (!target || !mp.players.exists(target) || !target.character || !target.character.inventory) return;

        target.character.inventory.items = {
            pockets: {
                ...inventorydataPresset.pockets,
                "12": {
                    type: RageShared.Enums.ITEM_TYPES.ITEM_TYPE_PANTS, //"pants",
                    typeCategory: RageShared.Enums.ITEM_TYPE_CATEGORY.TYPE_CLOTHING,
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
    run: (player: PlayerMp, fulltext, weapon: RageShared.Enums.ITEM_TYPES) => {
        if (!player.character || !player.character.inventory) return;
        const itemData = player.character.inventory.addItem(weapon);
        if (!itemData || itemData.typeCategory !== RageShared.Enums.ITEM_TYPE_CATEGORY.TYPE_WEAPON) return;
        player.showNotify(
            itemData ? RageShared.Enums.NotifyType.TYPE_SUCCESS : RageShared.Enums.NotifyType.TYPE_ERROR,
            itemData ? `You received a ${itemData.name}` : `An error occurred giving u the item.`
        );
    }
});

RAGERP.commands.add({
    name: "playerweapons",
    run: (player: PlayerMp) => {
        console.log(player.weapons);
    }
});

RAGERP.commands.add({
    name: "giveitem",
    run: (player: PlayerMp, fulltext, item: RageShared.Enums.ITEM_TYPES, count: string) => {
        if (!player.character || !player.character.inventory) return;
        const itemData = player.character.inventory.addItem(item);

        if (itemData) {
            itemData.count = isNaN(parseInt(count)) ? 0 : parseInt(count);
            if (!itemData.options.includes("split") && itemData.count > 1) itemData.options.push("split");
        }
        player.showNotify(
            itemData ? RageShared.Enums.NotifyType.TYPE_SUCCESS : RageShared.Enums.NotifyType.TYPE_ERROR,
            itemData ? `You received a ${itemData.name} (x${itemData.count})` : `An error occurred giving u the item.`
        );
    }
});

RAGERP.commands.add({
    name: "giveclothes",
    run: (player: PlayerMp, fulltext: string, item: RageShared.Enums.ITEM_TYPES, comp: string, drawable: string, texture: string) => {
        if (!player.character || !player.character.inventory) return;
        const itemData = player.character.inventory.addClothingItem(item, { component: parseInt(comp), drawable: parseInt(drawable), texture: parseInt(texture) });

        player.showNotify(
            itemData ? RageShared.Enums.NotifyType.TYPE_SUCCESS : RageShared.Enums.NotifyType.TYPE_ERROR,
            itemData ? `You received a ${itemData.name}` : `An error occurred giving u the item.`
        );
    }
});

RAGERP.commands.add({
    name: "testcrawl",
    run: (player: PlayerMp) => {
        player.call("testcrawl");
    }
});
