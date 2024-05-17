import { RAGERP } from "../api";
import { CharacterEntity } from "../database/entity/Character.entity";

/**
 * When a player changes navigation in character creator, example going from general data to appearance
 */
RAGERP.cef.register("creator", "navigation", async (player: PlayerMp, name: string) => {
    name = JSON.parse(name);

    const cameraName = "creator_" + name;
    player.call("client::creator:changeCamera", [cameraName]);
    player.call("client::creator:changeCategory", [cameraName]);
});

/**
 * Executed when a player selects a character to spawn with
 */
RAGERP.cef.register("character", "select", async (player: PlayerMp, data: string) => {
    const id = JSON.parse(data);

    const character = await RAGERP.database.getRepository(CharacterEntity).findOne({ where: { id } });
    if (!character) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "An error occurred selecting your character.");

    player.character = character;

    player.setVariable("loggedin", true);
    player.call("client::auth:destroyCamera");
    player.call("client::cef:close");

    player.model = character.gender === 0 ? mp.joaat("mp_m_freemode_01") : mp.joaat("mp_f_freemode_01");
    player.name = player.character.name;
    await player.character.spawn(player);

    player.showNotify(RageShared.Enums.NotifyType.TYPE_SUCCESS, `Welcome, ${player.character.name}!`);
});
/**
 * Executes when a player choose to create a new character
 */
RAGERP.cef.register("character", "create", async (player: PlayerMp) => {
    player.call("client::auth:destroyCamera");

    player.call("client::creator:start");
    player.call("client::eventManager", ["cef::system:setPage", "creator"]);
});

/**
 * Executes when a player finishes creating a character.
 */
RAGERP.cef.register("creator", "create", async (player: PlayerMp, data: string) => {
    if (!player.account) return player.kick("An error has occurred!");

    const parseData = JSON.parse(data);
    const fullname = `${parseData.name.firstname} ${parseData.name.lastname}`;

    const nameisTaken = await RAGERP.database.getRepository(CharacterEntity).findOne({ where: { name: fullname } });
    if (nameisTaken) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "We're sorry but that name is already taken, choose another one.");

    const { sex, parents, hair, face, color }: RageShared.Interfaces.CreatorData = parseData;

    const characterLimit = await RAGERP.database.getRepository(CharacterEntity).find({ where: { accountid: player.account?.id }, take: 3 });

    if (characterLimit.length > 2) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "We're sorry but you already have three characters, you cannot create anymore.");

    const characterData = new CharacterEntity();
    characterData.accountid = player.account.id;
    characterData.appearance = { color, face, hair, parents };
    characterData.name = fullname;
    characterData.gender = sex;
    characterData.position = {
        x: -541.0401611328125,
        y: -1287.0777587890625,
        z: 26.901586532592773,
        heading: -118.70496368408203
    };

    const result = await RAGERP.database.getRepository(CharacterEntity).save(characterData);
    if (!result) return;

    player.name = fullname;
    player.character = result;

    player.call("client::creator:destroycam");
    player.call("client::cef:close");

    await player.character.spawn(player);
});
