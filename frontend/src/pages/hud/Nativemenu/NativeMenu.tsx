import { FC, useEffect, useRef } from "react";

import { observer } from "mobx-react-lite";
import Container from "./components/Container";

import style from "./nativemenu.module.scss";
import { nativemenuStore } from "store/Nativemenu.store";

const NativeMenu: FC<{ store: typeof nativemenuStore }> = ({ store }) => {
    if (!store.menu.isActive) return null;

    return (
        <div className={style.main}>
            <div className={style.header}>
                <div className={style.title}>{store.menu.header.title}</div>
                <div className={style.text}>{store.menu.header.desc}</div>
            </div>
            <div className={style.container}>
                <Container store={store} data={store.menu.items} depth={0} />
            </div>
        </div>
    );
};

export default observer(NativeMenu);
