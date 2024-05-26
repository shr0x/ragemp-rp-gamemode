export interface IItemImage {
    image: null | string;
    quality: null | number;
    name: null | string;
    description: null | string;
    render?: null | string;
}

export interface ICurrentItem {
    component: string | null;
    id: number | null;
    options: string[] | null;
}
export interface ITargetCell {
    component: string | null;
    id: number | null;
}

export interface IDropCell {
    component: string | null;
    id: number | null;
}

export type CenterComponent = "dropZone" | "confirmDrop" | "split";
