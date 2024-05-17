export type DisplayPosition = "top" | "right" | "bottom" | "left" | "center";

export interface MenuContextData {
    innerRadius: number;
    outerRadius: number;
    middleRadius: number;
    deltaRadius: number;
    menuWidth: number;
    menuHeight: number;
    activeMenuId: string;
    drawBackground: boolean;
}

export type AnimationType = "fade" | "rotate" | "scale";

export interface MenuProps extends React.SVGProps<SVGSVGElement> {
    innerRadius: number;
    outerRadius: number;
    centerX: number;
    centerY: number;
    children: React.ReactNode;
    show?: boolean;
    animationTimeout?: number;
    animateSubMenuChange?: boolean;
    animation?: AnimationType[] | AnimationType;
    theme?: "light" | "dark";
    drawBackground?: boolean;
}

export interface MenuItemProps extends Omit<React.SVGProps<SVGGElement>, "onClick"> {
    __index?: number;
    __angleStep?: number;
    __parentMenuId?: string;

    data?: any;
    onItemClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>, index: number, data?: any) => void;
}

export interface SubMenuClosedProps extends Omit<MenuItemProps, "children"> {
    __myMenuId?: string;
    itemView?: React.ReactNode;
}

export interface SubMenuOpenedProps {
    __myMenuId?: string;
    __parentMenuId?: string;
    displayPosition: DisplayPosition;
    children: React.ReactNode;
    displayView?: React.ReactNode;
    onDisplayClick?: MenuDisplayProps["onClick"];
}

export type SubMenuProps = SubMenuClosedProps & SubMenuOpenedProps;

export interface MenuDisplayProps {
    __parentMenuId: string;
    position: DisplayPosition;
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<SVGGElement, MouseEvent>, position: DisplayPosition) => void;
}
