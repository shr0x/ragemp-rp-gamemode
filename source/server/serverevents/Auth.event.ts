import { RAGERP } from "../api";
import { CefEvent } from "../classes/CEFEvent.class";
import { MainDataSource } from "../database/Database.module";
import { AccountEntity } from "../database/entity/Account.entity";
import crypto from "crypto";
import { CharacterEntity } from "../database/entity/Character.entity";

interface IPlayerLogin {
    username: string;
    password: string;
}

interface IPlayerRegister {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function hashPassword(text: string) {
    return crypto.createHash("sha256").update(text).digest("hex");
}

CefEvent.register("auth", "register", async (player: PlayerMp, data: string) => {
    const { username, email, password, confirmPassword }: IPlayerRegister = JSON.parse(data);

    if (username.length < 4 || username.length > 32) return player.showNotify("error", "Your username must be between 4 and 32 characters.");
    if (password.length < 5) return player.showNotify("error", "Your password must contain at least 5 characters.");
    if (password !== confirmPassword) return player.showNotify("error", "Password mismatch.");

    const accountExists = await MainDataSource.getRepository(AccountEntity).findOne({ where: { username, email } });
    if (accountExists) return player.showNotify("error", "Account username or email exists.");

    const accountData = new AccountEntity();

    accountData.username = username.toLowerCase();
    accountData.password = hashPassword(password);
    accountData.socialClubId = player.rgscId;
    accountData.email = email;

    const result = await MainDataSource.getRepository(AccountEntity).save(accountData);

    player.account = result;
    player.name = player.account.username;
    // player.setVariable("loggedin", true);
    // player.call("client::auth:destroyCamera");
    // player.call("client::cef:close");
    // spawnPlayer(player);
    // player.showNotify("success", `Account registered successfully! Welcome ${player.account.username}`);
});

CefEvent.register("auth", "loginPlayer", async (player: PlayerMp, data: string) => {
    const { username, password }: IPlayerLogin = JSON.parse(data);

    const accountData = await MainDataSource.getRepository(AccountEntity).findOne({ where: { username: username.toLowerCase() } });
    if (!accountData) return player.showNotify("error", "We could not find that account!");

    if (hashPassword(password) !== accountData.password) return player.showNotify("error", "Wrong password.");

    player.account = accountData;
    player.name = player.account.username;

    const characters = await RAGERP.database.getRepository(CharacterEntity).find({ where: { accountid: accountData.id }, take: 3 });
    const characterData = Array.from({ length: 3 }, () => ({ id: -1, name: "", level: 0, money: 0, bank: 0, lastlogin: "", type: 0 }));
    characters.forEach((x, idx) => {
        const character = { id: x.id, type: 1, name: x.name, bank: 0, money: 0, level: x.level, lastlogin: ".." };
        Object.assign(characterData[idx], character);
    });

    RAGERP.cef.emit(player, "player", "setCharacters", characterData);
    player.call("client::eventManager", ["cef::system:setPage", "selectcharacter"]);

    // spawnPlayer(player);
    // player.showNotify("success", `Welcome back, ${player.account.username}`);
});
