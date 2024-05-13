namespace global {
    interface GameMp {
        data: {
            getTattooCollectionData: (
                characterType: any,
                decorationIndex: any
            ) => {
                lockHash: number;
                id: number;
                collection: number;
                preset: number;
                cost: number;
                eFacing: number;
                updateGroup: number;
                textLabel: string;
            } | null;
            getShopPedComponent: (componentHash: any) => {
                lockHash: number;
                uniqueNameHash: number;
                locate: number;
                drawableIndex: number;
                textureIndex: number;
                unk1: number;
                eCompType: number;
                unk2: number;
                unk3: number;
                textLabel: string;
            } | null;
            getShopPedProp: (propHash: any) => {
                lockHash: number;
                uniqueNameHash: number;
                locate: number;
                propIndex: number;
                textureIndex: number;
                unk1: number;
                eAnchorPoint: number;
                unk2: number;
                unk3: number;
                textLabel: string;
            } | null;
            getPedHeadBlendData: (entityOrHandle: any) => {
                shapeFirstId: number;
                shapeSecondId: number;
                shapeThirdId: number;
                skinFirstId: number;
                skinSecondId: number;
                skinThirdId: number;
                shapeMix: number;
                skinMix: number;
                thirdMix: number;
                isParent: boolean;
            } | null;
            getWeaponHudStats: (weaponHash: any) => {
                hudDamage: number;
                hudSpeed: number;
                /**
                 * Returns a BigInt pointer to be used with native invoker whenever you need to use it in ArrayBuffer
                 */ hudCapacity: number;
                hudAccuracy: number;
                hudRange: number;
            } | null;
            getWeaponComponentHudStats: (componentHash: any) => { hudDamage: number; hudSpeed: number; hudCapacity: number; hudAccuracy: number; hudRange: number } | null;
            getDlcWeaponData: (dlcWeaponIndex: any) => {
                lockHash: number;
                weaponHash: number;
                weaponHash2: number;
                cost: number;
                ammoCost: number;
                ammoType: number;
                defaultClipSize: number;
                textLabel: string;
                weaponDesc: string;
                weaponTT: string;
                weaponUppercase: string;
            } | null;
            getDlcWeaponComponentData: (
                dlcWeaponIndex: any,
                dlcWeaponComponentIndex: any
            ) => { attachBone: number; isDefault: number; lockHash: number; componentHash: number; unk: number; cost: number; textLabel: string; componentDesc: string } | null;
        };
    }
}
export {};
