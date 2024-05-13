import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "characters" })
export class CharacterEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ type: "varchar", length: 32 })
    name: string;

    @Column({ type: "int", width: 11, default: 1 })
    level: number = 1;
}
