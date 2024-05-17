import React from "react";
import { MenuContextData } from "./types";

export interface MenuContextType {
    data: MenuContextData;
    changeMenu: (menuId: string) => void;
}

export const MenuContext = React.createContext<MenuContextType | null>(null);
