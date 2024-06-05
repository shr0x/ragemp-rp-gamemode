import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CharacterEntity } from "./Character.entity";

@Entity({ name: "accounts" })
export class AccountEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ type: "varchar", length: 32 })
    username: string;

    @Column({ type: "varchar", length: 129 })
    password: string;

    @Column({ type: "varchar", length: 52 })
    email: string;

    @Column({ type: "varchar", length: 52 })
    socialClubId: string;

    @OneToMany(() => CharacterEntity, (char) => char.account)
    characters: CharacterEntity[];
}
