import { observer } from "mobx-react-lite";
import { FC } from "react";
import style from "./hud.module.scss";
import PlayerStore from "store/Player.store";
import InteractionMenu from "./InteractionMenu/InteractionMenu";
import HudStore from "store/Hud.store";
import MainHud from "./MainHud/MainHud";

import InventoryStore from "store/Inventory.store";
import Inventory from "./Inventory/Inventory";
import DeathScreen from "./DeathScreen/DeathScreen";
const HUD: FC<{ inventoryStore: InventoryStore; store: PlayerStore; hudStore: HudStore }> = observer(({ inventoryStore, store, hudStore }) => {
    return (
        <div className={style.main}>
            <DeathScreen store={store} />
            <MainHud store={hudStore} playerStore={store} />
            <InteractionMenu store={hudStore} />
            {inventoryStore.isVisible && <Inventory store={inventoryStore} playerStore={store} />}
        </div>
    );
});

export default HUD;
