import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { InventoryItemsEntity } from "./Inventory.entity";
import { Inventory } from "@modules/inventory/Core.class";
import { CefEvent } from "@classes/CEFEvent.class";
import { CommandRegistry } from "@classes/Command.class";
import { AccountEntity } from "./Account.entity";
import { setPlayerToInjuredState } from "@events/Death.event";
import { RageShared } from "@shared/index";
import { BankAccountEntity } from "@entities/Bank.entity";

@Entity({ name: "characters" })
export class CharacterEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @ManyToOne(() => AccountEntity, (account) => account.id)
    account: AccountEntity;

    @Column({ type: "int", width: 11, default: 0 })
    adminlevel: number = 0;

    @Column({ type: "jsonb", default: null })
    appearance: Omit<RageShared.Players.Interfaces.CreatorData, "name" | "sex"> = {
        face: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0 },
        parents: { father: 0, mother: 0, leatherMix: 0, similarity: 0 },
        hair: { head: 0, eyebrows: 0, chest: 0, beard: 0 },
        color: { head: 0, head_secondary: 0, eyebrows: 0, eyes: 0, chest: 0, beard: 0, lipstick: 0 }
    };

    @Column({ type: "timestamp", nullable: true })
    lastlogin: Date | null = null;

    @Column({ type: "varchar", length: 32 })
    name: string;

    @Column({ type: "int", width: 11, default: 0 })
    gender: number = 0;

    @Column({ type: "int", width: 11, default: 1 })
    level: number = 1;

    @Column({ type: "jsonb", default: null })
    position: { x: number; y: number; z: number; heading: number };

    @OneToOne(() => InventoryItemsEntity, (items) => items.character, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn()
    items: InventoryItemsEntity;

    @Column({ type: "int", width: 11, default: 0 })
    wantedLevel: number = 0;

    @Column({ type: "int", width: 11, default: 0 })
    deathState: RageShared.Players.Enums.DEATH_STATES = RageShared.Players.Enums.DEATH_STATES.STATE_NONE;

    @Column({ type: "int", width: 11, default: 1500 })
    cash: number = 1500;

    @OneToMany(() => BankAccountEntity, (bank) => bank.character)
    bank: BankAccountEntity[];

    public inventory: Inventory | null = null;

    constructor() {}

    public async save(player: PlayerMp) {}

    public applyAppearance(player: PlayerMp) {
        if (!player || !mp.players.exists(player) || !player.character) return;
        const data = player.character.appearance;

        const gender = player.model === mp.joaat("mp_m_freemode_01");
        player.setHeadBlend(data.parents.mother, data.parents.father, 4, data.parents.mother, data.parents.father, 0, (data.parents.similarity / 100) * -1, (data.parents.leatherMix / 100) * -1, 0);
        player.setHairColor(data.color.head, typeof data.color.head_secondary === "undefined" ? 0 : data.color.head_secondary);

        if (gender) {
            player.setHeadOverlay(1, [data.hair.beard, 1, data.color.beard, data.color.beard]);
        } else {
            player.setHeadOverlay(1, [data.hair.beard, 0, 1, 1]);
            player.setHeadOverlay(10, [data.hair.chest, 0, 1, 1]);
        }

        player.eyeColor = data.color.eyes;
        player.setClothes(2, data.hair.head, 0, 0);

        for (let i = 0; i < 20; i++) {
            player.setFaceFeature(i, data.face[i as keyof RageShared.Players.Interfaces.CreatorFace] / 100);
        }
    }

    public loadInventory = function (player: PlayerMp) {
        if (!mp.players.exists(player) || !player.character) return;
        const inventoryData = player.character.items;
        player.character.inventory = new Inventory(player, inventoryData.clothes, inventoryData.pockets, inventoryData.quickUse);
        player.character.inventory.loadInventory(player);
    };

    public setStoreData<K extends keyof RageShared.Players.Interfaces.IPlayerData>(player: PlayerMp, key: K, value: RageShared.Players.Interfaces.IPlayerData[K]) {
        return player.call("client::eventManager", ["cef::player:setPlayerData", key, value]);
    }

    public async spawn(player: PlayerMp) {
        if (!player || !mp.players.exists(player) || !player.character) return;
        const { x, y, z, heading } = player.character.position;

        player.character.applyAppearance(player);
        player.character.loadInventory(player);

        player.character.setStoreData(player, "ping", player.ping);
        player.character.setStoreData(player, "wantedLevel", player.character.wantedLevel);

        player.setVariable("adminLevel", player.character.adminlevel);

        CefEvent.emit(player, "player", "setKeybindData", { I: "Open Inventory", ALT: "Interaction" });

        await player.requestCollisionAt(x, y, z).then(() => {
            player.spawn(new mp.Vector3(x, y, z));
        });
        player.heading = heading;

        if (player.character.deathState === RageShared.Players.Enums.DEATH_STATES.STATE_INJURED) {
            setPlayerToInjuredState(player);
        }
        player.outputChatBox(`Welcome to !{red}RAGEMP ROLEPLAY!{white} ${player.name}!`);
        if (player.character.adminlevel) {
            player.outputChatBox(`>>> You are logged in as !{green}LEVEL ${player.character.adminlevel}!{white} admin!`);
        }

        player.character.setStoreData(player, "cash", player.character.cash);

        !player.character.lastlogin ? (player.character.lastlogin = new Date()) : player.outputChatBox(`Your last login was on ${player.character.lastlogin}`);

        player.character.lastlogin = new Date();
        CommandRegistry.reloadCommands(player);
    }

    public async getData(data: keyof CharacterEntity) {
        return this[data];
    }
}
