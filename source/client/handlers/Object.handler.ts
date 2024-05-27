/**
 * Object related data handlers
 */

mp.events.addDataHandler("is_item", (entity, value, oldvalue) => {
    if (entity.type === "object") {
        const object = <ObjectMp>entity;
        object.notifyStreaming = true;
    }
});
