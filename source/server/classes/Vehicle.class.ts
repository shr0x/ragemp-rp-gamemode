import { v4 as uuidv4 } from "uuid";
import { RAGERP } from "@api";
import { vehicleClasses, vehicleModelSeats } from "@assets/Vehicle.assets";
import { VehicleEntity } from "@entities/Vehicle.entity";
import { RageShared } from "@shared/index";

const defaultVehicleData: RageShared.Vehicles.Interfaces.IVehicleData = {
    locked: false,
    engine: false,
    numberplate: "",
    fuel: 50,
    keyhole: uuidv4(),
    sqlid: null,
    faction: null,
    primaryColor: [255, 255, 255],
    secondaryColor: [255, 255, 255],
    owner: null,
    ownerName: null,
    trunkState: false,
    hoodState: false,
    price: 0,
    inventory: null,
    impoundState: 0
};

const defaultVehicleMods: RageShared.Vehicles.Interfaces.IVehicleMods = {
    tunningMods: {},
    plateColor: 0,
    wheelType: -1,
    wheelMod: 0,
    neonColor: null,
    hasNeon: false,
    primaryColorType: 0,
    secondaryColorType: 0,
    smokecolor: { r: 255, g: 255, b: 255 },
    dashboardcolor: 0,
    interiorcolor: 0,
    dirtlevel: 0,
    windows: { 0: false, 1: false, 2: false, 3: false }
};
/** A list of all vehicles. */
const vehiclePool: Vehicle[] = [];

class Vehicle {
    /** The type of the vehicle. */
    type: RageShared.Vehicles.Enums.VEHICLETYPES;

    /** The vehicle object from the game engine. */
    _vehicle: VehicleMp;

    /** Data associated with the vehicle. */
    _data: RageShared.Vehicles.Interfaces.IVehicleData = defaultVehicleData;

    /** Modifications applied to the vehicle. */
    _mods: RageShared.Vehicles.Interfaces.IVehicleMods = defaultVehicleMods;

    /** Indicates if the vehicle is wanted by the police. */
    isWanted: boolean = false;

    /** The type of tyre used by the vehicle. */
    tyre_type: number;

    /**
     * Creates an instance of Vehicle.
     * @param {RageShared.Vehicles.Enums.VEHICLETYPES} type - The type of the vehicle.
     * @param {string | number} model - The model of the vehicle.
     * @param {Vector3} position - The position where the vehicle spawns.
     * @param {number} heading - The heading (direction) the vehicle faces.
     * @param {number} dimension - The dimension in which the vehicle exists.
     * @param {RageShared.Vehicles.Interfaces.IVehicleData} [data=defaultVehicleData] - The data associated with the vehicle.
     * @param {RageShared.Vehicles.Interfaces.IVehicleMods | null} [mods=null] - The modifications applied to the vehicle.
     */
    constructor(
        type: RageShared.Vehicles.Enums.VEHICLETYPES,
        model: string | number,
        position: Vector3,
        heading: number,
        dimension: number,
        data: RageShared.Vehicles.Interfaces.IVehicleData = defaultVehicleData,
        mods: RageShared.Vehicles.Interfaces.IVehicleMods | null = null
    ) {
        this._vehicle = mp.vehicles.new(typeof model === "string" ? mp.joaat(model) : model, position, {
            dimension,
            numberPlate: data.numberplate ?? "",
            locked: data.locked,
            engine: data.engine,
            heading: heading,
            color: [data.primaryColor, data.secondaryColor]
        });

        this.type = type;
        this._data = data;
        this._mods = mods ? mods : defaultVehicleMods;

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key as keyof RageShared.Vehicles.Interfaces.IVehicleData];
                this.setData(key as keyof RageShared.Vehicles.Interfaces.IVehicleData, value);
            }
        }

        for (const key in this._mods) {
            if (this._mods.hasOwnProperty(key)) {
                const value = this._mods[key as keyof RageShared.Vehicles.Interfaces.IVehicleMods];
                this.setMod(key as keyof RageShared.Vehicles.Interfaces.IVehicleMods, value);
            }
        }

        if (this.isValid()) {
            this.createMods();
        }
        vehiclePool.push(this);
    }

    /**
     * Sets a modification on the vehicle.
     * @param {keyof RageShared.Vehicles.Interfaces.IVehicleMods} key - The key of the modification.
     * @param {RageShared.Vehicles.Interfaces.IVehicleMods[keyof RageShared.Vehicles.Interfaces.IVehicleMods]} value - The value of the modification.
     */
    public setMod<K extends keyof RageShared.Vehicles.Interfaces.IVehicleMods>(key: K, value: RageShared.Vehicles.Interfaces.IVehicleMods[K]): void {
        this._mods[key] = value;
        if (this._vehicle && mp.vehicles.exists(this._vehicle)) {
            if (key !== "tunningMods") {
                this._vehicle.setVariable(key, value);
            }

            if (key === "windows") {
                mp.players.callInRange(this._vehicle.position, mp.config["stream-distance"], "client::vehicle:setWindowState", [this._vehicle.id, value]);
            }

            if (key === "dirtlevel") {
                mp.players.callInRange(this._vehicle.position, mp.config["stream-distance"], "client::vehicle:setDirtLevel", [this._vehicle.id, value]);
            }
        }
    }

    /**
     * Gets a modification from the vehicle.
     * @param {keyof RageShared.Vehicles.Interfaces.IVehicleMods} key - The key of the modification.
     * @returns {RageShared.Vehicles.Interfaces.IVehicleMods[keyof IVehicRageShared.Vehicles.Interfaces.IVehicleModsleMods]} - The value of the modification.
     */
    public getMod<K extends keyof RageShared.Vehicles.Interfaces.IVehicleMods>(key: K): RageShared.Vehicles.Interfaces.IVehicleMods[K] {
        return this._mods[key];
    }
    /**
     * Gets data from the vehicle.
     * @param {keyof RageShared.Vehicles.Interfaces.IVehicleData} key - The key of the data.
     * @returns {RageShared.Vehicles.Interfaces.IVehicleData[keyof RageShared.Vehicles.Interfaces.IVehicleData]} - The value of the data.
     */
    public getData<K extends keyof RageShared.Vehicles.Interfaces.IVehicleData>(key: K): RageShared.Vehicles.Interfaces.IVehicleData[K] {
        return this._data[key];
    }
    /**
     * Sets data on the vehicle.
     * @param {keyof RageShared.Vehicles.Interfaces.IVehicleData} key - The key of the data.
     * @param {RageShared.Vehicles.Interfaces.IVehicleData[keyof RageShared.Vehicles.Interfaces.IVehicleData]} value - The value of the data.
     */
    public setData<K extends keyof RageShared.Vehicles.Interfaces.IVehicleData>(key: K, value: RageShared.Vehicles.Interfaces.IVehicleData[K]): void {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle)) return;

        console.log(`[VEHICLEDATA]:: ${this._vehicle.id} setting ${key} to ${value}`);

        this._data[key] = value;
        this._vehicle.setVariable(key, value);

        switch (key) {
            case "engine": {
                this._vehicle.engine = typeof value === "boolean" ? value : false;
                break;
            }
            case "locked": {
                this._vehicle.locked = typeof value === "boolean" ? value : false;
                break;
            }
            case "hoodState": {
                mp.players.callInRange(this._vehicle.position, mp.config["stream-distance"], "client::vehicle:setHoodState", [this._vehicle.id, value]);
                break;
            }
            case "trunkState": {
                mp.players.callInRange(this._vehicle.position, mp.config["stream-distance"], "client::vehicle:setTrunkState", [this._vehicle.id, value]);
                break;
            }
            case "primaryColor": {
                this._vehicle.setColorRGB(...this.getData("primaryColor"), ...this._vehicle.getColorRGB(1));
                break;
            }
            case "secondaryColor": {
                this._vehicle.setColorRGB(...this._vehicle.getColorRGB(0), ...this.getData("secondaryColor"));
                break;
            }

            case "numberplate": {
                this._vehicle.numberPlate = value;
                break;
            }

            default: {
                break;
            }
        }
    }
    /**
     * Gets the model of the vehicle.
     * @returns {number} - The model of the vehicle.
     */
    public getId(): number | null {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle)) return null;
        return this._vehicle.id;
    }

    /**
     * Gets the model of the vehicle.
     * @returns {number} - The model of the vehicle.
     */
    public getModel(): number {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle)) return 0;
        return this._vehicle.model;
    }

    /**
     * Gets the type of the vehicle.
     * @returns {RageShared.Vehicles.Enums.VEHICLETYPES} - The type of the vehicle.
     */
    public getType(): RageShared.Vehicles.Enums.VEHICLETYPES {
        return this.type;
    }

    /**
     * Gets the model name of the vehicle.
     * @param {PlayerMp} player - The player requesting the model name.
     * @returns {Promise<string | null>} - The model name of the vehicle.
     */
    public async getModelName(player: PlayerMp): Promise<string | null> {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle)) return null;
        let result = await player.callProc("client::proc:getVehicleModelName", [this._vehicle.id]);
        return result;
    }

    /**
     * Gets the passengers of the vehicle.
     * @param {number} vehicleModelHash - The model hash requesting data.
     * @returns {number} - The number of passengers the vehicle can hold.
     */
    public getPassengers(vehicleModelHash: number): number {
        const vehicleData = vehicleModelSeats.find((x) => x.vehicleHash === vehicleModelHash);
        return vehicleData?.seats ?? 0;
    }

    /**
     * Gets the faction of the vehicle.
     * @returns {string | null} - The faction of the vehicle.
     */
    public getFaction(): string | null {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle)) return null;
        if (this.type !== RageShared.Vehicles.Enums.VEHICLETYPES.FACTION) return null;
        return this._data.faction;
    }

    /**
     * Gets the owner name of vehicle.
     * @returns {string | null} - The owner of the vehicle.
     */
    public getOwner(): string | null {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle)) return null;
        if (this.type !== RageShared.Vehicles.Enums.VEHICLETYPES.OWNED) return null;
        return this._data.ownerName;
    }

    /**
     * Gets the SQL ID of the vehicle.
     * @returns {number | null} - The SQL ID of the vehicle.
     */
    public getSQL(): number | null {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle)) return null;
        return this._data.sqlid;
    }

    /**
     * Checks if the vehicle is valid.
     * @returns {boolean} - Whether the vehicle is valid.
     */
    public isValid(): boolean {
        if (
            [
                RageShared.Vehicles.Enums.VEHICLETYPES.ADMIN,
                RageShared.Vehicles.Enums.VEHICLETYPES.RENTAL,
                RageShared.Vehicles.Enums.VEHICLETYPES.JOB,
                RageShared.Vehicles.Enums.VEHICLETYPES.NONE
            ].includes(this.type)
        ) {
            return false;
        }
        return true;
    }

    /**
     * Destroys the vehicle.
     */
    public destroy() {
        if (this._vehicle && mp.vehicles.exists(this._vehicle)) {
            this._vehicle.destroy();
        }

        const findIndex = vehiclePool.indexOf(this);
        if (findIndex !== -1) {
            vehiclePool.splice(findIndex, 1);
        }
    }

    /**
     * Sets the modification color of the vehicle.
     */
    public setModColor() {
        if (!this._vehicle || !mp.vehicles.exists(this._vehicle)) return;
        mp.players.forEachInRange(this._vehicle.position, mp.config["stream-distance"], (entity) => {
            if (entity && mp.players.exists(entity) && entity.getVariable("loggedin")) {
                entity.call("client::vehicle:setModColor", [this._vehicle.id]);
            }
        });
    }

    /**
     * Applies vehicle modifications.
     */
    public createMods() {
        try {
            if (!mp.vehicles.exists(this._vehicle)) return;
            this._vehicle.neonEnabled = false;
            this._vehicle.windowTint = 0;

            for (let i = 0; i < 80; i++) this._vehicle.setMod(i, -1);

            if (this._mods.plateColor !== null && typeof this._mods.plateColor === "number") {
                this._vehicle.numberPlateType = this._mods.plateColor;
            }
            if (this._mods.wheelType !== null && typeof this._mods.wheelType === "number") {
                this._vehicle.wheelType = this._mods.wheelType;
            }
            if (this._mods.hasNeon && this._mods.neonColor) {
                this._vehicle.setNeonColor(...this._mods.neonColor);
            }

            if (this._data.primaryColor) {
                let [oldr, oldg, oldb] = this._vehicle.getColorRGB(1);
                this._vehicle.setColorRGB(this._data.primaryColor[0], this._data.primaryColor[1], this._data.primaryColor[2], oldr, oldg, oldb);
            }

            if (this._data.secondaryColor) {
                let [oldr, oldg, oldb] = this._vehicle.getColorRGB(0);
                this._vehicle.setColorRGB(oldr, oldg, oldb, this._data.secondaryColor[0], this._data.secondaryColor[1], this._data.secondaryColor[2]);
            }

            this.setModColor();

            if (this._mods.tunningMods) {
                let vehiclemods = this._mods.tunningMods;

                for (let tune in vehiclemods) {
                    const modIndex = parseInt(tune);
                    if (typeof modIndex !== "number" || isNaN(modIndex)) continue;

                    if (modIndex >= 100) continue;
                    if (modIndex === 18) this._vehicle.setVariable("boost", 1.3);
                    if (modIndex === RageShared.Vehicles.Enums.VEHICLEMODS.WINDOW_TINT) {
                        this._vehicle.windowTint = vehiclemods[modIndex];
                    } else this._vehicle.setMod(parseInt(tune), vehiclemods[modIndex]);
                }
            }
        } catch (err) {
            console.log("createMods err: ", err);
        }
    }

    /**
     * Reloads the modifications on the vehicle.
     */
    public reloadMods() {
        this.createMods();
    }

    /**
     * Gets an item slot component by its hash key.
     * @param {string} hashKey - The hash key of the item.
     * @returns {{ slot: number; item: any } | null} - The item slot component.
     */
    public getItemSlotComponentByHash(hashKey: string): { slot: number; item: any } | null {
        const inventory = this.getData("inventory");
        if (!inventory) return null;
        let foundItem: { slot: number; item: any } | null = null;
        for (const [key, value] of Object.entries<any>(inventory)) {
            if (!value.hash) continue;
            if (value.hash === hashKey) {
                foundItem = { slot: parseInt(key), item: value };
                break;
            }
        }

        return foundItem;
    }

    /**
     * Inserts a vehicle into the database.
     * @param {VehicleMp} vehicle - The vehicle to insert.
     * @param {string} modelName - The model name of the vehicle.
     * @param {number} price - The price of the vehicle.
     */
    public async insertVehicle(vehicle: VehicleMp, modelName: string, price: number) {
        const serverVehicle = vehicleManager.at(vehicle.id);
        if (!serverVehicle) return;

        let vehicleEntity = new VehicleEntity();
        vehicleEntity.modelname = modelName;
        vehicleEntity.class = vehicleClasses.find((x) => x.vehicleHash === vehicle.model)?.vehicleClass ?? 0;
        vehicleEntity.fuel = serverVehicle.getData("fuel");
        vehicleEntity.price = price;
        vehicleEntity.primaryColor = vehicle.getColorRGB(0);
        vehicleEntity.secondaryColor = vehicle.getColorRGB(1);
        vehicleEntity.owner_id = serverVehicle.getData("owner");
        vehicleEntity.owner_name = serverVehicle.getData("ownerName");
        vehicleEntity.model = vehicle.model;
        vehicleEntity.plate = vehicle.numberPlate;
        vehicleEntity.is_locked = vehicle.locked === true ? 1 : 0;
        vehicleEntity.dimension = vehicle.dimension;
        vehicleEntity.isWanted = serverVehicle.isWanted === true ? 1 : 0;
        vehicleEntity.position = { x: vehicle.position.x, y: vehicle.position.y, z: vehicle.position.z, a: vehicle.heading };
        vehicleEntity.keyhole = serverVehicle.getData("keyhole");
        vehicleEntity.modifications = { 18: -1 };
        await RAGERP.database.getRepository(VehicleEntity).save(vehicleEntity);
    }

    /**
     * Checks if a vehicle class is a windowed vehicle.
     * @param {number} vehicleClass - The class of the vehicle.
     * @returns {boolean} - Whether the vehicle class is windowed.
     */
    public isWindowedVehicle(vehicleClass: number): boolean {
        if (
            [
                RageShared.Vehicles.Enums.VEHICLE_CLASS.BOATS,
                RageShared.Vehicles.Enums.VEHICLE_CLASS.CYCLES,
                RageShared.Vehicles.Enums.VEHICLE_CLASS.UTILITY,
                RageShared.Vehicles.Enums.VEHICLE_CLASS.MOTORCYCLES,
                RageShared.Vehicles.Enums.VEHICLE_CLASS.OPEN_WHEEL
            ].includes(vehicleClass)
        )
            return false;
        return true;
    }
}

const vehicleManager = {
    /**
     * Saves the vehicle to the database.
     * @param {VehicleMp} vehicle - The vehicle to save.
     */
    async saveVehicle(vehicle: VehicleMp) {
        const serverVehicle = vehicleManager.at(vehicle.id);
        if (!serverVehicle || !serverVehicle.isValid() || !serverVehicle._vehicle || !mp.vehicles.exists(serverVehicle._vehicle)) return;

        const vehicleSQL = serverVehicle.getData("sqlid");

        if (vehicleSQL === null) return;

        await RAGERP.database.getRepository(VehicleEntity).update(
            { id: vehicleSQL },
            {
                owner_id: serverVehicle.getData("owner"),
                owner_name: serverVehicle.getData("ownerName"),
                model: serverVehicle._vehicle.model,
                fuel: serverVehicle.getData("fuel"),
                plate: serverVehicle.getData("numberplate"),
                neon: serverVehicle._mods.hasNeon === true ? 1 : 0,
                neonColor: serverVehicle._mods.neonColor ? serverVehicle._mods.neonColor : [255, 255, 255],
                primaryColor: serverVehicle.getData("primaryColor"),
                secondaryColor: serverVehicle.getData("secondaryColor"),
                plate_color: serverVehicle._mods.plateColor ?? 0,
                is_locked: serverVehicle.getData("locked") === true ? 1 : 0,
                dimension: vehicle.dimension,
                isWanted: serverVehicle.isWanted === true ? 1 : 0,
                position: { x: vehicle.position.x, y: vehicle.position.y, z: vehicle.position.z, a: vehicle.heading },
                wheelmods: {
                    color: 0,
                    mod: serverVehicle._mods.wheelMod,
                    type: serverVehicle._mods.wheelType
                },
                modifications: serverVehicle.getMod("tunningMods"),
                primaryColorType: serverVehicle.getMod("primaryColorType"),
                secondaryColorType: serverVehicle.getMod("secondaryColorType"),
                keyhole: serverVehicle.getData("keyhole"),
                impoundState: serverVehicle.getData("impoundState")
            }
        );
    },

    /**
     * Finds a vehicle by ragemp vehicle api ID.
     * @param {number} id - The ID of the vehicle.
     * @returns {Vehicle | null} - The found vehicle or null.
     */
    at(id: number): Vehicle | null {
        let foundvehicle: Vehicle | null = null;
        const vehicles = vehiclePool;
        for (const vehicle of vehicles) {
            if (vehicle._vehicle && mp.vehicles.exists(vehicle._vehicle) && vehicle._vehicle.id === id) {
                foundvehicle = vehicle;
                break;
            }
        }
        return foundvehicle;
    },

    /**
     * Finds a vehicle by its SQL ID.
     * @param {number} id - The SQL ID of the vehicle.
     * @returns {Vehicle | null} - The found vehicle or null.
     */
    atSQL(id: number): Vehicle | null {
        let foundvehicle: Vehicle | null = null;
        const vehicles = vehiclePool;
        for (const vehicle of vehicles) {
            if (vehicle._vehicle && mp.vehicles.exists(vehicle._vehicle) && vehicle.getData("sqlid") === id) {
                foundvehicle = vehicle;
                break;
            }
        }
        return foundvehicle;
    },

    /**
     * Checks if a vehicle is in the world.
     * @param {number} id - The ID of the vehicle.
     * @param {boolean} [isOwned=false] - Whether the vehicle is owned.
     * @returns {VehicleMp | null} - The found vehicle or null.
     */
    isInWorld(id: number, isOwned: boolean = false): VehicleMp | null {
        const vehicle = vehicleManager.atSQL(id);
        if (vehicle && vehicle._vehicle) return vehicle._vehicle;
        return null;
    },

    /**
     * Gets the nearest vehicle to a player within a certain radius.
     * @param {PlayerMp} player - The player to find the nearest vehicle to.
     * @param {number} radius - The radius to search within.
     * @returns {Vehicle | null} - The nearest vehicle or null.
     */
    getNearest(player: PlayerMp, radius: number): Vehicle | null {
        for (const vehicle of vehiclePool) {
            if (vehicle && vehicle._vehicle && mp.vehicles.exists(vehicle._vehicle)) {
                if (RAGERP.utils.distanceToPos(player.position, vehicle._vehicle.position) > radius) continue;
                return vehicle;
            }
        }
        return null;
    }
};

export { vehiclePool, Vehicle, vehicleManager };
