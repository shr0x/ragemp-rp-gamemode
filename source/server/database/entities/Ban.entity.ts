import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "bans" })
export class BanEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ type: "varchar", length: 255, nullable: true, default: null })
    ip: string;

    @Column({ type: "varchar", length: 255, nullable: true, default: null })
    rsgId: string;

    @Column({ type: "varchar", length: 255, nullable: true, default: null })
    username: string;

    @Column({ type: "varchar", length: 255, nullable: true, default: null })
    serial: string;

    @Column({ type: "varchar", length: 255, nullable: true, default: null })
    reason: string;

    @Column({ type: "varchar", length: 255, nullable: true, default: null })
    bannedBy: string;

    @Column({ type: "int", width: 11, default: 0 })
    bannedByLevel: number;

    @Column({ type: "varchar", length: 255, nullable: true, default: null })
    lifttime: string;
}
