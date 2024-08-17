import { attachmentPropList } from "@assets/Attachments.asset";
import { Utils } from "@shared/Utils.module";

interface IAttachment {
    id: string | number;
    model: number;
    boneName: string | number;
    offset: Vector3;
    rotation: Vector3;
    collision: boolean;
    freeze: boolean;
}

/**
 * Manages attachments for vehicles and players in the game.
 */
class _AttachmentManager {
    attachments: { [key: number | string]: IAttachment } = {};

    /**
     * Initializes the attachment manager and registers default attachments.
     * Also initializes attachments for all existing players.
     */
    constructor() {
        for (const [key, value] of Object.entries(attachmentPropList)) {
            this.register("item_" + key, mp.game.joaat(value.model), value.bone, new mp.Vector3(value.x, value.y, value.z), new mp.Vector3(value.xr, value.yr, value.zr), false, false);
            mp.console.logInfo(`Attachment ${"item_" + key} registered!`);
        }
        mp.players.forEach((_player) => {
            const data = _player.getVariable("attachmentsData");
            if (data && data.length > 0) {
                _player.__attachments = data.split("|").map((att: any) => parseInt(att, 36));
                _player.__attachmentObjects = {};
            }
        });
    }

    /**
     * Attaches an object to a vehicle or player based on the attachment ID.
     * @param {VehicleMp | PlayerMp} entity - The entity to attach the object to.
     * @param {number | string} id - The attachment ID.
     */
    public async attach(entity: VehicleMp | PlayerMp, id: number | string) {
        if (!this.attachments.hasOwnProperty(id)) return;

        if (entity.__attachmentObjects.hasOwnProperty(id)) return;

        const attInfo = this.attachments[id];
        const spawnPos = new mp.Vector3(entity.position.x, entity.position.y, -90);
        const object = mp.objects.new(attInfo.model, spawnPos, { dimension: entity.dimension });

        const boneIndex = typeof attInfo.boneName === "string" ? entity.getBoneIndexByName(attInfo.boneName) : entity.getBoneIndex(attInfo.boneName);

        for (let i = 0; i < 25; i++) {
            if (object.handle !== 0) {
                break;
            }
            await Utils.sleep(10);
        }

        object.attachTo(
            entity.handle,
            boneIndex,
            attInfo.offset.x,
            attInfo.offset.y,
            attInfo.offset.z,
            attInfo.rotation.x,
            attInfo.rotation.y,
            attInfo.rotation.z,
            true,
            true,
            attInfo.collision,
            false,
            2,
            true
        );

        if (attInfo.freeze) {
            object.freezePosition(true);
        }

        entity.__attachmentObjects[id] = object;
    }

    /**
     * Removes an attachment from a vehicle or player based on the attachment ID.
     * @param {VehicleMp | PlayerMp} entity - The entity to remove the attachment from.
     * @param {number | string} id - The attachment ID.
     */
    removeFor(entity: VehicleMp | PlayerMp, id: number | string) {
        if (entity.__attachmentObjects.hasOwnProperty(id)) {
            const obj = entity.__attachmentObjects[id];
            if (mp.objects.exists(obj)) {
                obj.destroy();
            }
            delete entity.__attachmentObjects[id];
        }
    }

    /**
     * Initializes attachments for a vehicle or player.
     * @param {VehicleMp | PlayerMp} entity - The entity to initialize attachments for.
     */
    initFor(entity: VehicleMp | PlayerMp) {
        if (entity.__attachments !== null) {
            for (const attachment of entity.__attachments) {
                this.attach(entity, attachment);
            }
        }
    }

    /**
     * Removes all attachments for a vehicle or player.
     * @param {VehicleMp | PlayerMp} entity - The entity to remove all attachments from.
     */
    shutdownFor(entity: VehicleMp | PlayerMp) {
        if (typeof entity.__attachmentObjects !== "undefined") {
            for (const attachment of Object.keys(entity.__attachmentObjects)) {
                this.removeFor(entity, attachment);
            }
        }
    }

    /**
     * Registers a new attachment.
     * @param {string | number} id - The attachment ID.
     * @param {string | number} model - The model associated with the attachment.
     * @param {string | number} boneName - The bone name or index to attach to.
     * @param {Vector3} offset - The offset position for the attachment.
     * @param {Vector3} rotation - The rotation for the attachment.
     * @param {boolean} [collision=false] - Whether the attachment should have collision enabled.
     * @param {boolean} [freeze=false] - Whether the attachment should be frozen in place.
     */
    register(id: string | number, model: string | number, boneName: string | number, offset: Vector3, rotation: Vector3, collision = false, freeze = false) {
        if (typeof id === "string") {
            id = mp.game.joaat(id);
        }
        if (typeof model === "string") {
            model = mp.game.joaat(model);
        }

        if (!this.attachments.hasOwnProperty(id)) {
            this.attachments[id] = { id: id, model: model, offset: offset, rotation: rotation, boneName: boneName, collision: collision, freeze: freeze };
        }
    }

    /**
     * Adds an attachment locally to the player's character.
     * @param {string | number} attachmentName - The name of the attachment to add.
     */
    addLocal(attachmentName: string | number) {
        try {
            if (typeof attachmentName === "string") {
                attachmentName = mp.game.joaat(attachmentName);
            }

            const entity = mp.players.local;

            if (!entity.__attachments || entity.__attachments.indexOf(attachmentName) === -1) {
                mp.events.callRemote("staticAttachments.Add", attachmentName.toString(36));
            }
        } catch (e: unknown) {
            if (e instanceof TypeError) mp.console.logWarning(e.message);
        }
    }

    /**
     * Removes an attachment locally from the player's character.
     * @param {string | number} attachmentName - The name of the attachment to remove.
     */
    removeLocal(attachmentName: string | number) {
        try {
            if (typeof attachmentName === "string") {
                attachmentName = mp.game.joaat(attachmentName);
            }

            const entity = mp.players.local;

            if (entity.__attachments && entity.__attachments.indexOf(attachmentName) !== -1) {
                mp.events.callRemote("staticAttachments.Remove", attachmentName.toString(36));
            }
        } catch (e: unknown) {
            if (e instanceof TypeError) mp.console.logWarning(e.message);
        }
    }

    /**
     * Removes all local attachments from the player's character.
     */
    removeLocalAll() {
        const entity = mp.players.local;
        if (!entity.__attachmentObjects) entity.__attachmentObjects = {};
        if (entity.__attachments) {
            entity.__attachments.map((id: any) => {
                mp.events.callRemote("staticAttachments.Remove", id.toString(36));
            });
        }
    }

    /**
     * Retrieves a copy of the registered attachments.
     * @returns {Object} The registered attachments.
     */
    getAttachments() {
        return Object.assign({}, this.attachments);
    }
}

export const AttachmentManager = new _AttachmentManager();
