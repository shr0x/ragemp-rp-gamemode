import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountEntity } from "./Account.entity";

@Entity({ name: "characters" })
export class CharacterEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ type: "varchar", length: 32 })
    name: string;

    @Column({ type: "int", width: 11, default: 1 })
    level: number = 1;

    @ManyToOne(() => AccountEntity, (account) => account.characters, { eager: true })
    account: AccountEntity;
}
