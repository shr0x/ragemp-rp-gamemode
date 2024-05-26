declare namespace RageShared.Interfaces {
    declare namespace Inventory {
        interface IInventoryItem {
            type: RageShared.Enums.ITEM_TYPES; //item type

            typeCategory: RageShared.Enums.ITEM_TYPE_CATEGORY; //item category see ITEM_TYPE_CATEGORY enum in index.d.ts
            isPlaced: boolean; //whether item is 'placed' in clothes
            quality: number; //item quality level
            image: string; //item image
            hash: string; //unique item hash, also used as linked to a child item
            key: string; //item key which contains clothes data only (such as texture,comp, etc)
            render: string; //item render image which later on can be used in CDN if you have plenty items.
            name: string; //item name
            description: string; //item description
            count: number; //item count, also determines whether you can split an item up
            weight: number; //item weight
            maxStack: number; //max stack determines how many items can be stacked in one slot
            options: string[]; //item options (to be used when you right click an item) such
            gender: number | null; //item gender, used on clothes whether the clothe is for female or male

            modelHash?: string; //prop model name or hash that will be used to create object when dropping item
            ammoType?: string; //ammo type that a weapon will contain
            ammoInClip?: number; //ammo in weapon clip
            amount?: number; //used for armor to contain its amount
            effect?: {
                //a feature to be developed whether the item will have an effect or not
                [key: string]: number;
            };
            components?: Array<number>; //will be used for weapon attachments in future
        }
    }
}
