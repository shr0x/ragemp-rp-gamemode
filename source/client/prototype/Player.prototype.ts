let weaponWheel: any;
let pauseButton: any;
// Natives
const GET_NUM_TATTOO_SHOP_DLC_ITEMS = "0x278F76C3B0A8F109";
const GET_HASH_NAME_FOR_COMPONENT = "0x0368B3A838070348";
const GET_SHOP_PED_APPAREL_FORCED_COMPONENT_COUNT = "0xC6B9DB42C04DD8C3";
const GET_FORCED_COMPONENT = "0x6C93ED8C2F74859B";

// Constants
const JENKINS_ZERO = mp.game.joaat("0") >> 0;
const hairOverlay = mp.game.joaat("hairOverlay") >> 0;
const freemodeMaleModel = mp.game.joaat("mp_m_freemode_01") >> 0;
const freemodeFemaleModel = mp.game.joaat("mp_f_freemode_01") >> 0;
const defaultCollection = mp.game.joaat("mpbeach_overlays") >> 0;
const defaultPreset = mp.game.joaat("fm_hair_fuzz") >> 0;
const charFreemodeMale = 3;
const charFreemodeFemale = 4;
const hairComponentIndex = 2;
const decalComponentIndex = 10;

// Maps
const freemodeMaleOverlays = new Map(); // preset hash -> collection hash
const freemodeFemaleOverlays = new Map(); // preset hash -> collection hash
const hairOverlayCache = new Map(); // hair component hash -> { collection, preset }

// Functions
function fillTattooMap(map: any, characterIndex: any) {
    for (let i = 0, max = mp.game.invoke(GET_NUM_TATTOO_SHOP_DLC_ITEMS, characterIndex); i < max; i++) {
        // @ts-ignore
        const { preset, collection, updateGroup } = mp.game.data.getTattooCollectionData(characterIndex, i) || {};

        if (updateGroup !== hairOverlay) {
            continue;
        }
        // @ts-ignore
        map.set(preset >> 0, collection >> 0);
    }
}

function findHairOverlay(hairHash: any, characterIndex: any) {
    if (hairOverlayCache.has(hairHash)) {
        return hairOverlayCache.get(hairHash);
    }

    let outForcedComponent = {
        hash: [0],
        index: [0],
        type: [0]
    };

    let outHairOverlay = {
        collection: defaultCollection,
        preset: defaultPreset
    };

    for (let i = 0, max = mp.game.invoke(GET_SHOP_PED_APPAREL_FORCED_COMPONENT_COUNT, hairHash); i < max; i++) {
        mp.game.invoke(GET_FORCED_COMPONENT, hairHash, i, outForcedComponent.hash, outForcedComponent.index, outForcedComponent.type);

        if (outForcedComponent.type[0] !== decalComponentIndex || outForcedComponent.hash[0] === -1 || outForcedComponent.hash[0] === 0 || outForcedComponent.hash[0] === JENKINS_ZERO) {
            continue;
        }

        const overlay = (characterIndex === charFreemodeMale ? freemodeMaleOverlays : freemodeFemaleOverlays).get(outForcedComponent.hash[0]);
        if (overlay) {
            outHairOverlay = {
                collection: overlay,
                preset: outForcedComponent.hash[0]
            };

            break;
        }
    }

    hairOverlayCache.set(hairHash, outHairOverlay);
    return outHairOverlay;
}

function applyHairOverlayToEntity(entity: any, hairIndex: any) {
    if (!entity) {
        return;
    }

    const entityModel = entity.model >> 0;
    if (entityModel === freemodeMaleModel || entityModel === freemodeFemaleModel) {
        const hairHash = mp.game.invoke(GET_HASH_NAME_FOR_COMPONENT, entity.handle, hairComponentIndex, hairIndex, 0) >> 0;
        const { collection, preset } = findHairOverlay(hairHash, entityModel === freemodeMaleModel ? charFreemodeMale : charFreemodeFemale);

        entity.clearFacialDecorations();
        entity.setFacialDecoration(collection, preset);
    }
}

// ---------------------------------------------------------------
//@ts-ignore
mp.Player.prototype.setWeaponWheel = function (status: boolean) {
    if (status) {
        weaponWheel = setInterval(() => {
            mp.game.ui.weaponWheelIgnoreSelection();
            mp.game.controls.disableControlAction(0, 37, true);
        });
    } else {
        if (weaponWheel) clearInterval(weaponWheel);
        mp.game.controls.disableControlAction(0, 37, false);
        weaponWheel = undefined;
    }
};
// ---------------------------------------------------------------
//@ts-ignore
mp.Player.prototype.setOnGroundProperly = function () {
    //@ts-ignore
    let posZ = mp.game.gameplay.getGroundZFor3dCoord(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z, 0.0, false);
    mp.players.local.setCoordsNoOffset(mp.players.local.position.x, mp.players.local.position.y, posZ + 1, false, false, false);
};

// ---------------------------------------------------------------
// Local player extension
mp.players.local.applyHairOverlay = function () {
    applyHairOverlayToEntity(this, this.getDrawableVariation(hairComponentIndex));
};

// ---------------------------------------------------------------
// Events
mp.events.add("playerReady", () => {
    fillTattooMap(freemodeMaleOverlays, charFreemodeMale);
    fillTattooMap(freemodeFemaleOverlays, charFreemodeFemale);
});

mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player") {
        //@ts-ignore
        applyHairOverlayToEntity(entity, entity.getDrawableVariation(hairComponentIndex));
    }
});

mp.events.add("hairOverlay::update", (player, newHairIndex) => {
    applyHairOverlayToEntity(player, newHairIndex);
});
// ---------------------------------------------------------------
