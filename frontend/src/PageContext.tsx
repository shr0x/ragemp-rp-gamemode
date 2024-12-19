import { createContext, useContext, useState, useCallback, FC, ReactNode } from "react";

const PageContext = createContext({
    page: null as string | null,
    setPage: (page: string | null) => {}
});

export const PageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [page, setPage] = useState<string | null>("hud");

    const handleSetPage = useCallback((newPage: string | null) => setPage(newPage), []);

    return <PageContext.Provider value={{ page, setPage: handleSetPage }}>{children}</PageContext.Provider>;
};

export const usePage = () => useContext(PageContext);
