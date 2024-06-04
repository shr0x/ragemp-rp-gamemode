declare namespace RageShared.Interfaces {
    namespace Inventory {
        interface IMoveItem {
            item: RageShared.Interfaces.Inventory.IBaseItem;
            source: { component: "pockets" | "clothes" | "quickUse" | "backpack" | "groundItems"; slot: string };
            target: {
                component: "pockets" | "clothes" | "quickUse" | "backpack" | "groundItems";
                slot: string;
                item: RageShared.Interfaces.Inventory.IBaseItem | null;
            };
            backpackHash: string | null;
        }
        interface IUseItem {
            item: RageShared.Interfaces.Inventory.IBaseItem;
            source: { component: "pockets" | "clothes"; slot: string };
        }

        interface IDropItem {
            item: RageShared.Interfaces.Inventory.IBaseItem;
            source: { component: "pockets" | "clothes" | "backpack"; slot: string; viewingBackpack?: string };
        }

        interface ISplitItem {
            item: RageShared.Interfaces.Inventory.IBaseItem;
            source: { component: "pockets" | "backpack"; slot: string };
            target: { component: "pockets" | "backpack"; count: number; slot: string };
        }
        interface IOpenItem {
            item: RageShared.Interfaces.Inventory.IBaseItem;
            source: { component: "backpack" | "pockets"; slot: string };
        }

        interface IBaseItem {
            /*
             * Item Type
             */
            type: RageShared.Enums.ITEM_TYPES;

            typeCategory: RageShared.Enums.ITEM_TYPE_CATEGORY;

            /*
             * Whether item is placed in clothes or not
             */
            isPlaced: boolean;

            /*
             * Item Quality Level -1 to 4
             */
            quality: number;

            /*
             * Item Image
             */
            image: string;

            /*
             * Unique item hash, also used as linked to a child item
             */
            hash: string;

            /*
             * Item key, contains clothes data such as component id, drawable and texture id.
             */
            key: string;

            /*
             * Item render image, shows when you click an item in the inventory slots
             */
            render: string;

            /*
             * Item name
             */
            name: string;

            /*
             * Item description
             */
            description: string;

            /*
             * Item count, also determines whether you can split an item up
             */
            count: number;

            /**
             * Item weight, how much an item weights
             */
            weight: number;

            /*
             * Item max stack, determines the count of an item that can be stacked together in one slot
             */
            maxStack: number;

            /*
             * Item options, used when you right click an item.
             */
            options: string[];

            /*
             * Item gender, used on clothes whether its for females or males.
             */
            gender: number | null;

            /**
             * Items within item, used on backpacks
             */
            items?: { [key: number]: RageShared.Interfaces.Inventory.IBaseItem | null };

            /**
             * Prop model name or hash that will be used to create object when dropping item
             */
            modelHash?: string;

            /**
             * Ammo type, setting item ammo type will check later on whether the ammo fits the weapon player is using.
             */
            ammoType?: string;

            /**
             * Used to store how many ammo player's weapon has in clip, so later on can force-set them when the player re-equip the weapon.
             */
            ammoInClip?: number; //ammo in weapon clip

            /**
             * Used for armour only, contains the amount of armour an item has.
             */
            amount?: number; //used for armor to contain its amount

            //a feature to be developed whether the item will have an effect or not
            effect?: {
                [key: string]: number;
            };

            //will be used for weapon attachments in future
            components?: Array<number>;
        }
    }
}
