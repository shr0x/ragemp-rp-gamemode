import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "characters" })
export class CharacterEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ type: "int", width: 11, default: -1 })
    accountid: number = -1;

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
            neckWidth: 0,
            eyeMakeup: -1,
            faceMakeup: -1,
            lipstickID: 0
        },
        parents: { father: 0, mother: 0, leatherMix: 0, similarity: 0 },
        hair: { head: 0, eyebrows: 0, chest: 0, beard: 0 },
        color: { head: 0, head_secondary: 0, eyebrows: 0, eyes: 0, chest: 0, beard: 0, eyeMakeup: 0, faceMakeup: 0, lipstick: 0 }
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

    public async spawn() {
        const { x, y, z, heading } = this.position;
    }

    public async getData(data: keyof CharacterEntity) {
        return this[data];
    }
}
