mp.events.addProc("client::proc:getWeaponTypeGroup", (weaponhash: Hash) => {
    let weapongroup = mp.game.weapon.getWeapontypeGroup(weaponhash);
    return weapongroup;
});

mp.events.addProc("client::proc:getAmmoInClip", (weaponhash: Hash) => {
    return mp.players.local.getAmmoInClip(weaponhash);
});

mp.events.addProc("client::proc:requestCollisionAt", (x: number, y: number, z: number) => {
    mp.game.streaming.requestCollisionAtCoord(x, y, z);
    return true;
});
