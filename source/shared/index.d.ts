declare namespace RageShared {
    namespace Interfaces {
        interface CreatorFace {
            noseWidth: number;
            nosePeakHeight: number;
            nosePeakLength: number;
            noseBoneHeight: number;
            nosePeakLowering: number;
            noseBoneTwist: number;
            eyebrowHeight: number;
            eyebrowForward: number;
            cheekboneHeight: number;
            cheekboneWidth: number;
            cheekWidth: number;
            eyesWidth: number;
            lips: number;
            jawBoneWidth: number;
            jawBoneBackLength: number;
            ChimpBoneLowering: number;
            ChimpBoneLength: number;
            ChimpBoneWidth: number;
            ChimpHole: number;
            neckWidth: number;
            eyeMakeup: number;
            faceMakeup: number;
            lipstickID: number;
        }
        interface CreatorData {
            sex: number;
            name: { firstname: string; lastname: string };
            parents: {
                father: number;
                mother: number;
                leatherMix: number;
                similarity: number;
            };
            hair: {
                head: number;
                eyebrows: number;
                chest: number;
                beard: number;
            };
            face: RageShared.Interfaces.CreatorFace;
            color: {
                head: number;
                head_secondary: number;
                eyebrows: number;
                eyes: number;
                chest: number;
                beard: number;
                eyeMakeup: number;
                faceMakeup: number;
                lipstick: number;
            };
        }

        interface CefEventMap {
            notify: {
                show: { type: "loading" | "promise" | "success" | "info" | "error" | "warning" | "warn" | "dark"; message: string; skin: "light" | "dark" | "colored" };
            };
            player: {
                setCharacters: any[];
            };
            auth: {};
        }
    }
}
