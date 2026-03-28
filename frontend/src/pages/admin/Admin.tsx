import { observer } from "mobx-react-lite";
import { createComponent } from "src/hoc/registerComponent";
import { adminStore } from "store/Admin.store";
import AdminDashboard from "./components/AdminDashboard";
import AdminPlayers from "./components/AdminPlayers";
import AdminActions from "./components/AdminActions";
import style from "./admin.module.scss";

interface IAdminProps {
    adminStore: typeof adminStore;
}

const Admin = observer(({ adminStore }: IAdminProps) => {
    if (!adminStore.isVisible) return null;

    return (
        <div className={style.adminPanel}>
            <div className={style.overlay} onClick={() => adminStore.closePanel()} />

            <div className={style.window}>
                <div className={style.header}>
                    <div>
                        <p className={style.eyebrow}>Administration</p>
                        <h1 className={style.title}>Admin Panel</h1>
                    </div>

                    <button className={style.close} onClick={() => adminStore.closePanel()}>
                        ×
                    </button>
                </div>

                <div className={style.tabs}>
                    <button className={adminStore.activeTab === "dashboard" ? style.active : ""} onClick={() => adminStore.setActiveTab("dashboard")}>
                        Dashboard
                    </button>

                    <button className={adminStore.activeTab === "players" ? style.active : ""} onClick={() => adminStore.setActiveTab("players")}>
                        Players
                    </button>
                </div>

                <div className={style.body}>
                    <div className={style.main}>
                        {adminStore.activeTab === "dashboard" && <AdminDashboard adminStore={adminStore} />}

                        {adminStore.activeTab === "players" && <AdminPlayers adminStore={adminStore} />}
                    </div>

                    <div className={style.side}>
                        <AdminActions adminStore={adminStore} />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default createComponent({
    pageName: "admin",
    component: Admin,
    props: {
        adminStore
    }
});
