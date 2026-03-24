import { RAGERP } from "@api";

/**
 * Adds an attachment to the player.
 * @param {string | number} model - The model of the attachment.
 * @param {boolean} remove - Whether to remove the attachment.
 * @returns {void}
 */
mp.Vehicle.prototype.addAttachment = function (model: string | number, remove: boolean): void {
    const attachmentModel = typeof model === "string" ? mp.joaat(model) : model;
    let idx = (this as VehicleMp)._attachments.indexOf(attachmentModel);
    if (idx === -1) {
        if (!remove) {
            (this as VehicleMp)._attachments.push(attachmentModel);
        }
    } else if (remove) {
        (this as VehicleMp)._attachments.splice(idx, 1);
    }
    (this as VehicleMp).setVariable("attachmentsData", RAGERP.utils.serializeAttachments((this as PlayerMp)._attachments));
};

/**
 * Checks if the player has an attachment.
 * @param {string | number} model - The model of the attachment.
 * @returns {boolean} Whether the player has the attachment.
 */
mp.Vehicle.prototype.hasAttachment = function (model: string | number): boolean {
    return (this as VehicleMp)._attachments.indexOf(typeof model === "string" ? mp.joaat(model) : model) !== -1;
}