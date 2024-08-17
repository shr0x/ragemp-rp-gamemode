declare global {
    interface PlayerMp {
        applyHairOverlay(): void;
        addDecorationFromHashes(collection: number, overlay: number): void;
        getBoneIndex(id: number): number;
        __attachmentObjects: { [key: number | string]: ObjectMp };
        __attachments: number[];
    }
    interface VehicleMp {
        getBoneIndex(id: number): number;
        __attachmentObjects: { [key: number | string]: ObjectMp };
        __attachments: number[];
    }
}
export {};
