import React from "react";
import { MenuContext, MenuContextType } from "../MenuContext";
import { SubMenuClosedProps } from "../types";
import { cx, getArrowPoints, getObjectDimensions, getRingSectionPath } from "../util";

export const SubMenuClosed = ({ __myMenuId, __angleStep, __index, itemView, data: propsData, onItemClick, ...props }: SubMenuClosedProps) => {
    const { data, changeMenu } = React.useContext(MenuContext) as MenuContextType;
    const { innerRadius, outerRadius, middleRadius, deltaRadius } = data;
    const [active, setActive] = React.useState(false);
    const angleStep = __angleStep as number;
    const index = __index as number;
    const myMenuId = __myMenuId as string;

    const { objectX, objectY, objectWidth, objectHeight } = React.useMemo(
        () => getObjectDimensions(deltaRadius, angleStep, middleRadius, index, outerRadius),
        [deltaRadius, angleStep, middleRadius, index, outerRadius]
    );

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
                changeMenu(myMenuId);
            }}
        >
            <path d={getRingSectionPath(index * angleStep, (index + 1) * angleStep, innerRadius, outerRadius)} className={cx("base", { active })} />
            <foreignObject x={objectX} y={objectY} width={objectWidth} height={objectHeight}>
                <div className={cx("content", { active })}>{itemView}</div>
            </foreignObject>
            <polyline points={getArrowPoints(index * angleStep, (index + 1) * angleStep, outerRadius)} className={cx("arrow", { active })} />
        </g>
    ) : (
        <g {...props}>
            <foreignObject
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
                    changeMenu(myMenuId);
                }}
                x={objectX}
                y={objectY}
                width={objectWidth}
                height={objectHeight}
            >
                <div className={cx("content", { active })}>{itemView}</div>
            </foreignObject>
            <polyline points={getArrowPoints(index * angleStep, (index + 1) * angleStep, outerRadius)} className={cx("arrow", { active })} />
        </g>
    );
};
