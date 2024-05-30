import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { InventoryItemsEntity } from "./Inventory.entity";
import { Inventory } from "../../modules/inventory/Core.class";
import { CefEvent } from "../../classes/CEFEvent.class";
import { CommandRegistry } from "../../classes/Command.class";
import { AccountEntity } from "./Account.entity";

@Entity({ name: "characters" })
export class CharacterEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @OneToOne(() => AccountEntity, (account) => account.id)
    @JoinColumn()
    account: AccountEntity;

    @Column({ type: "int", width: 11, default: 0 })
    adminlevel: number = 0;

    @Column({ type: "jsonb", default: null })
    appearance = {
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

    public inventory: Inventory | null = null;

    public async save() {}

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
            player.setFaceFeature(i, data.face[i as keyof RageShared.Interfaces.CreatorFace] / 100);
        }

        //just so you know whats going on
        // //first category
        // player.setFaceFeature(0, data.face[0] / 100);
        // player.setFaceFeature(1, data.face[1] / 100);
        // player.setFaceFeature(2, data.face[2] / 100);
        // player.setFaceFeature(3, data.face[3] / 100);
        // player.setFaceFeature(4, data.face[4] / 100);
        // player.setFaceFeature(5, data.face[5] / 100);

        // //eye brows
        // player.setFaceFeature(6, data.face[6] / 100);
        // player.setFaceFeature(7, data.face[7] / 100);

        // //checkbone
        // player.setFaceFeature(8, data.face[8] / 100);
        // player.setFaceFeature(9, data.face[9] / 100);

        // //deepness of cheeks
        // player.setFaceFeature(10, data.face[10] / 100);

        // //eye width
        // player.setFaceFeature(11, data.face[11] / 100);

        // //other stuff
        // player.setFaceFeature(12, data.face[12] / 100);
        // player.setFaceFeature(13, data.face[13] / 100);
        // player.setFaceFeature(14, data.face[14] / 100);
        // player.setFaceFeature(15, data.face[15] / 100);
        // player.setFaceFeature(16, data.face[16] / 100);
        // player.setFaceFeature(17, data.face[17] / 100);
        // player.setFaceFeature(18, data.face[18] / 100);
        // player.setFaceFeature(19, data.face[19] / 100);
    }

    public loadInventory = function (player: PlayerMp) {
        if (!mp.players.exists(player) || !player.character) return;
        const inventoryData = player.character.items;

        const inventory = new Inventory(player, inventoryData.clothes, inventoryData.pockets, inventoryData.quickUse);
        player.character.inventory = inventory;
        player.character.inventory.loadInventory(player);
    };

    public async spawn(player: PlayerMp) {
        if (!player || !mp.players.exists(player) || !player.character) return;
        const { x, y, z, heading } = player.character.position;

        player.character.applyAppearance(player);
        player.character.loadInventory(player);

        CefEvent.emit(player, "player", "setKeybindData", { I: "Open Inventory", ALT: "Interaction" });

        await player.requestCollisionAt(x, y, z).then(() => {
            player.spawn(new mp.Vector3(x, y, z));
        });
        player.heading = heading;
        player.outputChatBox(`Welcome to !{red}RAGEMP ROLEPLAY!{white} ${player.name}!`);

        !player.character.lastlogin ? (player.character.lastlogin = new Date()) : player.outputChatBox(`Your last login was on ${player.character.lastlogin}`);

        player.character.lastlogin = new Date();

        CommandRegistry.reloadCommands(player);
    }

    public async getData(data: keyof CharacterEntity) {
        return this[data];
    }
}
