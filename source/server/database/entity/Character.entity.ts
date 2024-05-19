import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "characters" })
export class CharacterEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ type: "int", width: 11, default: -1 })
    accountid: number = -1;

    @Column({ type: "int", width: 11, default: 0 })
    adminlevel: number = 0;

    @Column({ type: "jsonb", default: null })
    appearance = {
        face: {
            noseWidth: 0,
            nosePeakHeight: 0,
            nosePeakLength: 0,
            noseBoneHeight: 0,
            nosePeakLowering: 0,
            noseBoneTwist: 0,
            eyebrowHeight: 0,
            eyebrowForward: 0,
            cheekboneHeight: 0,
            cheekboneWidth: 0,
            cheekWidth: 0,
            eyesWidth: 0,
            lips: 0,
            jawBoneWidth: 0,
            jawBoneBackLength: 0,
            ChimpBoneLowering: 0,
            ChimpBoneLength: 0,
            ChimpBoneWidth: 0,
            ChimpHole: 0,
            neckWidth: 0
        },
        parents: { father: 0, mother: 0, leatherMix: 0, similarity: 0 },
        hair: { head: 0, eyebrows: 0, chest: 0, beard: 0 },
        color: { head: 0, head_secondary: 0, eyebrows: 0, eyes: 0, chest: 0, beard: 0, lipstick: 0 }
    };

    @Column({ type: "varchar", length: 32 })
    name: string;

    @Column({ type: "int", width: 11, default: 0 })
    gender: number = 0;

    @Column({ type: "int", width: 11, default: 1 })
    level: number = 1;

    @Column({ type: "jsonb", default: null })
    position: { x: number; y: number; z: number; heading: number };

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

        //first category
        player.setFaceFeature(0, data.face.noseWidth / 100);
        player.setFaceFeature(1, data.face.nosePeakHeight / 100);
        player.setFaceFeature(2, data.face.nosePeakLength / 100);
        player.setFaceFeature(3, data.face.noseBoneHeight / 100);
        player.setFaceFeature(4, data.face.nosePeakLowering / 100);
        player.setFaceFeature(5, data.face.noseBoneTwist / 100);

        //eye brows
        player.setFaceFeature(6, data.face.eyebrowHeight / 100);
        player.setFaceFeature(7, data.face.eyebrowForward / 100);

        //checkbone
        player.setFaceFeature(8, data.face.cheekboneHeight / 100);
        player.setFaceFeature(9, data.face.cheekboneWidth / 100);

        //deepness of cheeks
        player.setFaceFeature(10, data.face.cheekWidth / 100);

        //eye width
        player.setFaceFeature(11, data.face.eyesWidth / 100);

        //other stuff
        player.setFaceFeature(12, data.face.lips / 100);
        player.setFaceFeature(13, data.face.jawBoneWidth / 100);
        player.setFaceFeature(14, data.face.jawBoneBackLength / 100);
        player.setFaceFeature(15, data.face.ChimpBoneLowering / 100);
        player.setFaceFeature(16, data.face.ChimpBoneLength / 100);
        player.setFaceFeature(17, data.face.ChimpBoneWidth / 100);
        player.setFaceFeature(18, data.face.ChimpHole / 100);
        player.setFaceFeature(19, data.face.neckWidth / 100);
    }

    public async spawn(player: PlayerMp) {
        if (!player || !mp.players.exists(player) || !player.character) return;
        const { x, y, z, heading } = player.character.position;
        player.character.applyAppearance(player);
        player.spawn(new mp.Vector3(x, y, z));
        player.heading = heading;
    }

    public async getData(data: keyof CharacterEntity) {
        return this[data];
    }
}
