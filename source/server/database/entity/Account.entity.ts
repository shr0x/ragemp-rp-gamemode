import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
