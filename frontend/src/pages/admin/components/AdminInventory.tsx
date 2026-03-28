import { observer } from "mobx-react-lite";
import { adminInventoryStore } from "store/AdminInventory.store";
import style from "./admininventory.module.scss";
import { entries, keys } from "mobx";
import { useCallback } from "react";
import errorIcon from "assets/images/error.svg";

const AdminInventory = observer(() => {
    if (!adminInventoryStore.isVisible) return null;

    const pocketItems = entries(adminInventoryStore.inventory.pockets);
    const clothesItems = entries(adminInventoryStore.clothes);
    const quickUseItems = entries(adminInventoryStore.quickUse);
    const getRenderImage = useCallback(
        (name: string) => {
            try {
                return new URL(`../../../assets/images/hud/inventory/items/${name}`, import.meta.url).href;
            } catch (err) {
                return errorIcon;
            }
        },
        [name]
    );

    return (
        <div className={style.wrapper}>
            <div className={style.overlay} onClick={() => adminInventoryStore.close()} />

            <div className={style.window}>
                <div className={style.header}>
                    <div>
                        <p className={style.eyebrow}>Inventory Inspector</p>
                        <h2 className={style.title}>{adminInventoryStore.target?.name ?? "Unknown Player"}</h2>
                    </div>

                    <button className={style.close} onClick={() => adminInventoryStore.close()}>
                        ×
                    </button>
                </div>

                <div className={style.meta}>
                    <span>
                        Weight: {adminInventoryStore.currentWeight} / {adminInventoryStore.maxInventoryWeight}
                    </span>
                    <span>Target ID: {adminInventoryStore.target?.id ?? "-"}</span>
                </div>

                <div className={style.content}>
                    <div className={style.left}>
                        <section className={style.section}>
                            <h3>Pockets</h3>
                            <div className={style.grid}>
                                {pocketItems.map(([slot, item]) => (
                                    <button
                                        key={slot}
                                        className={`${style.slot} ${adminInventoryStore.selectedItem?.hash === item?.hash ? style.selected : ""}`}
                                        onClick={() => adminInventoryStore.setSelectedItem(item)}
                                        style={{ borderColor: adminInventoryStore.getItemQuality(item) }}
                                    >
                                        <span className={style.slotId}>{slot}</span>
                                        <img className={style.image} src={item?.image && item.render ? `${getRenderImage(item.image)}` : errorIcon} alt="#" />
                                        <span className={style.slotName}>{item?.name ?? "Empty"}</span>
                                        {!!item && <span className={style.slotCount}>x{item.count}</span>}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className={style.section}>
                            <h3>Clothes</h3>
                            <div className={style.grid}>
                                {clothesItems.map(([slot, item]) => (
                                    <button
                                        key={slot}
                                        className={`${style.slot} ${adminInventoryStore.selectedItem?.hash === item?.hash ? style.selected : ""}`}
                                        onClick={() => adminInventoryStore.setSelectedItem(item)}
                                        style={{ borderColor: adminInventoryStore.getItemQuality(item) }}
                                    >
                                        <span className={style.slotId}>{slot}</span>
                                        <span className={style.slotName}>{item?.name ?? "Empty"}</span>
                                        {!!item && <span className={style.slotCount}>x{item.count}</span>}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className={style.section}>
                            <h3>Quick Use</h3>
                            <div className={style.quickUse}>
                                {quickUseItems.map(([slot, item]) => (
                                    <div key={slot} className={style.quickSlot}>
                                        <strong>{slot}</strong>
                                        <span>{item ? `${item.component} #${item.id}` : "Empty"}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className={style.right}>
                        <h3>Selected Item</h3>

                        {!adminInventoryStore.selectedItem && <div className={style.empty}>Select an item to inspect it.</div>}

                        {adminInventoryStore.selectedItem && (
                            <div className={style.itemInfo}>
                                <div className={style.infoRow}>
                                    <span>Name</span>
                                    <strong>{adminInventoryStore.selectedItem.name}</strong>
                                </div>

                                <div className={style.infoRow}>
                                    <span>Type</span>
                                    <strong>{adminInventoryStore.selectedItem.type}</strong>
                                </div>

                                <div className={style.infoRow}>
                                    <span>Category</span>
                                    <strong>{adminInventoryStore.selectedItem.typeCategory}</strong>
                                </div>

                                <div className={style.infoRow}>
                                    <span>Count</span>
                                    <strong>{adminInventoryStore.selectedItem.count}</strong>
                                </div>

                                <div className={style.infoRow}>
                                    <span>Weight</span>
                                    <strong>{adminInventoryStore.selectedItem.weight}</strong>
                                </div>

                                <div className={style.infoRow}>
                                    <span>UUID</span>
                                    <strong className={style.uuid}>{adminInventoryStore.selectedItem.hash}</strong>
                                </div>

                                {!!adminInventoryStore.selectedItem.items && (
                                    <>
                                        <div className={style.backpackHeader}>
                                            <h4>Backpack Contents</h4>
                                        </div>

                                        <div className={style.grid}>
                                            {entries(adminInventoryStore.selectedItem.items).map(([slot, item]) => (
                                                <button
                                                    key={slot}
                                                    className={style.slot}
                                                    onClick={() => adminInventoryStore.setSelectedItem(item)}
                                                    style={{ borderColor: adminInventoryStore.getItemQuality(item) }}
                                                >
                                                    <span className={style.slotId}>{slot}</span>
                                                    <img className={style.image} src={item?.image && item.render ? `${getRenderImage(item.image)}` : errorIcon} alt="#" />

                                                    <span className={style.slotName}>{item?.name ?? "Empty"}</span>
                                                    {!!item && <span className={style.slotCount}>x{item.count}</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}

                                <div className={style.actions}>
                                    <button className={style.danger} onClick={() => adminInventoryStore.removeSelectedItem()}>
                                        Remove Item
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default AdminInventory;
