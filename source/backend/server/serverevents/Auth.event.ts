import { CefEvent } from "../classes/CEFEvent.class";
import { MainDataSource } from "../database/Database.module";
import { AccountEntity } from "../database/entity/Account.entity";
import * as crypto from "crypto";

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

    if (password.length < 5) return player.showNotify("error", "Your password must contain at least 5 characters.");
    if (password !== confirmPassword) return player.showNotify("error", "Password mismatch.");

    const accountExists = await MainDataSource.getRepository(AccountEntity).findOne({ where: { username, email } });
    if (accountExists) return player.showNotify("error", "Account username or email exists.");

    const accountData = new AccountEntity();

    accountData.username = username;
    accountData.password = hashPassword(password);
    accountData.socialClubId = player.rgscId;
    accountData.email = email;

    const result = await MainDataSource.getRepository(AccountEntity).save(accountData);

    player.account = result;
    player.name = player.account.username;
    player.setVariable("loggedin", true);

    player.call("client::cef:close");
    player.showNotify("success", `Account registered successfully! Welcome ${player.account.username}`);
});

CefEvent.register("auth", "loginPlayer", async (player: PlayerMp, data: string) => {
    const { username, password }: IPlayerLogin = JSON.parse(data);

    const accountData = await MainDataSource.getRepository(AccountEntity).findOne({ where: { username } });
    if (!accountData) return player.showNotify("error", "We could not find that account!");

    if (hashPassword(password) !== accountData.password) return player.showNotify("error", "Wrong password.");

    player.account = accountData;
    player.name = player.account.username;

    player.call("client::cef:close");
    player.showNotify("success", `Welcome back, ${player.account.username}`);

    player.call("client::cef:close");
});
