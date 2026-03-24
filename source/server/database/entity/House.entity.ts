import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CharacterEntity } from "./Character.entity";

@Entity()
export class HouseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'json' })
    enterPosition: Vector3 | null = null;

    @Column({ type: 'json' })
    exitPosition: Vector3 | null = null;

    @Column({ type: 'int', default: 0 })
    price: number;

    @Column({ type: 'int', default: 0 })
    dimension: number;

    @OneToOne(() => CharacterEntity, (character) => character.house, { cascade: true, onDelete: "CASCADE" })
    owner: number;

    @Column({ type: 'varchar', length: 50, default: 'State' })
    ownerName: string;

    @Column({ type: 'int', default: 0 })
    class: number;

}