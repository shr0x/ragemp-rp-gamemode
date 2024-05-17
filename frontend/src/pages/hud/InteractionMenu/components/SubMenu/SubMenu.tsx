import React from "react";
import { MenuContext, MenuContextType } from "../MenuContext";
import { SubMenuProps } from "../types";
import { SubMenuClosed } from "./SubMenuClosed";
import { SubMenuOpened } from "./SubMenuOpened";

const SubMenu = (props: SubMenuProps) => {
    const { data } = React.useContext(MenuContext) as MenuContextType;
    const { activeMenuId } = data;
    const myMenuId = `${props.__parentMenuId}-${props.__index}`;

    // separate props for SubMenuClosed and SubMenuOpened
    const { __parentMenuId, displayPosition, children, displayView, onDisplayClick, ...rest } = props;

    if (activeMenuId === props.__parentMenuId) {
        return <SubMenuClosed {...rest} __myMenuId={myMenuId} />;
    }
    return <SubMenuOpened __myMenuId={myMenuId} __parentMenuId={__parentMenuId} displayPosition={displayPosition} children={children} displayView={displayView} onDisplayClick={onDisplayClick} />;
};

export default SubMenu;
