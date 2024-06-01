import { FC } from "react";
import { observer } from "mobx-react-lite";
import TattooShopStore from "store/Tattoo.store";
import EventManager from "utils/EventManager.util";

import style from "./tattooshop.module.scss";

const TattooShop: FC<{
    store: TattooShopStore;
}> = observer(({ store }) => {
    return <div style={{ color: "black" }}>comingsoon</div>;
});
export default TattooShop;
