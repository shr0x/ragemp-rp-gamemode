import { FC } from "react";
import { observer } from "mobx-react-lite";

import EventManager from "utils/EventManager.util";
import TattooShopStore from "store/Tattoo.store";

import style from "./tattooshop.module.scss";

const TattooShop: FC<{
    store: TattooShopStore;
}> = observer(({ store }) => {
    return <div style={{ color: "black" }}>heyy</div>;
});
export default TattooShop;
