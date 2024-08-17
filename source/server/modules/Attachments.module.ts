const entityAttachments = {
    _addAttachment(entity: PlayerMp | VehicleMp, attachmentHash: any, remove: boolean) {
        let idx = entity._attachments.indexOf(attachmentHash);

        if (idx === -1) {
            if (!remove) {
                entity._attachments.push(attachmentHash);
            }
        } else if (remove) {
            entity._attachments.splice(idx, 1);
        }

        entity.setVariable("attachmentsData", serializeAttachments(entity._attachments));
    },

    initFunctions: (entity: VehicleMp | PlayerMp) => {
        entity._attachments = [];
        entity.addAttachment = function _addAttachmentWrap(attachmentName: string, remove: boolean) {
            let to = typeof attachmentName;
            if (to === "number") {
                entityAttachments._addAttachment(entity, attachmentName, remove);
            } else if (to === "string") {
                entityAttachments._addAttachment(entity, mp.joaat(attachmentName), remove);
            }
        };
        entity.hasAttachment = function _hasAttachment(attachmentName: any) {
            return entity._attachments.indexOf(typeof attachmentName === "string" ? mp.joaat(attachmentName) : attachmentName) !== -1;
        };
    }
};

function serializeAttachments(attachments: number[]) {
    return attachments.map((hash) => hash.toString(36)).join("|");
}

mp.events.add("staticAttachments.Add", (player: PlayerMp, hash) => {
    player.addAttachment(parseInt(hash, 36), false);
});
mp.events.add("staticAttachments.Remove", (player, hash) => {
    player.addAttachment(parseInt(hash, 36), true);
});

mp.events.add("vstaticAttachments.Add", (player: PlayerMp, remoteVehicle: number, hash) => {
    let vehicle = mp.vehicles.at(remoteVehicle);
    if (vehicle && mp.vehicles.exists(vehicle)) {
        vehicle.addAttachment(parseInt(hash, 36), false);
    }
});
mp.events.add("vstaticAttachments.Remove", (player, remoteVehicle, hash) => {
    let vehicle = mp.vehicles.at(remoteVehicle);
    if (vehicle && mp.vehicles.exists(vehicle)) {
        vehicle.addAttachment(parseInt(hash, 36), true);
    }
});
export { entityAttachments };
