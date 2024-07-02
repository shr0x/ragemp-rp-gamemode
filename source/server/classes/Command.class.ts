import { CefEvent } from "./CEFEvent.class";

class _CommandRegistry {
    notFoundMessageEnabled: boolean;
    _notFoundMessage: string;

    _commands: Map<string, { name: string; aliases?: string[]; adminlevel?: number; description?: string; run: Function }>;
    _aliasToCommand: Map<string, string>;

    constructor() {
        this.notFoundMessageEnabled = true;
        this._notFoundMessage = "404 not found.";

        this._commands = new Map();
        this._aliasToCommand = new Map();
    }

    // Properties
    get notFoundMessage() {
        return this._notFoundMessage;
    }

    set notFoundMessage(message) {
        if (!message || typeof message !== "string" || message.length === 0) {
            throw new Error("message must be a non-empty string");
        }

        this._notFoundMessage = message;
    }

    // Functions

    commandNotFound(_player: PlayerMp, _commandName: string) {
        if (this.notFoundMessageEnabled) {
            return;
        }
    }

    add(command: { name: string; aliases?: string[]; adminlevel?: number; description?: string; run: (...args: any) => void }) {
        if (!command) {
            throw new Error("No command information was passed");
        }

        const { name, aliases = [], adminlevel = 0, description, run } = command;

        if (!name || typeof name !== "string" || name.length === 0) {
            throw new Error("Cannot register commands without a name");
        } else if (!aliases || !Array.isArray(aliases)) {
            throw new Error("Cannot register commands with non-array aliases property");
        } else if (typeof run !== "function") {
            throw new Error("Cannot register commands with non-function run property");
        }

        // Make sure every name exists only once
        const nameLowercase = name.toLowerCase();
        if (this._commands.has(nameLowercase) || this._aliasToCommand.has(nameLowercase)) {
            throw new Error(`A command named "${nameLowercase}" already exists`);
        }

        // Make sure aliases are all lowercase strings
        const fixedAliases = aliases.filter((alias) => typeof alias === "string" && alias.length !== 0).map((alias) => alias.toLowerCase());

        // Register command
        this._commands.set(nameLowercase, {
            name: nameLowercase,
            aliases: fixedAliases,
            adminlevel: adminlevel,
            description: description,
            run
        });

        // Register aliases
        const aliasSet = new Set(fixedAliases);
        for (const alias of aliasSet) {
            if (this._commands.has(alias) || this._aliasToCommand.has(alias)) {
                throw new Error(`A command named "${alias}" already exists`);
            }

            this._aliasToCommand.set(alias, nameLowercase);
        }
    }
    getallCommands() {
        return [...this._commands.values()];
    }
    getNames() {
        return [...this._commands.keys()];
    }

    getNamesWithAliases() {
        return [...this._commands.keys(), ...this._aliasToCommand.keys()];
    }

    find(commandName: string) {
        if (!commandName || typeof commandName !== "string" || commandName.length === 0) {
            throw new Error("Command name cannot be empty");
        }

        commandName = commandName.toLowerCase();

        // Try to find by name
        const command = this._commands.get(commandName);
        if (command) {
            return command;
        }

        // Finding by name failed, try to find by alias
        const aliasCommand = this._aliasToCommand.get(commandName);
        if (!aliasCommand) return null;
        return this._commands.get(aliasCommand);
    }

    reloadCommands(player: PlayerMp) {
        if (!player || !mp.players.exists(player) || !player.character) return;
        const scriptCommands = CommandRegistry.getallCommands();
        const commandList = player.character.adminlevel <= 0 ? scriptCommands.filter((x) => !x.adminlevel).map((x) => `/${x.name}`) : scriptCommands.map((x) => `/${x.name}`);
        CefEvent.emit(player, "chat", "setCommands", commandList);
    }
}

export const CommandRegistry = new _CommandRegistry();
