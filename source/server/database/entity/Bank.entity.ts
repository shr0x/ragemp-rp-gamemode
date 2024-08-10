import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CharacterEntity } from "@entities/Character.entity";

@Entity({ name: "bank_accounts" })
export class BankAccountEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ type: "boolean", default: false })
    isPrimary: boolean;

    @Column({ type: "int", width: 11, default: 0 })
    accountnumber: number;

    @Column({ type: "int", width: 11, default: 0 })
    pincode: number;

    @Column({ type: "int", width: 11, default: 0 })
    balance: number;

    @Column({ type: "varchar", length: 32, default: "" })
    accountholder: string;

    @ManyToOne(() => CharacterEntity, (char) => char.bank)
    character: CharacterEntity;
}
