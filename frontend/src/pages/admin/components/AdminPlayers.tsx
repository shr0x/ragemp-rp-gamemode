import { observer } from "mobx-react-lite";
import { adminStore } from "store/Admin.store";
import style from "./adminplayers.module.scss";

interface IProps {
    adminStore: typeof adminStore;
}

const AdminPlayers = observer(({ adminStore }: IProps) => {
    return (
        <div className={style.players}>
            <div className={style.toolbar}>
                <input type="text" placeholder="Search by id or name..." value={adminStore.search} onChange={(e) => adminStore.setSearch(e.target.value)} />

                <button onClick={() => adminStore.refreshPlayers()}>Refresh</button>
            </div>

            <div className={style.table}>
                <div className={`${style.row} ${style.head}`}>
                    <span>ID</span>
                    <span>Name</span>
                    <span>Ping</span>
                    <span>Health</span>
                    <span>Armour</span>
                </div>

                {adminStore.filteredPlayers.map((player) => (
                    <button key={player.id} className={`${style.row} ${adminStore.selectedPlayer?.id === player.id ? style.selected : ""}`} onClick={() => adminStore.selectPlayer(player)}>
                        <span>{player.id}</span>
                        <span>{player.name}</span>
                        <span>{player.ping}</span>
                        <span>{player.health}</span>
                        <span>{player.armour}</span>
                    </button>
                ))}
            </div>
        </div>
    );
});

export default AdminPlayers;
