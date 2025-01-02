import { FC, useCallback, useState, useMemo } from "react";
import cn from "classnames";
import EventManager from "utils/EventManager.util";
import { observer } from "mobx-react-lite";
import style from "./clothing.module.scss";
import { creatorStore } from "store/CharCreator.store";

const CreatorPlayerClothes: FC<{ store: typeof creatorStore }> = ({ store }) => {
    const [clothingType, setClothingType] = useState("hats");

    const clothingCategories = useMemo(() => ["hats", "tops", "pants", "shoes"], []);

    const clothingOptions: any = {
        hats: { drawable: store.data.clothes.hats.drawable, texture: store.data.clothes.hats.texture, maxDrawable: 20, maxTexture: 10 },
        tops: { drawable: store.data.clothes.tops.drawable, texture: store.data.clothes.tops.texture, maxDrawable: 50, maxTexture: 15 },
        pants: { drawable: store.data.clothes.pants.drawable, texture: store.data.clothes.pants.texture, maxDrawable: 20, maxTexture: 10 },
        shoes: { drawable: store.data.clothes.shoes.drawable, texture: store.data.clothes.shoes.texture, maxDrawable: 15, maxTexture: 8 }
    };

    const sendClothingData = useCallback((type: string, drawable: number, texture: number) => {
        EventManager.emitClient("creator", "preview", "clothing", type, drawable, texture);
    }, []);

    return (
        <div className={style.appearance}>
            <div className={style.navigation}>
                {clothingCategories.map((category, index) => (
                    <div key={index}>
                        <div className={cn(style.element, clothingType === category ? style.active : undefined)} onClick={() => setClothingType(category)}>
                            <img className={style.img} src={`${new URL(`../../../../assets/images/creator/icons/${category}.svg`, import.meta.url).href}`} alt={category} />
                        </div>
                    </div>
                ))}
            </div>
            <div className={style.options}>
                <div className={style.title}>
                    <span>select {clothingType}</span>
                </div>
                <div className={style.list}>
                    <div className={style.element}>
                        <div className={style.range_element}>
                            <span>drawable</span>
                            <div className={style.slider}>
                                <input
                                    type="range"
                                    max={clothingOptions[clothingType].maxDrawable}
                                    min={0}
                                    value={clothingOptions[clothingType].drawable}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        //@ts-ignore
                                        store.data.clothes[clothingType].drawable = value;
                                        sendClothingData(clothingType, value, clothingOptions[clothingType].texture);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={style.element}>
                        <div className={style.range_element}>
                            <span>texture</span>
                            <div className={style.slider}>
                                <input
                                    type="range"
                                    max={clothingOptions[clothingType].maxTexture}
                                    min={0}
                                    value={clothingOptions[clothingType].texture}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        //@ts-ignore
                                        store.data.clothes[clothingType].texture = value;
                                        sendClothingData(clothingType, clothingOptions[clothingType].drawable, value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(CreatorPlayerClothes);
