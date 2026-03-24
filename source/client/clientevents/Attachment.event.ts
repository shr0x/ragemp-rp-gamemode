import { AttachmentManager } from "@classes/Attachments.class";

mp.events.add("client::attachments:attach", (model, isAttached) => {
    if (!isAttached) {
        AttachmentManager.removeLocal(model);
    } else {
        AttachmentManager.addLocal(model);
    }
});
mp.events.add("entityStreamIn", (entity: PlayerMp | VehicleMp) => {
    try {
        if (entity.type === "player" || entity.type === "vehicle") {
            AttachmentManager.shutdownFor(entity);
            if (entity.__attachments) {
                AttachmentManager.initFor(entity);
            }
        }
    } catch (e: unknown) {
        if (e instanceof TypeError) mp.console.logWarning(e.message);
    }
});

mp.events.add("entityStreamOut", (entity: VehicleMp | PlayerMp) => {
    try {
        if (entity.type === "player" || entity.type === "vehicle") {
            if (entity.__attachmentObjects) {
                AttachmentManager.shutdownFor(entity);
            }
        }
    } catch (e: unknown) {
        if (e instanceof TypeError) mp.console.logWarning(e.message);
    }
});

mp.events.add("playerQuit", (entity) => {
    try {
        if (entity.__attachmentObjects) {
            AttachmentManager.shutdownFor(entity);
        }
    } catch (e: unknown) {
        if (e instanceof TypeError) mp.console.logWarning(e.message);
    }
});

mp.events.addDataHandler("attachmentsData", (entity: PlayerMp | VehicleMp, data: any) => {
    try {
        let newAttachments = data.length > 0 ? data.split("|").map((att: any) => parseInt(att, 36)) : [];

        if (entity.handle !== 0) {
            let oldAttachments = entity.__attachments;

            if (!oldAttachments) {
                oldAttachments = [];
                entity.__attachmentObjects = {};
            }

            // process outdated first
            for (let attachment of oldAttachments) {
                if (newAttachments.indexOf(attachment) === -1) {
                    AttachmentManager.removeFor(entity, attachment);
                }
            }

            // then new attachments
            for (let attachment of newAttachments) {
                if (oldAttachments.indexOf(attachment) === -1) {
                    AttachmentManager.attach(entity, attachment);
                }
            }
        } else {
            entity.__attachmentObjects = {};
        }

        entity.__attachments = newAttachments;
    } catch (e: unknown) {
        if (e instanceof TypeError) mp.console.logWarning(e.message);
    }
});
