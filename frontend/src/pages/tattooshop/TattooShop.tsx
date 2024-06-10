import { FC } from "react";
import { observer } from "mobx-react-lite";
import EventManager from "utils/EventManager.util";
import style from "./tattooshop.module.scss";
import { tattooShopStore } from "store/Tattoo.store";
import { createComponent } from "src/hoc/registerComponent";

const TattooShop: FC<{
    store: typeof tattooShopStore;
}> = observer(({ store }) => {
    return <div style={{ color: "black" }}>comingsoon</div>;
});
export default createComponent({
    props: { store: tattooShopStore },
    component: TattooShop,
    pageName: "tattooshop"
});
