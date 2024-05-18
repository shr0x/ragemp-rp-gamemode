import { Utils } from "../../shared/Utils.module";

async function Poop() {
    let PlayerPed = mp.players.local;

    let particleDictionary = "scr_amb_chop";
    let particleName = "ent_anim_dog_poo";
    let animDictionary = "missfbi3ig_0";
    let animName = "shit_loop_trev";

    mp.game.streaming.requestNamedPtfxAsset(particleDictionary);

    while (!mp.game.streaming.hasNamedPtfxAssetLoaded(particleDictionary)) {
        await Utils.sleep(0);
    }

    mp.game.streaming.requestAnimDict(animDictionary);

    while (!mp.game.streaming.hasAnimDictLoaded(animDictionary)) {
        await Utils.sleep(0);
    }

    mp.game.graphics.setPtfxAssetNextCall(particleDictionary);

    // --gets bone on specified ped
    let bone = PlayerPed.getBoneIndex(11816);

    // --animation
    mp.players.local.taskPlayAnim(animDictionary, animName, 8.0, -8.0, -1, 0, 0, false, false, false);

    // --2 effets for more shit
    let effect = mp.game.graphics.startParticleFxLoopedOnPedBone(particleName, PlayerPed.handle, 0.0, 0.0, -0.6, 0.0, 0.0, 20.0, bone, 2.0, false, false, false);
    await Utils.sleep(3500);
    let effect2 = mp.game.graphics.startParticleFxLoopedOnPedBone(particleName, PlayerPed.handle, 0.0, 0.0, -0.6, 0.0, 0.0, 20.0, bone, 2.0, false, false, false);
    await Utils.sleep(1000);

    mp.game.graphics.stopParticleFxLooped(effect, false);
    await Utils.sleep(10);
    mp.game.graphics.stopParticleFxLooped(effect2, false);
}

mp.events.add("client::needs:poop", Poop);
