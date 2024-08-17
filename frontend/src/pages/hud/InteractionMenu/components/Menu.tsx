import clsx from "clsx";
import React from "react";
import { MenuContext } from "./MenuContext";
import { MenuContextData, MenuProps } from "./types";
import { cx } from "./util";

import "./Menu.scss";
import EventManager from "utils/EventManager.util";
import { hudStore } from "store/Hud.store";

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
    const [active, setActive] = React.useState(false);
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
                height={"50vh"}
                stroke="#28272b"
                strokeWidth={"2"}
                viewBox={`${-35} ${-35} ${menuWidth + 35 * 2} ${menuHeight + 35 * 2}`}
                className={clsx(props.className, cx("menu", transition, animation, theme, !data.drawBackground && "no-bg"))}
            >
                <circle key={1} cx={centerX - 50} cy={centerY - 50} r={menuWidth / 2 + 10} fill="none" stroke="red" />

                {data.activeMenuId == "0" && (
                    <g
                        onMouseEnter={(e) => {
                            setActive(true);
                        }}
                        onMouseLeave={(e) => {
                            setActive(false);
                        }}
                        onClick={() => {
                            EventManager.emitClient("cef", "close");
                            hudStore.hideInteraction();
                        }}
                    >
                        <circle key={2} cx="150" cy="150" r="50" className="__rrm-base"></circle>

                        <foreignObject x="120" y="120" width="60" height="60">
                            <div className="__rrm-content">
                                <svg width="30" height="30" viewBox="0 0 60 60" fill="none">
                                    <g clipPath="url(#clip0_104_36)">
                                        <path
                                            className={cx("exit", active && "exitactive")}
                                            d="M58.8437 9.90253C60.6093 8.30878 60.3281 5.9416 58.2031 4.61738C56.0781 3.29316 52.9218 3.5041 51.1562 5.09785L29.9999 24.1408L8.84368 5.09785C7.07805 3.5041 3.9218 3.29316 1.7968 4.61738C-0.328196 5.9416 -0.609446 8.30878 1.15618 9.90253L23.4843 30.0002L1.15618 50.0978C-0.609446 51.6916 -0.328196 54.0588 1.7968 55.383C3.9218 56.7072 7.07805 56.4963 8.84368 54.9025L29.9999 35.8596L51.1562 54.9025C52.9218 56.4963 56.0781 56.7072 58.2031 55.383C60.3281 54.0588 60.6093 51.6916 58.8437 50.0978L36.5156 30.0002L58.8437 9.90253Z"
                                            fill="red"
                                        />
                                    </g>
                                </svg>
                            </div>
                        </foreignObject>
                    </g>
                )}

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
