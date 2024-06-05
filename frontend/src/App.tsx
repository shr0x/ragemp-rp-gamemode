import { FC, Suspense, lazy, useEffect } from "react";
import { useLocalObservable } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { PageProvider, usePage } from "./PageContext";

import Notification from "utils/NotifyManager.util";
import InventoryStore from "store/Inventory.store";
import EventManager from "utils/EventManager.util";

import ChatStore from "store/Chat.store";
import CreatorStore from "store/CharCreator.store";
import PlayerStore from "store/Player.store";
import HudStore from "store/Hud.store";
import TattooShopStore from "store/Tattoo.store";

const Authentication = lazy(() => import("pages/auth/Authentication"));
const Chat = lazy(() => import("pages/hud/Chat/Chat"));
const CharacterCreator = lazy(() => import("pages/creator/Creator"));
const CharacterSelector = lazy(() => import("pages/selectcharacter/SelectCharacter"));
const PlayerHud = lazy(() => import("pages/hud/Hud"));
const TattooShop = lazy(() => import("pages/tattooshop/TattooShop"));

const AppContent: FC = () => {
    const { page, setPage } = usePage();

    const chatStore = useLocalObservable(() => new ChatStore());
    const creatorStore = useLocalObservable(() => new CreatorStore());
    const playerStore = useLocalObservable(() => new PlayerStore());
    const hudStore = useLocalObservable(() => new HudStore());
    const inventoryStore = useLocalObservable(() => new InventoryStore());
    const tattooStore = useLocalObservable(() => new TattooShopStore());

    useEffect(() => {
        const handleSetPage = (newPage: string | null) => setPage(newPage);
        const stores = [
            { store: hudStore, event: "hud" },
            { store: creatorStore, event: "creator" },
            { store: chatStore, event: "chat" },
            { store: playerStore, event: "player" },
            { store: inventoryStore, event: "inventory" }
        ];

        stores.forEach(({ store, event }) => {
            store.createEvents();
            return () => EventManager.removeTargetHandlers(event);
        });

        EventManager.addHandler("system", "setPage", handleSetPage);
        EventManager.addHandler("notify", "show", (data: { type: any; message: string; skin: any }) => Notification.show(data.type, data.message, data.skin));

        return () => {
            EventManager.stopAddingHandler("notify");
            EventManager.stopAddingHandler("system");
        };
    }, [hudStore, creatorStore, chatStore, playerStore, inventoryStore]);

    return (
        <div className="app">
            <Suspense fallback={<div>Loading...</div>}>
                <Chat store={chatStore} isVisible={page === "hud"} />
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
                {page === "hud" && <PlayerHud inventoryStore={inventoryStore} store={playerStore} hudStore={hudStore} />}
                {page === "auth" && <Authentication />}
                {page === "creator" && <CharacterCreator store={creatorStore} />}
                {page === "selectcharacter" && <CharacterSelector store={playerStore} />}
                {page === "tattooShop" && <TattooShop store={tattooStore} />}
            </Suspense>
        </div>
    );
};

const App: FC = () => {
    return (
        <PageProvider>
            <AppContent />
        </PageProvider>
    );
};

export default App;
