import { createContext, useContext, useState, useCallback, FC, ReactNode } from "react";

const LIVE_PAGE: string | null = null;

const PageContext = createContext({
    page: null as string | null,
    setPage: (page: string | null) => {}
});

export const PageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [page, setPage] = useState<string | null>(LIVE_PAGE);

    const handleSetPage = useCallback((newPage: string | null) => setPage(newPage), []);

    return <PageContext.Provider value={{ page, setPage: handleSetPage }}>{children}</PageContext.Provider>;
};

export const usePage = () => useContext(PageContext);
