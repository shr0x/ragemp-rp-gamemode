import clsx from "clsx";
import React from "react";
import { MenuContext } from "./MenuContext";
import { MenuContextData, MenuProps } from "./types";
import { cx } from "./util";

import "./Menu.scss";

export const MAIN_MENU_ID = "0";

const initialData: MenuContextData = {
    activeMenuId: MAIN_MENU_ID,
    deltaRadius: 0,
    innerRadius: 0,
    menuHeight: 0,
    menuWidth: 0,
    middleRadius: 0,
    outerRadius: 0,
    drawBackground: true
};

const Menu = ({ centerX, centerY, innerRadius, outerRadius, animationTimeout, show, animateSubMenuChange, animation, theme, drawBackground, ...props }: MenuProps) => {
    const [data, setData] = React.useState<MenuContextData>(initialData);

    if (innerRadius >= outerRadius) {
        throw new Error("RadialMenu's innerRadius must be less than outerRadius");
    }
    const numOfChildren = React.Children.count(props.children);
    if (numOfChildren < 2) {
        throw new Error("RadialMenu must have at least 2 children");
    }

    const angleStep = (2 * Math.PI) / numOfChildren;
    const middleRadius = (innerRadius + outerRadius) / 2;
    const deltaRadius = outerRadius - innerRadius;
    const menuWidth = outerRadius * 2;
    const menuHeight = menuWidth;

    animationTimeout = React.useMemo(() => animationTimeout || 0, [animationTimeout]);
    const myMenuId = MAIN_MENU_ID;

    React.useEffect(() => {
        setData((prev) => ({
            innerRadius,
            outerRadius,
            middleRadius,
            deltaRadius,
            menuWidth,
            menuHeight,
            activeMenuId: show ? myMenuId : prev.activeMenuId,
            drawBackground: drawBackground ?? true
        }));
    }, [innerRadius, outerRadius, show, drawBackground]);

    const [transition, setTransition] = React.useState<"closed" | "closing" | "opened" | "opening">("closed");
    const handleTransition = React.useCallback(() => {
        document.documentElement.style.setProperty("--__reactRadialMenu__animation-delay", `${animationTimeout}ms`);
        if (show) {
            setTransition("opening");
            setTimeout(() => setTransition("opened"), animationTimeout);
        } else {
            setTransition("closing");
            setTimeout(() => setTransition("closed"), animationTimeout);
        }
    }, [show, animationTimeout]);
    const changeMenu = React.useCallback(
        (menuId: string) => {
            if (animateSubMenuChange) {
                handleTransition();
                setTimeout(() => setData((prev) => ({ ...prev, activeMenuId: menuId })), animationTimeout);
            } else {
                setData((prev) => ({ ...prev, activeMenuId: menuId }));
            }
        },
        [handleTransition, animateSubMenuChange]
    );
    React.useEffect(() => {
        handleTransition();
    }, [show, handleTransition]);

    if (transition === "closed") {
        return <></>;
    }
    return (
        <MenuContext.Provider value={{ data, changeMenu }}>
            <svg
                {...props}
                width={"50vh"}
                height={"35vh"}
                stroke="#28272b"
                strokeWidth={"2"}
                viewBox={`${-35} ${-35} ${menuWidth + 35 * 2} ${menuHeight + 35 * 2}`}
                className={clsx(props.className, cx("menu", transition, animation, theme, !data.drawBackground && "no-bg"))}
            >
                <circle key={1} cx={centerX - 50} cy={centerY - 50} r={menuWidth / 2 + 10} fill="none" stroke="#AAAAAA" />
                {/* <circle key={2} cx={centerX - 50} cy={centerY - 50} r={menuWidth / 2 + 20} fill="none" stroke="#afafaf" /> */}
                {/* <circle key={3} cx={centerX - 50} cy={centerY - 50} r={menuWidth / 2 + 30} fill="none" stroke="#AAAAAA" /> */}

                {React.Children.map(props.children, (child, index) => {
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
            </svg>
        </MenuContext.Provider>
    );
};

export default Menu;
