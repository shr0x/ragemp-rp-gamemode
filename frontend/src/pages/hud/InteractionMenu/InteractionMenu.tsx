import React, {FC} from "react";
import { Menu, MenuItem, SubMenu } from "./components";
import style from "./interactionmenu.module.scss";
import HudStore from "store/Hud.store";
import {observer} from "mobx-react-lite";
import EventManager from "utils/EventManager.util";


const InteractionMenu: FC<{store: HudStore}> = ({store}) => {

    const handleItemClick = (event: any, _index: number, data: number) => {
        EventManager.emitClient("hud", "interactResult", data);
        store.hideInteraction()
    };

    if (!store.interactionMenu.isActive) return null;
    return (
        <div className={style.main}>
            <Menu show={store.interactionMenu.isActive} outerRadius={150} innerRadius={80} centerX={200} centerY={200} theme={"dark"}  animation={["fade", "scale", "rotate"]} animationTimeout={150}>
                {
                    store.interactionMenu.items.map((x, e) => {
                        return <MenuItem key={e} display={"center"} onItemClick={handleItemClick} data={x.id}>{x.text}</MenuItem>
                    })
                }
            </Menu>
        </div>
    );
}

export default observer(InteractionMenu);
