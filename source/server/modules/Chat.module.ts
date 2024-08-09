import { RageShared } from "@shared/index";

export const Chat = {
    /**
     * Sends a syntax error message to a specific player.
     *
     * @param {PlayerMp} player - The player to whom the message will be sent.
     * @param {string} message - The message that describes the correct usage.
     * @returns {void}
     */
    sendSyntaxError(player: PlayerMp, message: string): void {
        return player.outputChatBox(`!{#FF6347}Usage:!{#ffffff} ${message}`);
    },

    /**
     * Sends a message to all players within a certain range of a specific position.
     *
     * @param {Vector3} position - The position from which the range is calculated.
     * @param {number} range - The range within which players will receive the message.
     * @param {string} message - The message to send to players.
     * @returns {void}
     */
    sendNearbyMessage(position: Vector3, range: number, message: string): void {
        mp.players.forEachInRange(position, range, (player: PlayerMp) => {
            if (player.getVariable("loggedin")) player.outputChatBox(message);
        });
    },

    /**
     * Sends a warning message to all admins with a certain level or higher.
     *
     * @param {number} color - The color code (32bit in hexadecimal) for the message.
     * @param {string} message - The warning message to send to admins.
     * @param {RageShared.Enums.ADMIN_LEVELS} [level=RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE] - The minimum admin level required to receive the message.
     * @returns {void}
     */
    sendAdminWarning(color: number, message: string, level: RageShared.Enums.ADMIN_LEVELS = RageShared.Enums.ADMIN_LEVELS.LEVEL_ONE): void {
        const players = mp.players.toArray().filter((x) => x.character && x.character.adminlevel >= level);
        const padColor = color.toString(16).toUpperCase().padStart(8, "0").slice(0, -2);
        players.forEach((player) => {
            player.outputChatBox(`!{#${padColor}}${message}`);
        });
    }
};
