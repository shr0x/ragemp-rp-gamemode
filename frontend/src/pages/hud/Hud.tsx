import { observer } from "mobx-react-lite";
import { FC } from "react";

/* Components */
import InteractionMenu from "./InteractionMenu/InteractionMenu";
import MainHud from "./MainHud/MainHud";
import Inventory from "./Inventory/Inventory";
import DeathScreen from "./DeathScreen/DeathScreen";
import NativeMenu from "./Nativemenu/NativeMenu";
import InteractButton from "./InteractButton/InteractButton";
/* Stores */
import { inventoryStore } from "store/Inventory.store";
import { playerStore } from "store/Player.store";
import { hudStore } from "store/Hud.store";
import { createComponent } from "src/hoc/registerComponent";
import { nativemenuStore } from "store/Nativemenu.store";
/* Styling */
import style from "./hud.module.scss";

interface HUDProps {
    inventoryStore: typeof inventoryStore;
    store: typeof playerStore;
    hudStore: typeof hudStore;
    nativemenuStore: typeof nativemenuStore;
}

const HUD: FC<HUDProps> = observer(({ inventoryStore, store, hudStore, nativemenuStore }) => {
    return (
        <div className={style.main}>
            <NativeMenu key={0} store={nativemenuStore} />
            <DeathScreen store={store} />
            <MainHud store={hudStore} playerStore={store} />
            <InteractionMenu store={hudStore} />
            <InteractButton store={hudStore} />
            {inventoryStore.isVisible && <Inventory store={inventoryStore} playerStore={store} />}
        </div>
    );
});

export default createComponent({
    props: { inventoryStore, store: playerStore, hudStore, nativemenuStore },
    component: HUD,
    pageName: "hud"
});
