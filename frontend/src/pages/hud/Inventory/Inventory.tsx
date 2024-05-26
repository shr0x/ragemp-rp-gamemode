import { FC, useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";

import Main from "./components/Main/Main";
import DragItem from "./components/DragItem/DragItem";

import ConfirmItemDrop from "./components/ConfirmDrop/ConfirmDrop";
import Split from "./components/Split/SplitItem";
import Modal from "./components/Modal/Modal";

import InventoryStore from "store/Inventory.store";

import PlayerStore from "store/Player.store";
import EventManager from "utils/EventManager.util";
import CenterItems from "./components/DropZone/CenterItems";
import Notification from "utils/NotifyManager.util";
import Backpack from "./components/SidePages/Backpack";
import error from "assets/images/error.svg";
import SideInventory from "./components/SidePages/SideInventory";

import style from "./inventory.module.scss";

import { OnPlayerPutItemOn } from "./actions/Putitem";
import { OnPlayerTakeItemOff } from "./actions/TakeItemOff";
import { OnPlayerDropItem } from "./actions/DropItem";
import { OnPlayerSplitItem } from "./actions/SplitItem";
import { OnPlayerDragItem } from "./actions/ItemDrag";
import { IItemImage, ICurrentItem, ITargetCell, IDropCell, CenterComponent } from "./Interfaces";

const Inventory: FC<{ store: InventoryStore; playerStore: PlayerStore }> = ({ store, playerStore }) => {
    const [itemInformation, setItemInformation] = useState<IItemImage | null>(null);

    const [currentItem, setItem] = useState<ICurrentItem>({ component: null, id: null, options: null });
    const [targetCell, setTargetCell] = useState<ITargetCell>({ component: null, id: null });
    const [dropCell, setDropCell] = useState<IDropCell>({ component: null, id: null });
    const [viewingBackpack, setViewingBackpack] = useState<string | null>(null);
    const [isCellDragged, setCellDragged] = useState<boolean>(false);
    const [middleComponent, setMiddleComponent] = useState<CenterComponent>("dropZone");
    const [showModal, setShowModal] = useState(false);
    const [modalCoords, setModalCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const mouseData = useRef<HTMLDivElement>(null);
    const screen = useRef<HTMLDivElement>(null);

    const putItemOn = OnPlayerPutItemOn(setItem, playerStore.data.gender, currentItem, store, viewingBackpack);
    const takeItemOff = OnPlayerTakeItemOff(setItem, currentItem, store);
    const handleDrop = OnPlayerDropItem(currentItem, store, viewingBackpack, setItem, setMiddleComponent);

    const giveItemAway = useCallback(
        (id?: number) => {
            if (currentItem.id === null || currentItem.component === null) return Notification.info("what u want?");

            const item = currentItem.component === "clothes" ? store.clothes[currentItem.id] : store.inventory[currentItem.component][currentItem.id];
            if (typeof id !== "undefined" || id !== null) {
                setMiddleComponent("dropZone");
                setItem({ component: null, id: null, options: null });

                const itemData = { playerId: id, item: item, source: { slot: `${currentItem.id}` } };
                EventManager.emitServer("inventory", "onGiveItem", itemData);
            }
        },
        [currentItem.component, currentItem.id, store.clothes, store.inventory]
    );
    /**
     * Enable only for debugging purposes!
     */
    /*
    useEffect(() => {
        console.log("currentItem changed", currentItem);
    }, [currentItem]);

    useEffect(() => {
        console.log("targetCell changed", targetCell);
    }, [targetCell]);

    useEffect(() => {
        console.log("dropCell changed", dropCell);
    }, [dropCell]);

    useEffect(() => {
        console.log("store.quickUse changed", store.quickUse);
    }, [store.quickUse]);

    useEffect(() => {
        console.log("store.backpackData changed", store.backpackData);
    }, [store.backpackData]);

    useEffect(() => {
        console.log("store.clothes changed", store.clothes);
    }, [store.clothes]);

    useEffect(() => {
        console.log("store.inventory changed", store.inventory);
    }, [store.inventory]);
    */

    const getItemOptions = useCallback(
        (targetCell: { id: number | null; component: string | null }) => {
            const targetId = targetCell.id;
            const component = targetCell.component;
            if (targetId === null || component === null) return [];

            const componentMapping: { clothes?: string[]; pockets?: string[]; backpack?: string[]; quickUse?: string[] } = {
                clothes: store.clothes[targetId]?.options,
                pockets: store.inventory.pockets[targetId]?.options,
                backpack: viewingBackpack ? store.backpackData[viewingBackpack]?.[targetId]?.options : [],
                quickUse: (() => {
                    const quickUseData = store.quickUse[targetId];
                    if (quickUseData && quickUseData.component && quickUseData.id !== null) {
                        const item = store.inventory[quickUseData.component]?.[quickUseData.id];
                        return item?.options;
                    }
                    return [];
                })()
            };

            return componentMapping[component as keyof typeof componentMapping] ?? [];
        },
        [store.backpackData, store.clothes, store.inventory, store.quickUse, viewingBackpack]
    );

    const handleSplit = OnPlayerSplitItem(currentItem, store, viewingBackpack, setItem, setMiddleComponent);

    const handleMouseDown = useCallback(
        (_targetCell: IDropCell) => {
            if (_targetCell.id === null || !_targetCell.component) return;
            let options = getItemOptions(_targetCell);
            setItem({ ..._targetCell, options });
            setShowModal(false);
            setCellDragged(true);
        },
        [getItemOptions]
    );

    function calculateAdjustedClientPosition(clientX: number, clientY: number): { adjustedClientX: number; adjustedClientY: number } {
        const actualPageWidth = window.innerWidth;
        const actualPageHeight = window.innerHeight;
        const desiredPageWidth = actualPageWidth * 0.8;
        const desiredPageHeight = actualPageHeight * 0.75;
        const adjustmentX = (actualPageWidth - desiredPageWidth) / 2;
        const adjustmentY = (actualPageHeight - desiredPageHeight) / 2;
        const adjustedClientX = clientX - adjustmentX;
        const adjustedClientY = clientY - adjustmentY;
        return { adjustedClientX, adjustedClientY };
    }

    const handleContextMenu = useCallback(
        (_targetCell: IDropCell, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (isCellDragged || _targetCell.id === null || _targetCell.component === null) return;
            const options = getItemOptions(_targetCell);
            setItem({ ..._targetCell, options });
            const { adjustedClientX, adjustedClientY } = calculateAdjustedClientPosition(e.clientX, e.clientY);
            setModalCoords({ x: adjustedClientX, y: adjustedClientY });
            setShowModal(true);
        },
        [isCellDragged, getItemOptions]
    );
    const handleMouseUp = OnPlayerDragItem(
        currentItem,
        playerStore.data.gender,
        isCellDragged,
        targetCell,
        store,
        dropCell,
        viewingBackpack,
        setItem,
        setTargetCell,
        setDropCell,
        setCellDragged,
        handleDrop,
        putItemOn
    );

    useEffect(() => {
        if (!currentItem.component || currentItem.id === null) {
            setItemInformation({ image: null, quality: null, name: null, description: null });
            return;
        }

        let item;
        switch (currentItem.component) {
            case "quickUse":
                const quickUseData = store.quickUse[currentItem.id];
                if (!quickUseData || !quickUseData.component || quickUseData.id === null) {
                    setItemInformation({ image: null, quality: null, name: null, description: null });
                    return;
                }
                item = store.inventory[quickUseData.component][quickUseData.id];
                break;
            case "clothes":
                item = store.clothes[currentItem.id];
                break;
            case "pockets":
                item = store.inventory.pockets[currentItem.id];
                break;
            case "backpack":
                if (!viewingBackpack) {
                    setItemInformation({ image: null, quality: null, name: null, description: null });
                    return;
                }
                item = store.backpackData[viewingBackpack][currentItem.id];
                break;
            case "groundItems":
                item = store.sideInventory[currentItem.id];
                break;
            default:
                setItemInformation({ image: null, quality: null, name: null, description: null });
                return;
        }

        if (!item) {
            setItemInformation({ image: null, quality: null, name: null, description: null });
            return;
        }

        setItemInformation({ image: item.image, quality: item.quality, name: item.name, description: item.description, render: item.render });
        setMiddleComponent("dropZone");
    }, [currentItem, store.backpackData, store.clothes, store.inventory, store.quickUse, store.sideInventory, viewingBackpack]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (screen.current) {
                screen.current.classList.add(style.active);
            }
        }, 200);
        return () => clearTimeout(timeout);
    }, []);

    const setImageSource = useCallback((img: string) => {
        try {
            return require(`assets/images/hud/inventory/items/${img}`);
        } catch (err) {
            return error;
        }
    }, []);

    return (
        <div
            ref={screen}
            className={style.inventory}
            onMouseUp={(e) => e.button === 0 && handleMouseUp()}
            onMouseMove={(e) => {
                if (mouseData.current) {
                    mouseData.current.style.left = e.pageX + "px";
                    mouseData.current.style.top = e.pageY + "px";
                }
            }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <div className={style.content}>
                <div className={style.left}>
                    <div className={style.adaptive}>
                        <Main
                            store={store}
                            itemInformation={itemInformation}
                            currentItem={currentItem}
                            setItem={setItem}
                            setTargetCell={setTargetCell}
                            setDropCell={setDropCell}
                            isCellDragged={isCellDragged}
                            handleMouseDown={handleMouseDown}
                            handleContextMenu={handleContextMenu}
                            setShowModal={setShowModal}
                            setSource={setImageSource}
                        />
                    </div>
                </div>
                {middleComponent === "dropZone" && (
                    <CenterItems
                        store={store}
                        currentItem={currentItem}
                        setItem={setItem}
                        setTargetCell={setTargetCell}
                        setDropCell={setDropCell}
                        isCellDragged={isCellDragged}
                        handleMouseDown={handleMouseDown}
                        handleContextMenu={handleContextMenu}
                    />
                )}
                {middleComponent === "confirmDrop" && <ConfirmItemDrop store={store} setMiddleComponent={setMiddleComponent} handleDrop={handleDrop} itemInformation={itemInformation} />}
                {middleComponent === "split" && <Split viewingBackpack={viewingBackpack} store={store} currentItem={currentItem} handleSplit={handleSplit} setMiddleComponent={setMiddleComponent} />}
                <Modal
                    store={store}
                    currentItem={currentItem}
                    putItemOn={putItemOn}
                    viewingBackpack={viewingBackpack}
                    setViewingBackpack={setViewingBackpack}
                    takeItemOff={takeItemOff}
                    handleDrop={handleDrop}
                    giveItemAway={giveItemAway}
                    setMiddleComponent={setMiddleComponent}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    modalCoords={modalCoords}
                />

                <div className={style.right}>
                    <div className={style.adaptive}>
                        {viewingBackpack ? (
                            <Backpack
                                viewingBackpack={viewingBackpack}
                                store={store}
                                currentItem={currentItem}
                                setItem={setItem}
                                setTargetCell={setTargetCell}
                                setDropCell={setDropCell}
                                isCellDragged={isCellDragged}
                                handleMouseDown={handleMouseDown}
                                handleContextMenu={handleContextMenu}
                                setSource={setImageSource}
                            />
                        ) : null}
                        <SideInventory
                            title="Ground Items"
                            store={store}
                            currentItem={currentItem}
                            setItem={setItem}
                            setTargetCell={setTargetCell}
                            setDropCell={setDropCell}
                            isCellDragged={isCellDragged}
                            handleMouseDown={handleMouseDown}
                            handleContextMenu={handleContextMenu}
                            setSource={setImageSource}
                        />
                    </div>
                </div>
            </div>

            <DragItem viewingBackpack={viewingBackpack} mouseData={mouseData} store={store} targetCell={targetCell} />
        </div>
    );
};

export default observer(Inventory);
