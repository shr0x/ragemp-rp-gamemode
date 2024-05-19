import React from "react";
import { MenuContext, MenuContextType } from "./MenuContext";
import { MenuItemProps } from "./types";
import { cx, getObjectDimensions, getRingSectionPath } from "./util";
import classNames from "classnames";

const MenuItem = ({ __angleStep, __index, __parentMenuId, data: propsData, onItemClick, ...props }: MenuItemProps) => {
    const { data } = React.useContext(MenuContext) as MenuContextType;
    const { innerRadius, outerRadius, middleRadius, deltaRadius, activeMenuId } = data;
    const [active, setActive] = React.useState(false);
    const angleStep = __angleStep as number;
    const index = __index as number;
    const parentMenuId = __parentMenuId as string;

    const gapAngle = 0.02; // Adjust this value for the desired gap size

    const { objectX, objectY, objectWidth, objectHeight } = React.useMemo(
        () => getObjectDimensions(deltaRadius, angleStep, middleRadius, index, outerRadius),
        [deltaRadius, angleStep, middleRadius, index, outerRadius]
    );

    if (parentMenuId !== activeMenuId) {
        return <></>;
    }

    return data.drawBackground ? (
        <g
            {...props}
            onMouseEnter={(e) => {
                props.onMouseEnter?.(e);
                setActive(true);
            }}
            onMouseLeave={(e) => {
                props.onMouseLeave?.(e);
                setActive(false);
            }}
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onItemClick?.(event, index, propsData);
            }}
        >
            <defs>
                <linearGradient id="gradientActive" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="10%" style={{ stopColor: "#28272b", stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: "red", stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <path
                d={getRingSectionPath(index * angleStep, (index + 1) * angleStep, innerRadius, outerRadius, gapAngle)}
                className={cx("base", { active })}
                style={active ? { fill: "url(#gradientActive)" } : {}}
            />
            <foreignObject x={objectX} y={objectY} width={objectWidth} height={objectHeight} style={{ fontSize: "1.5vh" }}>
                <div className={classNames("__rrm-content", active ? "__rrm-active" : undefined)}>{props.children}</div>
            </foreignObject>
        </g>
    ) : (
        <g {...props}>
            <foreignObject
                x={objectX}
                y={objectY}
                width={objectWidth}
                height={objectHeight}
                onMouseEnter={(e) => {
                    props.onMouseEnter?.(e);
                    setActive(true);
                }}
                onMouseLeave={(e) => {
                    props.onMouseLeave?.(e);
                    setActive(false);
                }}
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onItemClick?.(event, index, propsData);
                }}
            >
                <div className={cx("content", { active })}>{props.children}</div>
            </foreignObject>
        </g>
    );
};

export default MenuItem;
