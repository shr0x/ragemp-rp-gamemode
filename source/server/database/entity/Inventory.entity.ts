import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { CharacterEntity } from "./Character.entity";

@Entity({ name: "inventory_items" })
export class InventoryItemsEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ type: "json" })
    clothes: { [key: number]: RageShared.Interfaces.Inventory.IInventoryItem | null } = {};

    @Column({ type: "json" })
    pockets: { [key: number]: RageShared.Interfaces.Inventory.IInventoryItem | null } = {};

    @Column({ type: "json" })
    quickUse: { [key: number]: null | { component: "pockets"; id: number } } = {};

    @OneToOne(() => CharacterEntity, (character) => character.items)
    character: CharacterEntity;
}
