import React from "react";
import { MenuContext, MenuContextType } from "../MenuContext";
import MenuDisplay from "../MenuDisplay";
import { SubMenuOpenedProps } from "../types";

export const SubMenuOpened = ({ __myMenuId, __parentMenuId, displayPosition, children, displayView, onDisplayClick }: SubMenuOpenedProps) => {
    const { changeMenu } = React.useContext(MenuContext) as MenuContextType;
    const myMenuId = __myMenuId as string;
    const parentMenuId = __parentMenuId as string;

    const numOfChildren = React.Children.count(children);
    if (numOfChildren < 2) {
        throw new Error("RadialMenu must have at least 2 children");
    }
    const angleStep = (2 * Math.PI) / numOfChildren;
    return (
        <>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    let prop = {
                        __index: index,
                        __angleStep: angleStep,
                        __parentMenuId: myMenuId
                    };
                    return React.cloneElement(child, prop);
                }
                return child;
            })}
            <MenuDisplay
                __parentMenuId={myMenuId}
                position={displayPosition}
                onClick={(event, position) => {
                    onDisplayClick?.(event, position);
                    changeMenu(parentMenuId);
                }}
            >
                {displayView}
            </MenuDisplay>
        </>
    );
};
