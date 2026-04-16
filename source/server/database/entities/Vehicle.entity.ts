import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "vehicles" })
export class VehicleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", width: 10, nullable: true, default: null })
    owner_id: number | null;

    @Column({ type: "varchar", length: 50, nullable: true, default: null })
    owner_name: string | null;

    @Column({ type: "bigint", nullable: true })
    model: number;

    @Column({ type: "varchar", default: "" })
    modelname: string;

    @Column({ type: "int", width: 10, default: 0 })
    price: number;

    @Column({ type: "int", width: 10, default: -1 })
    class: number;

    @Column({ type: "int", width: 10, default: 100 })
    fuel: number;

    @Column({ type: "json" })
    primaryColor: Array3d = [255, 255, 255];

    @Column({ type: "json" })
    secondaryColor: Array3d = [255, 255, 255];

    @Column({ type: "int", width: 10, default: 100 })
    dashboardColor: number;

    @Column({ type: "int", width: 10, default: 100 })
    interiorColor: number;

    @Column({ type: "int", width: 10, default: 0 })
    neon: number;

    @Column({ type: "jsonb" })
    neonColor: Array3d = [255, 255, 255];

    @Column({ type: "int", width: 10, default: 100 })
    livery: number;

    @Column({ type: "int", width: 10, default: 100 })
    extra: number;

    @Column({ type: "json" })
    wheelmods: { type: number; mod: number; color: number } = { type: -1, mod: 0, color: 0 };

    @Column({ type: "varchar", length: 8, default: "" })
    plate: string;

    @Column({ type: "int", width: 10, nullable: true, default: null })
    plate_color: number;

    @Column({ type: "int", default: 0 })
    is_locked: number;

    @Column({ type: "jsonb" })
    position: { x: number; y: number; z: number; a: number };

    @Column({ type: "json" })
    modifications: { [key: number]: number };

    @Column({ type: "int", width: 10, default: 0 })
    primaryColorType: number | null;

    @Column({ type: "int", width: 10, default: 0 })
    secondaryColorType: number | null;

    @Column({ type: "int", width: 10, default: 0 })
    dimension: number;

    @Column({ type: "int", default: 0 })
    isWanted: number;

    // @Column({ type: "json" })
    // inventory: any;

    @Column({ type: "varchar", length: 50, nullable: true, default: null })
    faction: string | null = null;

    @Column({ type: "varchar", length: 129, nullable: true, default: null })
    keyhole: string | null = null;

    @Column({ type: "int", width: 11, default: 0 })
    impoundState: number = 0;
}
