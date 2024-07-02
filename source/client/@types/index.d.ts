declare global {
    interface PlayerMp {
        applyHairOverlay(): void;
        addDecorationFromHashes(collection: number, overlay: number): void;
    }
}
export {};
