import "reflect-metadata";
import { DataSource } from "typeorm";
import { AccountEntity } from "./entity/Account.entity";
import { CharacterEntity } from "./entity/Character.entity";
import { DatabaseLogger } from "./Logger.module";
import { BanEntity } from "./entity/Ban.entity";

import * as dotenv from "dotenv";
import { InventoryItemsEntity } from "./entity/Inventory.entity";
import { VehicleEntity } from "./entity/Vehicle.entity";
import {BankAccountEntity} from "@entities/Bank.entity";

dotenv.config();
let beta = true;

const config = {
    connectionLimit: 100,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: !beta ? process.env.DB_BETA_PASSWORD : process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: 5432
};

const loggerConfig = {
    queryLogFilePath: "./dblogs/query-log.log",
    errorLogFilePath: "./dblogs/error.log",
    defaultLogFilePath: "./dblogs/default-log.log"
};

export const MainDataSource = new DataSource({
    type: "postgres",
    host: config.host,
    port: config.port,
    username: config.user,
    password: config.password,
    database: config.database,
    synchronize: true,
    connectTimeoutMS: config.connectTimeout,
    logging: ["error"],
    entities: [AccountEntity, CharacterEntity, BankAccountEntity, BanEntity, InventoryItemsEntity, VehicleEntity],
    migrations: [],
    subscribers: [],
    logger: DatabaseLogger.getInstance(loggerConfig)
});
