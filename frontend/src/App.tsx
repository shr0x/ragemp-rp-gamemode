import { FC, Suspense, lazy, useEffect, useState } from "react";
import { useLocalObservable } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { initializeEvents } from "./events";
import Notification from "utils/NotifyManager.util";
import InventoryStore from "store/Inventory.store";
import { Authentication } from "pages/auth/Authentication";
import EventManager from "utils/EventManager.util";

import ChatStore from "./stores/Chat.store";
import CreatorStore from "./stores/CharCreator.store";
import PlayerStore from "./stores/Player.store";
import HudStore from "store/Hud.store";

const Chat = lazy(() => import("./pages/hud/Chat/Chat"));
const CharacterCreator = lazy(() => import("./pages/creator/Creator"));
const CharacterSelector = lazy(() => import("./pages/selectcharacter/SelectCharacter"));
const PlayerHud = lazy(() => import("pages/hud/Hud"));

const App: FC = () => {
    const chatStore = useLocalObservable(() => new ChatStore());
    const creatorStore = useLocalObservable(() => new CreatorStore());
    const playerStore = useLocalObservable(() => new PlayerStore());
    const hudStore = useLocalObservable(() => new HudStore());
    const inventoryStore = useLocalObservable(() => new InventoryStore());

    const [page, setPage] = useState<string>("hud");

    initializeEvents({ chatStore, playerStore, hudStore, inventoryStore });

    useEffect(() => {
        EventManager.addHandler("system", "setPage", setPage);
        EventManager.addHandler("notify", "show", (data: { type: any; message: string; skin: any }) => Notification.show(data.type, data.message, data.skin));

        return () => {
            EventManager.stopAddingHandlers("notify");
            EventManager.stopAddingHandlers("system");
        };
    }, []);

    return (
        <div className="app">
            <Suspense>
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    theme="dark"
                />
                <Chat store={chatStore} isVisible={page === "hud"} />
                {page === "hud" && <PlayerHud inventoryStore={inventoryStore} store={playerStore} hudStore={hudStore} />}
                {page === "auth" && <Authentication />}
                {page === "creator" && <CharacterCreator store={creatorStore} />}
                {page === "selectcharacter" && <CharacterSelector store={playerStore} />}
            </Suspense>
        </div>
    );
};
export default App;
