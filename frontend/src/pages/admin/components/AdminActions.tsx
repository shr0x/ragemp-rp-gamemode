import { observer } from "mobx-react-lite";
import { useState } from "react";
import { adminStore } from "store/Admin.store";
import { adminInventoryStore } from "store/AdminInventory.store";
import style from "./adminactions.module.scss";

interface IProps {
    adminStore: typeof adminStore;
}

const AdminActions = observer(({ adminStore }: IProps) => {
    const [kickReason, setKickReason] = useState("");
    const player = adminStore.selectedPlayer;

    return (
        <div className={style.actions}>
            <h3 className={style.title}>Player Actions</h3>

            {!player && <div className={style.empty}>Select a player to manage them.</div>}

            {player && (
                <>
                    <div className={style.playerBox}>
                        <strong>{player.name}</strong>
                        <span>ID: {player.id}</span>
                        <span>Ping: {player.ping}</span>
                    </div>

                    <div className={style.group}>
                        <button onClick={() => adminStore.gotoSelectedPlayer()}>Goto</button>
                        <button onClick={() => adminStore.bringSelectedPlayer()}>Bring</button>
                        <button onClick={() => adminStore.healSelectedPlayer()}>Heal</button>
                        <button onClick={() => adminStore.armourSelectedPlayer()}>Armour</button>
                        <button onClick={() => adminStore.freezeSelectedPlayer(true)}>Freeze</button>
                        <button onClick={() => adminStore.freezeSelectedPlayer(false)}>Unfreeze</button>
                        <button onClick={() => adminInventoryStore.inspectPlayerInventory(player.id)}>Inspect Inventory</button>
                    </div>

                    <div className={style.kickSection}>
                        <input type="text" placeholder="Kick reason..." value={kickReason} onChange={(e) => setKickReason(e.target.value)} />
                        <button className={style.danger} onClick={() => adminStore.kickSelectedPlayer(kickReason)}>
                            Kick Player
                        </button>
                    </div>
                </>
            )}
        </div>
    );
});

export default AdminActions;
