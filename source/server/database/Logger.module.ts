import { Logger, QueryRunner } from "typeorm";
import * as fs from "fs";
interface LoggerConfig {
    queryLogFilePath: string;
    errorLogFilePath: string;
    defaultLogFilePath: string;
}
const createFile = (filename: string) => {
    fs.open(filename, "r", (err, fd) => {
        if (err) {
            fs.writeFile(filename, "", (err: any) => {
                if (err) console.log(err);
                else console.log("The file was saved!");
            });
        } else {
            console.log("The file exists!");
        }
    });
};

const saveFile = (name: string, log: any) => {
    fs.appendFile("" + name + ".log", `${log}\n`, (err: any) => {
        if (err) {
            createFile(name);
            return console.log(err);
        }
    });
};
export class DatabaseLogger implements Logger {
    private static instance: DatabaseLogger;
    private config: LoggerConfig;

    private constructor(config: LoggerConfig) {
        this.config = config;
    }

    public static getInstance(config: LoggerConfig): DatabaseLogger {
        if (!DatabaseLogger.instance) {
            DatabaseLogger.instance = new DatabaseLogger(config);
        }

        return DatabaseLogger.instance;
    }

    logQuery(query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
        const logMessage = `-------------------------------------------------------------------------\n\Query: ${query}\nParameters: ${parameters}\n-------------------------------------------------------------------------\n`;
        try {
            fs.appendFileSync(this.config.queryLogFilePath, logMessage);
        } catch (err) {
            createFile(this.config.queryLogFilePath);
        }
    }

    logQueryError(error: string | Error, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
        const logMessage = `-------------------------------------------------------------------------\nDate: [${new Date()}]\nQuery: ${query}\nParameters: ${parameters}\n${error}\n-------------------------------------------------------------------------\n`;
        try {
            fs.appendFileSync(this.config.errorLogFilePath, logMessage);
        } catch (err) {
            createFile(this.config.errorLogFilePath);
        }
    }

    logQuerySlow(time: number, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
        // throw new Error('Method not implemented.');
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined) {
        // throw new Error('Method not implemented.');
    }

    logMigration(message: string, queryRunner?: QueryRunner | undefined) {
        // throw new Error('Method not implemented.');
    }

    log(level: "warn" | "info" | "log", message: any, queryRunner?: QueryRunner | undefined) {
        const logMessage = `${level} | ${message} | ${queryRunner}\n`;
        try {
            fs.appendFileSync(this.config.defaultLogFilePath, logMessage);
        } catch (err) {
            createFile(this.config.defaultLogFilePath);
        }
    }
}
