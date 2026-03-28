import { observer } from "mobx-react-lite";
import { adminStore } from "store/Admin.store";
import style from "./admindashboard.module.scss";

interface IProps {
    adminStore: typeof adminStore;
}

const AdminDashboard = observer(({ adminStore }: IProps) => {
    return (
        <div className={style.grid}>
            <div className={style.card}>
                <span className={style.label}>Online Players</span>
                <strong className={style.value}>{adminStore.stats.onlinePlayers}</strong>
            </div>

            <div className={style.card}>
                <span className={style.label}>Online Admins</span>
                <strong className={style.value}>{adminStore.stats.onlineAdmins}</strong>
            </div>

            <div className={style.card}>
                <span className={style.label}>Server Uptime</span>
                <strong className={style.value}>{adminStore.stats.serverUptime}</strong>
            </div>

            <div className={style.card}>
                <span className={style.label}>Quick Action</span>
                <button className={style.primaryButton} onClick={() => adminStore.refreshPlayers()}>
                    Refresh Players
                </button>
            </div>
        </div>
    );
});

export default AdminDashboard;
