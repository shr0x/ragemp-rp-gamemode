import crypto from "crypto";
import { RAGERP } from "@api";
import { AccountEntity } from "@entities/Account.entity";
import { CharacterEntity } from "@entities/Character.entity";
import { RageShared } from "@shared/index";
function hashPassword(text: string) {
    return crypto.createHash("sha256").update(text).digest("hex");
}

RAGERP.cef.register("auth", "register", async (player, data) => {
    const { username, email, password, confirmPassword } = RAGERP.utils.parseObject(data);

    if (username.length < 4 || username.length > 32) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Your username must be between 4 and 32 characters.");
    if (password.length < 5) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Your password must contain at least 5 characters.");
    if (password !== confirmPassword) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Password mismatch.");

    const accountExists = await RAGERP.database.getRepository(AccountEntity).findOne({ where: { username, email } });
    if (accountExists) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Account username or email exists.");

    const accountData = new AccountEntity();

    accountData.username = username.toLowerCase();
    accountData.password = hashPassword(password);
    accountData.socialClubId = player.rgscId;
    accountData.email = email;
    accountData.characters = [];

    const result = await RAGERP.database.getRepository(AccountEntity).save(accountData);

    player.account = result;
    player.name = player.account.username;

    const characterData: RageShared.Players.Interfaces.ICharacters[] = Array.from({ length: 3 }, () => ({ id: -1, name: "", level: 0, money: 0, bank: 0, lastlogin: "", type: 0 }));

    RAGERP.cef.emit(player, "player", "setCharacters", characterData);
    RAGERP.cef.emit(player, "system", "setPage", "selectcharacter");
});

RAGERP.cef.register("auth", "loginPlayer", async (player, data) => {
    const { username, password } = RAGERP.utils.parseObject(data);

    const accountData = await RAGERP.database.getRepository(AccountEntity).findOne({ where: { username: username.toLowerCase() } });
    if (!accountData) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "We could not find that account!");

    if (hashPassword(password) !== accountData.password) return player.showNotify(RageShared.Enums.NotifyType.TYPE_ERROR, "Wrong password.");

    player.account = accountData;
    player.name = player.account.username;

    const characters = await RAGERP.database.getRepository(CharacterEntity).find({ where: { account: { id: accountData.id } }, take: 3 });
    const characterData: RageShared.Players.Interfaces.ICharacters[] = Array.from({ length: 3 }, () => ({ id: -1, name: "", level: 0, money: 0, bank: 0, lastlogin: "", type: 0 }));

    characters.forEach((x, idx) => {
        const character = { id: x.id, type: 1, name: x.name, bank: 0, money: 0, level: x.level, lastlogin: ".." };
        Object.assign(characterData[idx], character);
    });

    RAGERP.cef.emit(player, "player", "setCharacters", characterData);
    RAGERP.cef.emit(player, "system", "setPage", "selectcharacter");
});
