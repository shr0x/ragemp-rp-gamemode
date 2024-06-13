import { FC, Suspense, lazy, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { PageProvider, usePage } from "./PageContext";

import Notification from "utils/NotifyManager.util";
import EventManager from "utils/EventManager.util";

import { chatStore } from "store/Chat.store";
import { getRegisteredComponent } from "./hoc/registerComponent";

import "./pages";

const Chat = lazy(() => import("pages/hud/Chat/Chat"));

const AppContent: FC = () => {
    const { page, setPage } = usePage();
    const pageComponent = getRegisteredComponent(page);

    useEffect(() => {
        const handleSetPage = (newPage: string | null) => setPage(newPage);

        EventManager.addHandler("system", "setPage", handleSetPage);
        EventManager.addHandler("notify", "show", (data: { type: any; message: string; skin: any }) => Notification.show(data.type, data.message, data.skin));

        return () => {
            EventManager.stopAddingHandler("notify");
            EventManager.stopAddingHandler("system");
        };
    }, []);

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
                {pageComponent && <pageComponent.component {...pageComponent.props} />}
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
