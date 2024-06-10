import { observer } from "mobx-react-lite";
import { FC } from "react";

import style from "./hud.module.scss";
import InteractionMenu from "./InteractionMenu/InteractionMenu";
import MainHud from "./MainHud/MainHud";

import Inventory from "./Inventory/Inventory";
import DeathScreen from "./DeathScreen/DeathScreen";
import InteractButton from "./InteractButton/InteractButton";

import { inventoryStore } from "store/Inventory.store";
import { playerStore } from "store/Player.store";
import { hudStore } from "store/Hud.store";
import { createComponent } from "src/hoc/registerComponent";

interface HUDProps {
    inventoryStore: typeof inventoryStore;
    store: typeof playerStore;
    hudStore: typeof hudStore;
}

const HUD: FC<HUDProps> = observer(({ inventoryStore, store, hudStore }) => {
    return (
        <div className={style.main}>
            <DeathScreen store={store} />

            <InteractButton store={hudStore} />
            <MainHud store={hudStore} playerStore={store} />
            <InteractionMenu store={hudStore} />
            {inventoryStore.isVisible && <Inventory store={inventoryStore} playerStore={store} />}
        </div>
    );
});

export default createComponent({
    props: { inventoryStore, store: playerStore, hudStore },
    component: HUD,
    pageName: "hud"
});
